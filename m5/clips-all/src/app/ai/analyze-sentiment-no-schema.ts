import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";

const SENTIMENTS = ["Promotional", "Personal", "Angry", "Needy",
  "Confused", "Appreciative", "Complimentary", "Pending"] as const;
type Sentiment = (typeof SENTIMENTS)[number];

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
  const { sentiment } = response as { sentiment?: unknown };
  if (typeof sentiment !== "string" || !isValidSentiment(sentiment)) {
    throw new Error("Invalid sentiment value");
  }
  return { sentiment };
}

export async function analyzeSentiment(body: string): Promise<Sentiment> {
  try {
    const sentimentResponse = await generateObject({
      model: openai("gpt-4o-mini"),
      prompt: `Analyze the sentiment of this email body. Respond with JSON containing 
        a 'sentiment' field, one of: ${SENTIMENTS.join(", ")}. Email body: ${body}`,
      output: "no-schema",
      mode: "json",
    });

    const validated = validateSentimentResponse(sentimentResponse.object);
    return validated.sentiment;
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    return "Pending";
  }
}
