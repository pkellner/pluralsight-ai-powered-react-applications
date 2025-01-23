import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import 'dotenv/config';

async function main() {

  const result = await generateText({
    model: openai("gpt-4"),
    temperature: 0.9,
    prompt: `Summarize the following email body in one short sentence:\n\n"Hi John, I hope you're doing well. 
  I wanted to follow up on the email I sent you last week about the project. I think we should move forward
  with the plan we discussed. Let me know if you have any questions."`,
  });
  console.log(result.text);
}

main().catch(console.error);
