import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import 'dotenv/config';

async function main() {

  const promptx = `Summarize the following email body in one short sentence:\n\n"Hi John, I hope you're doing well. 
  I wanted to follow up on the email I sent you last week about the project. I think we should move forward
  with the plan we discussed. Let me know if you have any questions."`;

  const prompt = "Convert $150 Dollars to Euros";

  const result = await streamText({
    model: openai("gpt-4"),
    temperature: 0.9,
    prompt
  });

  for await (const textPart of result.textStream) {
    //await new Promise((resolve) => setTimeout(resolve, 300)); // Sleep for 1 second.
    process.stdout.write(textPart); // Write characters to stdout without line breaks.
  }

  console.log();
}

main().catch(console.error);
