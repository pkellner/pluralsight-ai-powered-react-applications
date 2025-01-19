import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface UseChatReturn {
  messages: Message[];
  sendMessage: (
    content: string,
    onToken?: (token: string) => void,
  ) => Promise<void>;
}

// A replacement for the original useChat, now without React and retaining
// the system message logic from the old console script.
export function useChat(): UseChatReturn {
  // Initialize messages with a system-style "assistant" message, as before
//   const messages: Message[] = [
//     {
//       role: "assistant",
//       content: `You are an AI that provides responses based on the following rules:
// 1. For currency conversions, assume $1 (USD) is equivalent to €0.5 (EUR).
// 2. If asked about any currency conversions other than USD to EUR, respond appropriately explaining the limitation.`,
//     },
//   ];

  const messages: Message[] = [
    {
      role: "assistant",
      content: `You are an AI that provides responses based on users input`,
    },
  ];

  async function sendMessage(
    content: string,
    onToken?: (token: string) => void,
  ) {
    // Add the user's message
    messages.push({ role: "user", content });

    // Stream the AI response
    try {
      const result = streamText({
        model: openai("gpt-4"),
        temperature: 0.9,
        messages,
      });

      let assistantResponse = "";
      for await (const textPart of result.textStream) {
        assistantResponse += textPart;
        // Provide a callback so we can stream tokens in real time
        if (onToken) {
          onToken(textPart);
        }
      }

      // Add the complete assistant response
      messages.push({ role: "assistant", content: assistantResponse });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return {
    messages,
    sendMessage,
  };
}
