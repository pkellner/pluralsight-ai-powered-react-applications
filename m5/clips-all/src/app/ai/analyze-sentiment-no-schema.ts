import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";

export const SENTIMENTS = [
  "Promotional",
  "Personal",
  "Angry",
  "Needy",
  "Confused",
  "Appreciative",
  "Complimentary",
  "Pending",
] as const;

export type Sentiment = (typeof SENTIMENTS)[number];

interface SentimentResponse {
  sentiment: Sentiment;
}

function isValidSentiment(sentiment: string): sentiment is Sentiment {
  return SENTIMENTS.includes(sentiment as Sentiment);
}

function validateSentimentResponse(response: unknown): SentimentResponse {
  if (!response || typeof response !== "object") {
    throw new Error("Invalid response format");
  }

  const typedResponse = response as Record<string, unknown>;

  if (
    !typedResponse.sentiment ||
    typeof typedResponse.sentiment !== "string" ||
    !isValidSentiment(typedResponse.sentiment)
  ) {
    throw new Error("Invalid sentiment value");
  }

  return { sentiment: typedResponse.sentiment };
}

export async function analyzeSentiment(body: string): Promise<Sentiment> {
  try {
    const sentimentResponse = await generateObject({
      model: openai("gpt-4o-mini"),
      prompt: `Analyze the sentiment of the following email body and respond with a 
         JSON object containing a 'sentiment' field with one of these 
         values: ${SENTIMENTS.join(", ")} Email body: ${body}`,
      output: "no-schema",
      mode: "json",
    });

    const validatedResponse = validateSentimentResponse(
      sentimentResponse.object,
    );
    console.log(
      "/ai/analyze-sentiment-no-schema.ts: validatedResponse:",
      validatedResponse,
    );
    return validatedResponse.sentiment;
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    return "Pending";
  }
}
