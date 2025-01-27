import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { getCountryCodes } from "./get-country-codes";
import { getExchangeRate } from "./get-exchange-rate";
import { z } from "zod";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();
  const countryCodes = await getCountryCodes();
  const countryCodesString = Object.keys(countryCodes).join(",");

  const result = streamText({
    model: openai("gpt-4o"),
    tools: {
      lookupCountryCode: {
        description: "Look up a country code by country",
        parameters: z.object({
          countryName: z.string().describe("The full name of the country"),
        }),
        execute: async ({ countryName }: { countryName: string }) => {
          const normalizedName = countryName.trim().toLowerCase();
          const code = countryCodes[normalizedName];
          if (!code) {
            return {
              result: `We do not have a known currency or country code for 
                "${countryName}". Codes are ${countryCodesString}.`,
            };
          } else {
            return {
              result: `The country code for "${countryName}" is "${code}"`,
            };
          }
        },
      },
      getExchangeRate: {
        description: "Get the exchange rate between two currencies",
        parameters: z.object({
          from: z.string().describe("The currency code to convert from"),
          to: z.string().describe("The currency code to convert to"),
        }),
        execute: async ({ from, to }: { from: string; to: string }) => {
          try {
            const rate = await getExchangeRate({ from, to });
            return {
              result: `The exchange rate from ${from} to ${to} is ${rate.toFixed(6)}`,
            };
          } catch (error: unknown) {
            return {
              result: `unable to retrieve the exchange rate from ${from} to ${to}.
                Please check if the currencies are valid.
                ${error instanceof Error ? error.message : ""}`,
            };
          }
        },
      },
    },
    system: `
        1. Provide responses based on user input.
        2. Specialize in currency exchange-related questions only.
        3. Politely decline unrelated questions about other topics.
        4. Keep explanations clear, concise, and user-friendly.
        5. Avoid financial advice; focus on factual information.
        6. When a currency or country is not supported, 
           clearly state this and end the response.
        7. Do not make assumptions or offer alternative conversions
           when data is unavailable.
        8. Use polite and professional language in all interactions.
        9. Only provide information about currencies from ${countryCodesString}.
    `,
    messages,
  });

  return result.toDataStreamResponse();
}
