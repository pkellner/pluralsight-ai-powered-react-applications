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
    model: openai("gpt-4o"),
    system:
      `
        1. Provide responses based on user input.
        2. Specialize in currency exchange-related questions only.
        3. Politely decline unrelated questions about other topics.
        4. Keep explanations clear, concise, and user-friendly.
        5. Avoid financial advice; focus on factual information.
        6. Verify user input to ensure accurate responses.
        7. Use polite and professional language in all interactions.
        8. Adapt answers to the user's understanding level.
    `,
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

async function getExchangeRate({
  from,
  to,
}: {
  from: string;
  to: string;
}): Promise<number> {

  console.log("getExchangeRate: from,to:",from,to)

  // Hardcoded exchange rates (guesses based on recent rates)
  const exchangeRates: Record<string, Record<string, number>> = {
    USD: { USD: 1, MXN: 18.5, CAD: 1.36 },
    MXN: { MXN: 1, USD: 0.054, CAD: 0.073 },
    CAD: { CAD: 1, USD: 0.71, MXN: 13.7 },
  };

  if (from === to) {
    return 1; // Exchange rate between the same currency is always 1
  }

  if (!exchangeRates[from] || !exchangeRates[from][to]) {
    throw new Error(`Exchange rate not available for ${from} to ${to}.`);
  }

  return exchangeRates[from][to];
}

async function convertCurrency({
  from,
  to,
  amount,
}: {
  from: string;
  to: string;
  amount: number;
}): Promise<{ convertedAmount: number; rate: number }> {

  console.log("/convertCurrency: from,to,amount:", from,to,amount);

  // Hardcoded exchange rates (guesses based on recent rates)
  const exchangeRates: Record<string, Record<string, number>> = {
    USD: { USD: 1, MXN: 18.5, CAD: 1.37 },
    MXN: { MXN: 1, USD: 0.054, CAD: 0.073 },
    CAD: { CAD: 1, USD: 0.74, MXN: 13.7 },
  };

  if (from === to) {
    return { convertedAmount: amount, rate: 1 };
  }

  const rate = exchangeRates[from]?.[to];
  if (!rate) {
    throw new Error(`Conversion rate not available for ${from} to ${to}.`);
  }

  const convertedAmount = amount * rate;
  return { convertedAmount, rate };
}
