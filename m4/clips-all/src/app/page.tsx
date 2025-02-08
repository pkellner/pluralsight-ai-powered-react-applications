"use client";

import React, {
  MouseEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import {
  getEmails,
  updateEmailWithSentimentAndSummary,
} from "@/app/get-emails-mock-database/actions";

import { Email, Sentiment, sentimentEmojis } from "@/app/types/app-types";
import { io, Socket } from "socket.io-client";
import { IconMail, IconMailOpened } from "@tabler/icons-react";
import { IconCheck, IconX } from "@tabler/icons-react";
import InBoxListPlaceHolder from "@/app/inbox-list-place-holder";

export default function InboxApp(): ReactElement {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [summaries, setSummaries] = useState<{ [key: string]: string }>({});
  const [changingSentiment, setChangingSentiment] = useState<string | null>(
    null,
  );
  const [newSentiment, setNewSentiment] = useState<Sentiment>("Angry");
  const [firstRowHiding, setFirstRowHiding] = useState(false);

  // Filter toggles for each sentiment
  const [sentimentFilter, setSentimentFilter] = useState<
    Record<Sentiment, boolean>
  >({
    Angry: true,
    Needy: true,
    Confused: true,
    Appreciative: true,
    Complimentary: true,
    Pending: true,
    Promotional: true,
    Personal: true,
  });

  function handleToggleSentiment(sentiment: Sentiment) {
    setSentimentFilter((prev) => ({
      ...prev,
      [sentiment]: !prev[sentiment],
    }));
  }

  function handleSelectAll() {
    const allSelected = Object.keys(sentimentFilter).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {},
    );
    setSentimentFilter(allSelected as Record<Sentiment, boolean>);
  }

  function handleSelectNone() {
    const noneSelected = Object.keys(sentimentFilter).reduce(
      (acc, key) => ({ ...acc, [key]: false }),
      {},
    );
    setSentimentFilter(noneSelected as Record<Sentiment, boolean>);
  }

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getEmails(10);
      setEmails(data);

      socketRef.current = io("http://localhost:4000");
      socketRef.current.on("message", async (newData: Email) => {
        const newDataWithSentimentAndSummary =
          await updateEmailWithSentimentAndSummary(newData);

        const newDataUpdated = {
          ...newDataWithSentimentAndSummary,
          receivedDate: new Date(),
        };

        setFirstRowHiding(true);
        setEmails((prev) => {
          return [...prev, newDataUpdated];
        });
        await new Promise((resolve) => setTimeout(resolve, 200));
        setFirstRowHiding(false);
      });
    }
    fetchData();
  }, []);

  function handleHover(email: Email) {
    setSummaries((prev) => ({
      ...prev,
      [email.id]: email.summary,
    }));
  }

  function handleRowClick(emailId: string) {
    setSelectedEmailId(emailId);

    setEmails((prevEmails) =>
      prevEmails.map((em) => (em.id === emailId ? { ...em, seen: true } : em)),
    );
  }

  async function handleChangeSentiment(
    e: MouseEvent<HTMLButtonElement>,
    emailId: string,
  ) {
    e.stopPropagation();
    setChangingSentiment(emailId);
  }

  async function applySentimentChange(emailId: string) {
    const updated = emails.map((e) =>
      e.id === emailId ? { ...e, sentiment: newSentiment } : e,
    );
    setEmails(updated);
    setChangingSentiment(null);
  }

  const selectedEmail = selectedEmailId
    ? emails.find((e) => e.id === selectedEmailId)
    : null;

  if (emails.length === 0) {
    return <InBoxListPlaceHolder />;
  }

  const sortedEmails = [...emails].sort(
    (a, b) => b.receivedDate.getTime() - a.receivedDate.getTime(),
  );
  const filteredEmails = sortedEmails.filter(
    (e) => sentimentFilter[e.sentiment],
  );

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      <div className="w-1/3 border-r border-gray-300 flex flex-col">
        <div className="p-4 border-b border-gray-300 bg-white font-bold text-lg">
          Inbox
        </div>

        <div className="p-4 border-b border-gray-300 bg-white flex flex-wrap gap-2">
          {Object.entries(sentimentEmojis).map(([s, emoji]) => {
            const sentimentKey = s as Sentiment;
            const isActive = sentimentFilter[sentimentKey];
            return (
              <button
                key={s}
                onClick={() => handleToggleSentiment(sentimentKey)}
                className={`px-2 py-1 rounded flex items-center gap-1 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                }`}
              >
                <span>{emoji}</span>
                <span className="text-sm">{s}</span>
              </button>
            );
          })}
          <button
            onClick={handleSelectAll}
            className="px-3 py-1 bg-green-600 text-white rounded flex items-center gap-1 hover:bg-green-700"
          >
            <IconCheck size={16} />
            All
          </button>
          <button
            onClick={handleSelectNone}
            className="px-3 py-1 bg-red-600 text-white rounded flex items-center gap-1 hover:bg-red-700"
          >
            <IconX size={16} />
            None
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          {filteredEmails.map(function (email, index) {
            return (
              <div
                key={email.id}
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
                style={{
                  opacity: index === 0 && firstRowHiding ? 0 : 1,
                  transition:
                    index === 0 ? "opacity 1s ease-in-out" : undefined,
                }}
              >
                <div className="flex items-start gap-2">
                  {/* Indicator for whether the email has been seen */}
                  <div className="text-xl">
                    {email.seen ? (
                      <IconMailOpened className="text-green-600" size={20} />
                    ) : (
                      <IconMail className="text-gray-400" size={20} />
                    )}
                  </div>
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
                      {Object.keys(sentimentEmojis).map((s: string) => (
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