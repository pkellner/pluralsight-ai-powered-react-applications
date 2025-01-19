"use client";
import { useState } from "react";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface UseChatOptions {
  api?: string; // e.g. "/api/test1"
  maxSteps?: number; // e.g. 5
}

interface UseChatReturn {
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  append: (message: Message) => void;
}

export function useChat({
  api = "/api/test1",
  maxSteps = Infinity,
}: UseChatOptions = {}): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [userSteps, setUserSteps] = useState<number>(0);

  async function streamAssistantReply(newMessages: Message[]) {
    const res = await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    if (!res.ok || !res.body) {
      console.error("Failed to fetch assistant response.");
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    // Insert a blank assistant message (so UI can show partial responses)
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
    let partialAssistantResponse = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      if (!value) continue;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        // Typically "0:" lines contain token text, "e:" or "d:" lines are metadata
        const prefix = trimmed.slice(0, 2); // "0:", "e:", or "d:"
        const content = trimmed.slice(2).trim();

        // If it's a text token line like 0:"Hello"
        if (prefix === "0:") {
          let token = content;
          // If the line is wrapped in quotes (e.g. `"Hello"`), remove them
          if (token.startsWith('"') && token.endsWith('"')) {
            token = token.slice(1, -1);
          }
          partialAssistantResponse += token;

          // Update the last assistant message with the new partial text
          setMessages((prev) => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (!last || last.role !== "assistant") {
              // Shouldn't happen if we inserted an assistant message, but just in case:
              updated.push({
                role: "assistant",
                content: partialAssistantResponse,
              });
            } else {
              updated[updated.length - 1] = {
                ...last,
                content: partialAssistantResponse,
              };
            }
            return updated;
          });
        } else if (prefix === "e:" || prefix === "d:") {
          // Typically usage data or finish reasons. Parse as needed:
          // const data = JSON.parse(content);
          // console.log("Event data:", data);
        }
      }
    }
  }

  function append(message: Message) {
    setMessages((prev) => [...prev, message]);
    if (message.role === "user") {
      // Count how many user messages we've appended
      setUserSteps((prev) => prev + 1);
      // If we haven't hit maxSteps, fire off the assistant request
      if (userSteps < maxSteps) {
        // Because setMessages is async, gather final messages ourselves:
        const newSet = [...messages, message];
        void streamAssistantReply(newSet);
      }
    }
  }

  return {
    messages,
    input,
    setInput,
    append,
  };
}
