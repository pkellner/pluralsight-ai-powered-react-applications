import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function GET() {
  const result = streamText({
    model: openai("gpt-4"),
    system: `You are an assistant that summarizes email bodies into concise single-sentence summaries.`,
    messages: [
      {
        role: "user",
        content: `Summarize the following email body in one short sentence:\n\n"Hi John, I hope you're doing well. 
        I wanted to follow up on the email I sent you last week about the project. I think we should move forward 
        with the plan we discussed. Let me know if you have any questions."`,
      },
    ],
  });

  return result.toDataStreamResponse();
}
