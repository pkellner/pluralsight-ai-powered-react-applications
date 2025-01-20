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
  const messages: Message[] = [];

  async function sendMessage(
    content: string,
    onToken: (token: string) => void,
  ) {
    messages.push({ role: "user", content });

    const assistantResponse = `You said: "${content}". Message count: ${(messages.length - 1) / 2 + 1
      }`;
    messages.push({ role: "assistant", content: assistantResponse });

    for (const token of assistantResponse.split(" ")) {
      await new Promise((resolve) => setTimeout(resolve, 75)); // Simulate delay
      onToken(`${token} `);
    }
  }
  return {
    messages,
    sendMessage,
  };
}
