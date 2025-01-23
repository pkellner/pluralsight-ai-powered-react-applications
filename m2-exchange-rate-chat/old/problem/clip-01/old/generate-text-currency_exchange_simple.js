import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import 'dotenv/config';

async function main() {

  const result = await generateText({
    model: openai("gpt-4"),
    temperature: 0.9,
    prompt: `Convert $150 in US Currency to Euros?`,
  });
  console.log(result.text);
}

main().catch(console.error);