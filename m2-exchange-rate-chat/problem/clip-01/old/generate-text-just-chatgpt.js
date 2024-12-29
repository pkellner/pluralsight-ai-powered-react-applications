import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import 'dotenv/config';

async function main() {

  const result = await generateText({
    model: openai("gpt-4"),
    temperature: 0.9,
    prompt: `How many months are there that contain 30 days?`,
  });
  console.log(result.text);
}

main().catch(console.error);
