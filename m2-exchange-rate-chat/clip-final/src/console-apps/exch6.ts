import {streamText, ToolInvocation} from "ai";
import { openai } from "@ai-sdk/openai";
import 'dotenv/config';

interface Message {
  role: "user" | "assistant";
  content: string;
  toolInvocations?: ToolInvocation[];
}

async function main() {
  const messages : Message[] = [
    {
      role: "assistant",
      content: `You are an AI that provides responses based on the following rules:
      1. For currency conversions, assume $1 (USD) is equivalent to €0.5 (EUR).
      2. You also know that $1 (USD) is equivalent to ¥110 (Yen).
      3. You can make assumptions for converting between all three currencies rates  (NEED THIS OR IT REFUSES TO WORK)
      4. If asked about any currency conversions other than USD, EUR and Yen, respond with "Those are the only currencies I know."`
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
    content: `Assume I have the number of Euros you just converted for me, tell me how much that might be in Yen?`
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
