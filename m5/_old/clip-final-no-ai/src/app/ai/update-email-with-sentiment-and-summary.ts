import {Email} from "@/app/types/app-types";
import {analyzeSentiment} from "@/app/ai/analyze-sentiment";
import {summarizeContent} from "@/app/ai/summarize-content";

export async function updateEmailWithSentimentAndSummary(
  email: Email,
): Promise<Email> {
  const sentiment = await analyzeSentiment(email.body);
  const summary = await summarizeContent(email.body);

  return {
    ...email,
    seen: false,
    sentiment,
    summary,
  };
}