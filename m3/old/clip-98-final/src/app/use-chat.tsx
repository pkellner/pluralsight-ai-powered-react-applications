"use client";
import { useState } from "react";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface UseChatReturn {
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  append: (message: Message) => void;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [userSteps, setUserSteps] = useState(0);

  async function streamAssistantReply(newMessages: Message[]) {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });
    if (!res.body) return;

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let partial = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      if (!value) continue;

      const lines = decoder.decode(value, { stream: true }).split("\n");
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        if (trimmed.startsWith("0:")) {
          let token = trimmed.slice(2).trim();
          if (token.startsWith('"') && token.endsWith('"')) {
            token = token.slice(1, -1);
          }
          token = token.replace(/\\n/g, "\n");
          partial += token;
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = { role: "assistant", content: partial };
            return next;
          });
        }
      }
    }
  }

  function append(message: Message) {
    const maxSteps = 5;
    setMessages((prev) => [...prev, message]);
    if (message.role === "user") {
      setUserSteps((prev) => prev + 1);
      if (userSteps < maxSteps) {
        const newSet = [...messages, message];
        void streamAssistantReply(newSet);
      }
    }
  }

  return { messages, input, setInput, append };
}
