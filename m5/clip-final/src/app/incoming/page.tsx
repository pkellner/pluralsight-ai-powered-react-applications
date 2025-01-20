"use client";

import React, {
  MouseEvent,
  ReactElement,
  useEffect,
  useState,
  useRef,
} from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import { getEmails } from "@/app/get-emails-mock-database/actions";
import { Email, Sentiment } from "@/app/types/app-types";
import { fetchImapEmails } from "@/app/get-emails-imap/actions";
import {io} from "next/dist/server/node-environment-extensions/utils";


export default function InboxApp(): ReactElement {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [summaries, setSummaries] = useState<{ [key: string]: string }>({});
  const [changingSentiment, setChangingSentiment] = useState<string | null>(
    null,
  );
  const [newSentiment, setNewSentiment] = useState<Sentiment>("Angry");

  // Keep ref to the current emails array
  const emailsRef = useRef<Email[]>([]);
  useEffect(() => {
    emailsRef.current = emails;
  }, [emails]);

  const useImap = process.env.NEXT_PUBLIC_USE_IMAP === "true";
  console.log("/inbox page useImap", useImap);

  // Initial fetch
  useEffect(() => {
    async function fetchData() {
      const data = useImap ? await fetchImapEmails() : await getEmails();

      const angryEmails = data
        .filter((e) => e.sentiment === "Angry")
        .sort((a, b) => b.receivedDate.getTime() - a.receivedDate.getTime());
      const otherEmails = data
        .filter((e) => e.sentiment !== "Angry")
        .sort((a, b) => b.receivedDate.getTime() - a.receivedDate.getTime());
      setEmails([...angryEmails, ...otherEmails]);
    }
    void fetchData();
  }, [useImap]);

  // Socket.IO listener: if new IMAP mail arrives, re-fetch IMAP emails
  useEffect(() => {
    if (!useImap) return;

    const handleNewMail = async () => {
      console.log("imapNewMail event received; re-fetching IMAP mail...");
      const data = await fetchImapEmails();
      const angryEmails = data
        .filter((e) => e.sentiment === "Angry")
        .sort((a, b) => b.receivedDate.getTime() - a.receivedDate.getTime());
      const otherEmails = data
        .filter((e) => e.sentiment !== "Angry")
        .sort((a, b) => b.receivedDate.getTime() - a.receivedDate.getTime());
      setEmails([...angryEmails, ...otherEmails]);
    };

    // @ts-ignore
    io.on("imapNewMail", handleNewMail);

    return () => {
      //socket.off("imapNewMail", handleNewMail);
    };
  }, [useImap]);

  const sentimentEmojis: { [key in Sentiment]: string } = {
    Angry: "😡",
    Needy: "🙏",
    Confused: "🤔",
    Appreciative: "🙌",
    Complimentary: "😊",
    Pending: "🤷",
    Promotional: "🎉",
    Personal: "👨‍👩‍👧‍👦",
  };

  function handleHover(email: Email) {
    setSummaries((prev) => ({
      ...prev,
      [email.id]: email.summary,
    }));
  }

  function handleRowClick(emailId: string) {
    setSelectedEmailId(emailId);
  }

  async function handleChangeSentiment(
    e: MouseEvent<HTMLButtonElement>,
    emailId: string,
  ) {
    e.stopPropagation();
    setChangingSentiment(emailId);
  }

  async function applySentimentChange(emailId: string) {
    const updated = emailsRef.current.map((e) =>
      e.id === emailId ? { ...e, sentiment: newSentiment } : e,
    );
    const angryEmails = updated
      .filter((e) => e.sentiment === "Angry")
      .sort((a, b) => b.receivedDate.getTime() - a.receivedDate.getTime());
    const otherEmails = updated
      .filter((e) => e.sentiment !== "Angry")
      .sort((a, b) => b.receivedDate.getTime() - a.receivedDate.getTime());
    setEmails([...angryEmails, ...otherEmails]);
    setChangingSentiment(null);
  }

  const selectedEmail = selectedEmailId
    ? emails.find((e) => e.id === selectedEmailId)
    : null;

  const firstNonAngryIndex = emails.findIndex((e) => e.sentiment !== "Angry");

  if (emails.length === 0) {
    return (
      <div className="flex h-screen bg-gray-100 text-gray-900">
        <div className="w-1/3 border-r border-gray-300 flex flex-col">
          <div className="p-4 border-b border-gray-300 bg-white font-bold text-lg">
            Inbox
          </div>
          <div className="flex-1 overflow-auto space-y-4 p-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="p-4 border-b border-gray-300 bg-white animate-pulse"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <div>...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      <div className="w-1/3 border-r border-gray-300 flex flex-col">
        <div className="p-4 border-b border-gray-300 bg-white font-bold text-lg">
          Inbox
        </div>
        <div className="flex-1 overflow-auto">
          {emails.map((email, index) => {
            return (
              <div key={email.id}>
                {index === firstNonAngryIndex && firstNonAngryIndex !== -1 && (
                  <div className="text-center text-sm text-gray-500 my-2 border-b border-gray-300 pb-1">
                    Other Emails
                  </div>
                )}
                <div
                  data-tooltip-id={`email-tooltip-${email.id}`}
                  data-tooltip-content={summaries[email.id] || ""}
                  data-tooltip-hidden={changingSentiment !== null}
                  onMouseEnter={() => handleHover(email)}
                  onClick={() => handleRowClick(email.id)}
                  className={`p-4 cursor-pointer border-b border-gray-300 ${
                    selectedEmailId === email.id
                      ? "bg-blue-100"
                      : "bg-white hover:bg-blue-50"
                  } relative`}
                >
                  <div className="flex items-start gap-2">
                    <div
                      className="text-xl"
                      data-tooltip-id={`sentiment-tooltip-${email.id}`}
                      data-tooltip-content={email.sentiment}
                    >
                      {sentimentEmojis[email.sentiment]}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-500">
                        {email.receivedDate.toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </div>
                      <div className="text-sm font-semibold">
                        {email.fromName} &lt;{email.fromEmail}&gt;
                      </div>
                      <div className="text-sm text-gray-800 break-words">
                        {email.subject}
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleChangeSentiment(e, email.id)}
                      className="text-xs text-blue-600 border border-blue-600 px-2 py-1 rounded hover:bg-blue-600 hover:text-white"
                    >
                      Change
                    </button>
                  </div>
                  <Tooltip
                    key={`sentiment-tooltip-${email.id}`}
                    id={`sentiment-tooltip-${email.id}`}
                    place="top"
                    style={{ maxWidth: "14rem", whiteSpace: "pre-wrap" }}
                  />

                  {changingSentiment === email.id && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-white border border-gray-300 rounded shadow-lg z-20 text-sm">
                      <div className="mb-2">Change sentiment:</div>
                      <select
                        className="border border-gray-300 rounded w-full mb-2"
                        value={newSentiment}
                        onChange={(e) =>
                          setNewSentiment(e.target.value as Sentiment)
                        }
                      >
                        {Object.keys(sentimentEmojis).map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setChangingSentiment(null)}
                          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => applySentimentChange(email.id)}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {selectedEmail ? (
          <div className="p-6">
            <div className="text-gray-700 text-sm mb-2">
              {selectedEmail.receivedDate.toLocaleString(undefined, {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </div>
            <div className="font-bold text-lg mb-2">
              {selectedEmail.subject}
            </div>
            <div className="text-sm text-gray-600 mb-4">
              From: {selectedEmail.fromName} &lt;{selectedEmail.fromEmail}&gt;
            </div>
            <hr className="mb-2" />
            <div
              className={`text-gray-800 ${
                selectedEmail.isHtml ? "mt-0" : "whitespace-pre-wrap"
              }`}
            >
              {selectedEmail.isHtml ? (
                <div
                  dangerouslySetInnerHTML={{ __html: selectedEmail.body }}
                  className="email-body"
                ></div>
              ) : (
                <div>{selectedEmail.body}</div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6 text-gray-500">
            Select an email from the inbox
          </div>
        )}
      </div>
      {emails.map((email) => (
        <Tooltip
          key={`email-tooltip-${email.id}`}
          id={`email-tooltip-${email.id}`}
          place="right"
          style={{ maxWidth: "14rem", whiteSpace: "pre-wrap" }}
        />
      ))}
    </div>
  );
}
