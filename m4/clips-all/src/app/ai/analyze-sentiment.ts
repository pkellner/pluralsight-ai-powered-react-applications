import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const SENTIMENTS = ["Promotional", "Personal", "Angry", "Needy",
  "Confused", "Appreciative", "Complimentary", "Pending"] as const;
const SentimentSchema = z.enum(SENTIMENTS);
type Sentiment = z.infer<typeof SentimentSchema>;

export async function analyzeSentiment(body: string): Promise<Sentiment> {
  try {
    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      prompt: `Analyze the sentiment of this email body.  
        Email body: ${body}`,
      schema: z.object({ sentiment: SentimentSchema }),
    });

    return object.sentiment;
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    return "Pending";
  }
}
