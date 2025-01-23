export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface UseChatReturn {
  sendMessage: (
    content: string,
    onToken?: (token: string) => void,
  ) => Promise<void>;
  messages: Message[];
}

export function useChat(): UseChatReturn {
  const messages: Message[] = [
    {
      role: "assistant",
      content: `Welcome! Type something, and I'll echo it back to you.`,
    },
  ];

  async function sendMessage(
    content: string,
    onToken?: (token: string) => void,
  ) {
    // Add the user's message
    messages.push({ role: "user", content });

    // Simulate assistant response
    const assistantResponse = `You said: "${content}". Message count: ${messages.length/2}`;
    messages.push({ role: "assistant", content: assistantResponse });

    // Stream response tokens if callback provided
    if (onToken) {
      for (const token of assistantResponse.split(" ")) {
        await new Promise((resolve) => setTimeout(resolve, 75)); // Simulate delay
        onToken(`${token} `);
      }
    }
  }

  return {
    messages,
    sendMessage,
  };
}
