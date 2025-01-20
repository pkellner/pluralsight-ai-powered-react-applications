import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { getCountryCodes } from "./get-country-codes";
import { getExchangeRate } from "./get-exchange-rate";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    system: `
        1. Provide responses based on user input.
        2. Specialize in currency exchange-related questions only.
        3. Politely decline unrelated questions about other topics.
        4. Keep explanations clear, concise, and user-friendly.
        5. Avoid financial advice; focus on factual information.
        6. Verify user input to ensure accurate responses.
        7. Use polite and professional language in all interactions.
        8. Adapt answers to the user's understanding level.
        9. When asked what currencies you support, answer with just those you know about from the tool lookupCountryCode.
    `,
    messages,
    tools: {
      lookupCountryCode: {
        description: "Look up a country code by a country name",
        parameters: z.object({
          countryName: z.string().describe("The full name of the country"),
        }),
        execute: async ({ countryName }: { countryName: string }) => {
          const normalizedName = countryName.trim().toLowerCase();
          const countryCodes = await getCountryCodes();
          const code = countryCodes[normalizedName];

          if (!code) {
            // Clear response when the country is not recognized
            const known = Object.entries(countryCodes)
              .map(([country, countryCode]) => `${country} => ${countryCode}`)
              .join(", ");
            return {
              result: `We do not have a known currency or country code for "${countryName}". Recognized countries and codes are: ${known}.`,
            };
          }

          return {
            result: `The country code for "${countryName}" is "${code}".`,
          };
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
              result: `The exchange rate from ${from} to ${to} is ${rate.toFixed(
                6,
              )}.`,
            };
          } catch (error: unknown) {
            return {
              result: `Unable to retrieve the exchange rate from ${from} to ${to}. Please check if the currencies are valid. ${
                error instanceof Error ? error.message : ""
              }`,
            };
          }
        },
      },
    },
  });

  return result.toDataStreamResponse();
}
