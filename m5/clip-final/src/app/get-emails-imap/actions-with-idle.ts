"use server";

import { FetchMessageObject, ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";
import { Email } from "@/app/types/app-types";
import { analyzeSentiment } from "@/app/analyze-sentiment";
import { summarizeContent } from "@/app/summarize-content";
import {io} from "@/app/inbox/server-socket";


export async function fetchImapEmails(): Promise<(Email & { isHtml: boolean })[]> {
  const client = new ImapFlow({
    host: "imap.mail.me.com",
    port: 993,
    secure: true,
    auth: {
      user: "svcodecamp@icloud.com",
      pass: process.env.SVCODECAMP_PASSWORD,
    },
    logger: false,
  });

  const sinceDate = new Date();
  sinceDate.setHours(sinceDate.getHours() - 1);

  const emails: (Email & { isHtml: boolean })[] = [];

  try {
    await client.connect();

    // Listen for new messages (IMAP IDLE)
    client.on("exists", async (newMsgCount: number) => {
      console.log("New message arrived in INBOX; total:", newMsgCount);
      // Notify all connected clients via Socket.IO
      io.emit("imapNewMail");
    });

    const lock = await client.getMailboxLock("INBOX");
    try {
      const searchCriteria = { since: sinceDate };
      const allMessages: FetchMessageObject[] = [];

      for await (const message of client.fetch(searchCriteria, {
        uid: true,
        envelope: true,
        source: true,
        flags: true,
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
          isHtml = !!parsedEmail?.html;
          bodyContent = (parsedEmail?.html || parsedEmail?.text || "")
            .replace(/([\n\r])+/g, " ")
            .trim();
        }

        emails.push({
          id: message.uid.toString(),
          subject: message.envelope?.subject || "",
          fromEmail: message.envelope?.from?.[0]?.address || "",
          receivedDate: message.envelope?.date || new Date(),
          body: bodyContent,
          fromName: message.envelope?.from?.[0]?.name || "",
          sentiment: "Pending",
          summary: "",
          isHtml,
        });
      }
    } finally {
      lock.release();
    }

    // Keep the connection open to watch for new mail
    await client.idle();
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

  return analyzedEmails;
}
