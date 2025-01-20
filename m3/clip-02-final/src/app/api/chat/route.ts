import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  const result = streamText({
    model: openai("gpt-4"),
    system: `
        1. Provide responses based on user input.
        2. Specialize in currency exchange-related questions only.
        3. Politely decline unrelated questions about other topics.
        4. Keep explanations clear, concise, and user-friendly.
        5. Avoid financial advice; focus on factual information.
        6. When a currency or country is not supported, clearly state this and end the response.
        7. Do not make assumptions or offer alternative conversions when data is unavailable.
        8. Use polite and professional language in all interactions.
    `,
    messages,
    tools: {
      lookupCountryCode: {
        description: "Look up a country code by a country name",
        parameters: z.object({
          countryName: z.string().describe("The full name of the country"),
        }),
        execute: async ({ countryName }: { countryName: string }) => {
          try {
            const code = await getCountryCodes({ countryName });
            if (!code) {
              return {
                result: `I apologize, but "${countryName}" is not in our supported countries list. Currently, we only support conversions for: ${Object.keys(
                  countryCodes,
                ).join(", ")}.`,
              };
            }

            return {
              result: code,
            };
          } catch (error: unknown) {
            return {
              result: `An error occurred while fetching the country code for "${countryName}". ${
                error instanceof Error ? error.message : ""
              }`,
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
              result: `The exchange rate from ${from} to ${to} is ${rate.toFixed(
                6,
              )}.`,
            };
          } catch (error: unknown) {
            if (error instanceof Error) {
              return {
                result: `${
                  error.message
                }. Only the following currencies are supported: ${Object.keys(
                  exchangeRates,
                ).join(", ")}.`,
              };
            }
            return {
              result: `An unexpected error occurred. Only the following currencies are supported: ${Object.keys(
                exchangeRates,
              ).join(", ")}.`,
            };
          }
        },
      },
    },
  });

  return result.toDataStreamResponse();
}

const countryCodes: Record<string, string> = {
  "united states": "USD",
  canada: "CAD",
  mexico: "MXN",
};

const exchangeRates: Record<string, Record<string, number>> = {
  USD: { USD: 1, MXN: 16.5, CAD: 1.31 },
  MXN: { MXN: 1, USD: 0.0606, CAD: 0.0794 },
  CAD: { CAD: 1, USD: 0.7634, MXN: 12.5954 },
};

async function getExchangeRate({
  from,
  to,
}: {
  from: string;
  to: string;
}): Promise<number> {
  if (from === to) {
    return 1;
  }

  if (!exchangeRates[from] || !exchangeRates[from][to]) {
    throw new Error(`Exchange rate not available for ${from} to ${to}`);
  }

  return exchangeRates[from][to];
}

async function getCountryCodes({
  countryName,
}: {
  countryName: string;
}): Promise<string | null> {
  const normalizedName = countryName.trim().toLowerCase();
  return countryCodes[normalizedName] || null;
}
