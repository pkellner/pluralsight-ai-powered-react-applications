import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import "dotenv/config";

async function main() {
  // System type description to guide the AI
  const systemTypeDescription = `You are an AI that provides responses based on the following rules:
  1. For currency conversions, assume $1 (USD) is equivalent to €0.5 (EUR).
  2. If asked about any currency conversions other than USD to EUR, respond with "That's the only conversion I know."`;

  const prompt = `${systemTypeDescription}\n\nConvert $150 Dollars to Euros.`;

  const result = await streamText({
    model: openai("gpt-4"),
    temperature: 0.9,
    prompt,
  });

  for await (const textPart of result.textStream) {
    process.stdout.write(textPart); // Write characters to stdout without line breaks.
  }

  console.log();
}

main().catch(console.error);
