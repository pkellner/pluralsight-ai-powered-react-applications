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
  maxSteps = 10,
}: UseChatOptions = {}): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  // Keep track of how many user messages we’ve sent, to limit with maxSteps
  const [userSteps, setUserSteps] = useState<number>(0);

  async function streamAssistantReply(newMessages: Message[]) {
    // Make the request to your endpoint
    const res = await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    if (!res.ok || !res.body) {
      console.error("Failed to fetch assistant response");
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    // Add a blank assistant message first (so UI can show a "Thinking..." placeholder)
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    let partialAssistantResponse = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      if (!value) continue;

      // Decode the incoming chunk
      partialAssistantResponse += decoder.decode(value);

      // Update the *last* message in state so the UI sees partial tokens
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (!last || last.role !== "assistant") {
          return [
            ...prev,
            { role: "assistant", content: partialAssistantResponse },
          ];
        } else {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...last,
            content: partialAssistantResponse,
          };
          return updated;
        }
      });
    }
  }

  function append(message: Message) {
    // Add this new message to state
    setMessages((prev) => {
      const next = [...prev, message];
      return next;
    });

    // If it’s from the user, and we haven’t exceeded maxSteps, call the AI
    if (message.role === "user") {
      setUserSteps((prev) => prev + 1);
      if (userSteps < maxSteps) {
        // We can’t rely on setMessages(updated) being synchronous,
        // so gather the final set of messages ourselves:
        const newMessages = [...messages, message];
        void streamAssistantReply(newMessages);
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
