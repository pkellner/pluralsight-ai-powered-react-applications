import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import "dotenv/config";


// add history and role to the AI and stream

interface Message {
  role: "user" | "assistant";
  content: string;
}

async function main() {
  const messages: Message[] = [
    {
      role: "assistant",
      content: `You are an AI that provides responses based on the following rules:
      1. For currency conversions, assume $1 (USD) is equivalent to €0.5 (EUR).
      2. If asked about any currency conversions other than USD to EUR, respond with "That's the only conversion I know."`,
    },
    {
      role: "user",
      content: `Convert $150 Dollars to Euros.`,
    },
  ];

  const result = await streamText({
    model: openai("gpt-4"),
    temperature: 0.9,
    messages, // Provide the messages array
  });

  console.log("User: " + messages.find((msg) => msg.role === "user")?.content);

  // Displaying the agent's response with label
  process.stdout.write("Agent: ");
  for await (const textPart of result.textStream) {
    process.stdout.write(textPart); // Write characters to stdout without line breaks.
  }

  console.log(); // Ensure a new line after the agent's response
}

main().catch(console.error);
