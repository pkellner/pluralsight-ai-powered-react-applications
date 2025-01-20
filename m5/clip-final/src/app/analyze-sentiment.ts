import {z} from "zod";
import {generateText} from "ai";
import {openai} from "@ai-sdk/openai";

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

const sentimentValues = SentimentSchema.options;

/**
 * Analyze the sentiment of an email body.
 * @param body - The email body to analyze.
 * @returns The determined sentiment.
 */
export async function analyzeSentiment(body: string): Promise<Sentiment> {
  const sentimentResponse = await generateText({
    model: openai("gpt-4o-mini"),
    temperature: 0.9,
    prompt: `Analyze the sentiment of the following email body. Respond with one 
    of these options: 
    ${sentimentValues.join(", ")}.
    Only respond with one of these, but if you are not sure respond with Pending.\n\nEmail body: ${body}`,
  });

  let sentiment: Sentiment = "Pending"; // Default value in case of invalid response

  try {
    sentiment = SentimentSchema.parse(sentimentResponse.text.trim());
    //console.log("Valid sentiment response:", "Sentiment:", sentiment, "Response:", sentimentResponse.text);
  } catch (error) {
    console.error("Invalid sentiment response:", sentimentResponse.text);
  }

  return sentiment;
}
