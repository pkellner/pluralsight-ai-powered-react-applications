import { useState } from 'react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
}

interface UseChatReturn {
  messages: Message[];
  sendMessage: (content: string) => void;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = (content: string) => {
    // Create user and assistant messages
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      role: 'user',
    };

    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      content: `${">".repeat(messages.length / 2 + 1)} ${content}`,
      role: 'assistant',
    };

    // Update messages
    setMessages((prev) => [...prev, userMessage, assistantMessage]);
  };

  return {
    messages,
    sendMessage,
  };
}
