import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface UseChatReturn {
  sendMessage: (
    content: string,
    onToken: (token: string) => void,
  ) => Promise<void>;
  messages: Message[];
}

export function useChat(): UseChatReturn {
  const messages: Message[] = [
    {
      role: "assistant",
      content: "You are an AI that provides responses based on users",
    },
  ];

  async function sendMessage(
    content: string,
    onToken: (token: string) => void,
  ) {
    messages.push({ role: "user", content });

    const result = streamText({
      model: openai("gpt-4"),
      temperature: 0.9,
      messages,
    });

    let assistantResponse = "";
    for await (const token of result.textStream) {
      assistantResponse += token;
      onToken(token);
    }
    messages.push({ role: "assistant", content: assistantResponse });
  }
  return {
    messages,
    sendMessage,
  };
}
