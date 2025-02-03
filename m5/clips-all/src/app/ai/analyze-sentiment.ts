import { z } from "zod";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";

const sentiments = ["Promotional", "Personal", "Angry", "Needy",
  "Confused", "Appreciative", "Complimentary", "Pending"] as const;

export const SentimentSchema = z.enum(sentiments);
type Sentiment = z.infer<typeof SentimentSchema>;

export async function analyzeSentiment(body: string): Promise<Sentiment> {
  try {
    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      prompt: `Analyze the sentiment of the following email body: ${body}`,
      schema: z.object({ sentiment: SentimentSchema }),
    });
    return object.sentiment;
  } catch {
    return "Pending";
  }
}