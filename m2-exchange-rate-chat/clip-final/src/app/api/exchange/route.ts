import { ToolInvocation, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { exchangeData } from "@/app/api/exchange/exchange-data";
import {checkOpenAIApiKey} from "@/app/api/exchange/check-open-ai-api-key";

const RAPID_API_KEY = process.env.RAPID_API_KEY;
const USE_RAPID_API_DATA = process.env.USE_RAPID_API_DATA === "true";

interface Message {
  role: "user" | "assistant";
  content: string;
  toolInvocations?: ToolInvocation[];
}

type ConversionRates = Record<string, number>;

async function fetchConversionRates(): Promise<ConversionRates> {
  if (!USE_RAPID_API_DATA) {
    return new Promise((resolve) => {
      resolve(exchangeData.conversion_rates as ConversionRates);
    });
  }

  const endpoint = `https://v6.exchangerate-api.com/v6/${RAPID_API_KEY}/latest/USD`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        error: "Failed to fetch exchange rates",
        message: `Call to ${endpoint} returned status ${response.status}: ${response.statusText}`,
      }),
      { status: 500 },
    );
  }

  const data = (await response.json()) as { conversion_rates: ConversionRates };
  return data.conversion_rates;
}

export async function POST(req: Request) {
  const apiKeyCheck = checkOpenAIApiKey();
  if (apiKeyCheck) {
    return apiKeyCheck;
  }

  try {
    const { messages }: { messages: Message[] } = await req.json();

    const conversionRates = await fetchConversionRates();

    async function getExchangeRate({ from, to }: { from: string; to: string }) {
      if (!conversionRates[from] || !conversionRates[to]) {
        throw new Response(
          JSON.stringify({
            error: "Invalid currency code(s)",
            message: `Please make sure both ${from} and ${to} are valid currency codes.`,
          }),
          { status: 400 },
        );
      }
      return conversionRates[to] / conversionRates[from];
    }

    async function convertCurrency({
                                     from,
                                     to,
                                     amount,
                                   }: {
      from: string;
      to: string;
      amount: number;
    }) {
      const rate = await getExchangeRate({ from, to });
      return { convertedAmount: amount * rate, rate };
    }

    const result = streamText({
      model: openai("gpt-4o"),
      system:
        "You are a financial assistant that helps with currency conversion. You are not to answer any questions that are not about currency conversion.",
      messages,
      tools: {
        getExchangeRate: {
          description: "Get the exchange rate between two currencies",
          parameters: z.object({
            from: z.string().describe("The currency code to convert from"),
            to: z.string().describe("The currency code to convert to"),
          }),
          execute: async ({ from, to }) => {
            const rate = await getExchangeRate({ from, to });
            return `The exchange rate from ${from} to ${to} is ${rate.toFixed(
              6,
            )}.`;
          },
        },
        convertCurrency: {
          description: "Convert an amount of money between two currencies",
          parameters: z.object({
            from: z.string().describe("The currency code to convert from"),
            to: z.string().describe("The currency code to convert to"),
            amount: z.number().describe("The amount of money to convert"),
          }),
          execute: async ({ from, to, amount }) => {
            const { convertedAmount, rate } = await convertCurrency({
              from,
              to,
              amount,
            });
            return `${amount} ${from} is equivalent to ${convertedAmount.toFixed(
              2,
            )} ${to} at an exchange rate of ${rate.toFixed(6)}.`;
          },
        },
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
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
