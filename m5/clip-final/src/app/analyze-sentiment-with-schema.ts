import { z } from "zod";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";

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

/**
 * Analyze the sentiment of an email body.
 * @param body - The email body to analyze.
 * @returns The determined sentiment.
 */
export async function analyzeSentimentWithSchema(
  body: string,
): Promise<Sentiment> {
  // Use Zod to define the schema for the AI response
  const SentimentResponseSchema = z.object({
    sentiment: SentimentSchema,
  });

  try {
    // Call the AI API with the schema
    const sentimentResponse = await generateObject({
      model: openai("gpt-4o-mini"),
      prompt: `Analyze the sentiment of the following email body: ${body}`,
      schema: SentimentResponseSchema,
    });

    // Parse and validate the AI response using Zod
    const parsedResponse = SentimentResponseSchema.parse(
      sentimentResponse.object,
    );

    console.log("Valid sentiment response:", parsedResponse);

    return parsedResponse.sentiment;
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    return "Pending"; // Default value in case of errors
  }
}
