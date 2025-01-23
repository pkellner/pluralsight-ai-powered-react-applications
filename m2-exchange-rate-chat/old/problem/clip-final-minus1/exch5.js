import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import 'dotenv/config';

async function main() {
  const messages = [
    {
      role: "system",
      content: `You are an AI that provides responses based on the following rules:
      1. For currency conversions, assume $1 (USD) is equivalent to €0.5 (EUR).
      2. If asked about any currency conversions other than USD to EUR, respond with "That's the only conversion I know."`
    },
    {
      role: "user",
      content: `Convert $150 Dollars to Euros.`
    }
  ];

  const result1 = await streamText({
    model: openai("gpt-4"),
    temperature: 0.9,
    messages,
  });

  console.log("User: " + messages[1].content);

  process.stdout.write("Agent: ");
  for await (const textPart of result1.textStream) {
    process.stdout.write(textPart);
  }
  console.log(); // Ensure new line after the agent's response

  // Add the second question to the conversation
  messages.push({
    role: "user",
    content: `Assume I have that many Euros, tell me how much that might be in Yen?`
  });

  const result2 = await streamText({
    model: openai("gpt-4"),
    temperature: 0.9,
    messages,
  });

  console.log("User: " + messages[2].content);

  process.stdout.write("Agent: ");
  for await (const textPart of result2.textStream) {
    process.stdout.write(textPart);
  }
  console.log(); // Ensure new line after the agent's response
}

main().catch(console.error);
