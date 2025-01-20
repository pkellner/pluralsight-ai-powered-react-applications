"use server";

import { mockEmails } from "@/app/get-emails-mock-database/mock-emails";
import { Email } from "@/app/types/app-types";
import { summarizeContent } from "@/app/summarize-content";
import {analyzeSentiment} from "@/app/analyze-sentiment";


export async function getEmails(maxCnt: number = 10): Promise<Email[]> {
  const analyzedEmails = await Promise.all(
    mockEmails.slice(0, maxCnt).map(async (email) => {
      const sentiment = await analyzeSentiment(email.body);
      const summary = await summarizeContent(email.body);

      return {
        ...email,
        seen: true,
        sentiment,
        summary,
      };
    }),
  );
  return analyzedEmails as Email[];
}

export async function updateEmailWithSentimentAndSummary(email: Email): Promise<Email> {
  const sentiment = await analyzeSentiment(email.body);
  const summary = await summarizeContent(email.body);

  return {
    ...email,
    seen: false,
    sentiment,
    summary,
  };
}
