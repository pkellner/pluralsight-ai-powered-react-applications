import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import "dotenv/config";

async function main(): Promise<void> {
  const result = await generateText({
    model: openai("gpt-4"),
    prompt: "What is move valuable, 50 Euros or 50 Dollars?",
  });

  console.log(result.text); // Print the complete response
}

main().catch(console.error);
