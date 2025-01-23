import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import "dotenv/config";



async function main() {
  const system = `You are an AI that provides responses based on the following rules:
  1. For currency conversions, assume $1 (USD) is equivalent to €0.5 (EUR).
  2. If asked about any currency conversions other than USD to EUR or EUR to dollars, respond with "That's the only conversion I know."`;

  //const prompt = `Convert $150 Dollars to Euros.`;
  const prompt = `Convert $150 Euros to Dollars.`;

  const result = await streamText({
    model: openai("gpt-4"),
    temperature: 0.9,
    system, // Pass the system instructions separately
    prompt,
  });

  for await (const textPart of result.textStream) {
    process.stdout.write(textPart); // Write characters to stdout without line breaks.
  }

  console.log();
}

main().catch(console.error);

/*
The system parameter in your code comes from the ChatGPT API design rather than specifically from the ai-sdk. It is part of OpenAI's standard format for managing conversational context with the GPT models.

Explanation:
In OpenAI's API (e.g., for GPT-4), the concept of a "system message" is introduced as part of the messages structure in a conversation. This message defines the AI's behavior and acts as an instruction set or guiding context for the rest of the interaction.

When using wrappers like ai-sdk, the system key likely maps to this functionality in OpenAI's API, where:

system: Provides overarching instructions for the AI, such as its role or specific behavioral rules.
user: Represents the user's input prompt or query.
assistant: Represents the AI's responses.
These keys help structure the conversation context and guide the AI's responses based on the provided system instructions.
 */
