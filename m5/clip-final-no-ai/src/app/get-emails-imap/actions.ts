"use server";

// This action is for a real IMAP email server and is not part of the course.
// It is used to fetch emails from an IMAP server and analyze their sentiment.
// It is here for you to experiment with and see how it works.
// check the import section of the /src/app/page.tsx file to see how it is used.

import { FetchMessageObject, ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";
import { Email } from "@/app/types/app-types";
import { analyzeSentiment } from "@/app/analyze-sentiment";
import { summarizeContent } from "@/app/summarize-content";

export async function getEmails(
  maxCnt: number = 10,
): Promise<(Email & { isHtml: boolean })[]> {
  const client = new ImapFlow({
    host: "imap.mail.me.com",
    port: 993,
    secure: true,
    auth: {
      user: process.env?.IMAP_USER ?? "unknown",
      pass: process.env?.IMAP_PASSWORD ?? "unknown",
    },
    logger: false,
  });

  const sinceDate = new Date();
  const hoursToGoBack = 3;
  sinceDate.setHours(sinceDate.getHours() - hoursToGoBack);

  const emails: (Email & { isHtml: boolean })[] = [];

  try {
    await client.connect();

    const lock = await client.getMailboxLock("INBOX");
    try {
      const searchCriteria = { since: sinceDate };
      const allMessages: FetchMessageObject[] = [];

      for await (const message of client.fetch(searchCriteria, {
        uid: true,
        envelope: true, // Fetch message envelope
        source: true, // Fetch the raw MIME source
        flags: true, // Include flags to check MIME content type
        bodyStructure: true, // Include body structure to check MIME content type
      }) as AsyncIterable<FetchMessageObject>) {
        allMessages.push(message);
      }

      const last15Messages = allMessages
        .sort((a, b) => {
          const dateA = a.envelope?.date?.getTime() || 0;
          const dateB = b.envelope?.date?.getTime() || 0;
          return dateA - dateB;
        })
        .slice(-15);

      for (const message of last15Messages) {
        let isHtml = false;
        if (message.source?.includes("Content-Type: text/html")) {
          isHtml = true;
        }

        let parsedEmail;
        if (message.source) {
          parsedEmail = await simpleParser(message.source);
        }

        let bodyContent = parsedEmail?.html || parsedEmail?.text || "";
        if (!isHtml) {
          isHtml = !!parsedEmail?.html; // Confirm HTML presence after parsing

          bodyContent = (parsedEmail?.html || parsedEmail?.text || "")
            .replace(/([\n\r])+/g, " ") // Remove excessive line breaks
            .trim(); // Remove leading/trailing spaces
        }

        // Push to emails array
        emails.push({
          id: message.uid.toString(),
          subject: message.envelope?.subject || "",
          fromEmail: message.envelope?.from?.[0]?.address || "",
          receivedDate: message.envelope?.date || new Date(),
          body: bodyContent, // Preserve HTML or plain text content
          fromName: message.envelope?.from?.[0]?.name || "",
          sentiment: "Pending",
          summary: "",
          isHtml,
        });
      }
    } finally {
      lock.release();
    }
  } catch (err) {
    console.error("Failed to fetch emails:", err);
  } finally {
    await client.logout();
  }

  const analyzedEmails = await Promise.all(
    emails.map(async (email) => {
      const sentiment = await analyzeSentiment(email.body);
      const summary = await summarizeContent(email.body);
      return {
        ...email,
        sentiment,
        summary,
      };
    }),
  );

  return analyzedEmails?.slice(maxCnt) as Email[];
}

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
