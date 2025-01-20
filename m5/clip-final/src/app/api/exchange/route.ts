import { ToolInvocation, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { exchangeData } from "@/app/api/exchange/exchange-data";

const RAPID_API_KEY = process.env.RAPID_API_KEY;
const USE_RAPID_API_DATA = process.env.USE_RAPID_API_DATA === "true";

interface Message {
  role: "user" | "assistant";
  content: string;
  toolInvocations?: ToolInvocation[];
}

// Create a proper type for the conversion rates
type ConversionRates = Record<string, number>;

async function fetchConversionRates(): Promise<ConversionRates> {
  if (!USE_RAPID_API_DATA) {
    console.log("Using Rapid API data stored locally from 12/19/2014");
    return new Promise((resolve) => {
      resolve(exchangeData.conversion_rates as ConversionRates);
    });
  }

  console.log("Fetching exchange rates from Rapid API using a free account");
  const endpoint = `https://v6.exchangerate-api.com/v6/${RAPID_API_KEY}/latest/USD`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error("Failed to fetch exchange rates");
  }
  const data = (await response.json()) as { conversion_rates: ConversionRates };
  return data.conversion_rates;
}

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  //console.log("/api/exchange/route.ts: messages: ", messages);

  const conversionRates = await fetchConversionRates();

  async function getExchangeRate({ from, to }: { from: string; to: string }) {
    if (!conversionRates[from] || !conversionRates[to]) {
      throw new Error(
        `Invalid currency code(s). Please make sure both ${from} and ${to} are valid currency codes.`,
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
}
