"use client";

import { useChat } from "ai/react";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({});

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id} className="mb-2">
            <strong>{message.role === "user" ? "User: " : "AI: "}</strong>
            {message.content}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 p-2 border-t"
      >
        <input
          name="prompt"
          value={input}
          onChange={handleInputChange}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="px-4 py-1 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
