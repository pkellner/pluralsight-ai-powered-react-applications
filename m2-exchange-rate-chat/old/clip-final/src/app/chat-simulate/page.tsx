'use client';
import React, { useState } from "react";
import { useChat } from "./use-chat";

function ChatComponent() {
  const {
    messages,
    sendMessage,
  } = useChat();

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div style={{ margin: "1rem" }}>
      <h3>Chat Messages</h3>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            <strong>{msg.role}:</strong> {msg.content}
          </li>
        ))}
      </ul>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        style={{ marginTop: "1rem" }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" style={{ marginLeft: "0.5rem" }}>
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatComponent;