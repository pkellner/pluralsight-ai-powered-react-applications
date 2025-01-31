import { z } from "zod";

export const SentimentSchema = z.enum([
  "Promotional",
  "Personal",
  "Angry",
  "Needy",
  "Confused",
  "Appreciative",
  "Complimentary",
  "Pending",
]);

type Sentiment = z.infer<typeof SentimentSchema>;

export async function analyzeSentiment(body?: string): Promise<Sentiment> {
  console.log("analyzeSentiment called with body of length:", body?.length);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const sentimentValues = SentimentSchema.options;
  return sentimentValues[7];
}
