import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function GET() {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  await sleep(1000);

  const summary = await generateText({
    model: openai("gpt-4"),
    prompt: `Summarize the following email body in one short sentence:\n\n"Hi John, I hope you're doing well. 
    I wanted to follow up on the email I sent you last week about the project. I think we should move forward 
    with the plan we discussed. Let me know if you have any questions."`,
  });

  return new Response(
    `<html lang="en">
      <body>
        <b>${summary.text}</b>
      </body>
    </html>`,
    { headers: { "Content-Type": "text/html" } },
  );
}
