import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function summarizeContent(body: string): Promise<string> {
  const summary = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: `Summarize the following email body in one short sentence of 
      less than 25 words:\n\n${body}`,
  });

  return summary.text.trim();
}
