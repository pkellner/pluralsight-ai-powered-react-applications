"use client";

import { useRef, useEffect } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import {useChat} from "ai/react";

export default function Page() {

  const { messages, input, setInput, append } = useChat({api: "/api/chat",});

  const inputRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = mainRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSend() {
    if (!input.trim()) return;
    append({ content: input, role: "user" });
    setInput("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="p-4 bg-blue-600 text-white font-bold text-xl flex items-center justify-center">
        Currency Exchange Chatbot
      </header>
      <main ref={mainRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(function (message, index) {
          const htmlContent = marked(message.content);
          const safeHtml = DOMPurify.sanitize(htmlContent as string);
          return (
            <div
              key={index}
              className={`max-w-md p-3 rounded-lg shadow break-words ${
                message.role === "user"
                  ? "bg-blue-400 text-white self-end ml-auto"
                  : "bg-gray-200 text-black self-start mr-auto"
              }`}
            >
              {message.content.length === 0 ? (
                <span className="italic text-gray-500">Thinking...</span>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
              )}
            </div>
          );
        })}
      </main>
      <div className="p-4 bg-white border-t flex items-center space-x-2">
        <input
          ref={inputRef}
          className="flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSend();
            }
          }}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0h24v24H0z" stroke="none" />
            <path d="M10 14l11 -11" />
            <path d="M21 3l-6.5 18.4a0.55.55 0 0 1 -1 .1l-2.72 -7.05l-7.05 -2.72a0.55.55 0 0 1 .1 -1L21 3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
