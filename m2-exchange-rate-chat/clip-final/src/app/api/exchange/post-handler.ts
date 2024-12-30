import { streamText, ToolInvocation } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { getConversionRates } from "./get-conversion-rates";
import { getExchangeRate } from "./get-exchange-rate";
import { checkOpenAIApiKey } from "./check-open-ai-api-key";
import { convertCurrency } from "./convert-currency";

interface Message {
  role: "user" | "assistant";
  content: string;
  toolInvocations?: ToolInvocation[];
}

export type ConversionRates = Record<string, number>;

export async function postHandler(req: Request) {
  const apiKeyCheck = checkOpenAIApiKey();
  if (apiKeyCheck) {
    return apiKeyCheck;
  }

  try {
    const { messages }: { messages: Message[] } = await req.json();
    const conversionRates = await getConversionRates();

    // Do NOT await this call — otherwise the stream is consumed before returning
    const result = await streamText({
      experimental_toolCallStreaming: true,
      model: openai("gpt-4"),
      maxSteps: 5,
      system: `You are a financial assistant that specializes in currency information and conversion.
        CRITICAL INSTRUCTIONS - YOU MUST FOLLOW THESE EXACTLY:
        1. For EVERY currency-related question, you MUST use BOTH tools in this exact order:
           - First: Call getExchangeRate to display the current rate
           - Second: Call convertCurrency to show a practical conversion
        2. Never skip either tool - both must be used for every currency question
        3. If no amount is specified for conversion, use 1 as the default amount
        4. Never proceed with currency conversion without first getting and showing the exchange rate
        5. Never provide currency information without using both tools
        6. If asked only for exchange rate, still perform both operations
        7. If asked only for conversion, still show exchange rate first
        8. Always show a reasonable number of decimal places when showing conversions
        9. Your response pattern must always be:
           - First show the exchange rate result with the same precision as the source data
           - Then show the conversion result
           - Finally, add any additional explanation if needed`,
      messages,
      tools: {
        getExchangeRate: {
          description:
            "Get the exchange rate between two currencies. This MUST be called FIRST for all currency queries.",
          parameters: z.object({
            from: z.string().describe("The source currency code (e.g., USD)"),
            to: z.string().describe("The target currency code (e.g., EUR)"),
          }),
          execute: async ({ from, to }) => {
            console.log("Executing getExchangeRate:", from, to);
            const rate = await getExchangeRate({ from, to, conversionRates });
            return `The exchange rate from ${from} to ${to} is ${rate.toFixed(6)}.`;
          },
        },
        convertCurrency: {
          description:
            "Convert an amount between currencies. This MUST be called SECOND, after getExchangeRate.",
          parameters: z.object({
            from: z.string().describe("The currency code to convert from"),
            to: z.string().describe("The currency code to convert to"),
            amount: z
              .number()
              .describe("The amount to convert (use 1 if no amount specified)"),
          }),
          execute: async ({ from, to, amount }) => {
            console.log("Executing convertCurrency:", from, to, amount);
            const { convertedAmount, rate } = await convertCurrency({
              from,
              to,
              amount,
              conversionRates,
            });
            return `${amount} ${from} is equivalent to ${convertedAmount.toFixed(
              2,
            )} ${to} at an exchange rate of ${rate.toFixed(6)}.`;
          },
        },
      },
    });

    // Return the streaming response directly
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in POST:", error);
    if (error instanceof Response) {
      return error;
    }
    return new Response(
      JSON.stringify({
        error: "Unknown error",
        message: (error as Error).message,
      }),
      { status: 500 },
    );
  }
}
