"use client";

import React, { ReactElement } from "react";

// You can import these from wherever they’re defined or just paste them inline:
type Sentiment =
  | "Angry"
  | "Needy"
  | "Confused"
  | "Appreciative"
  | "Complimentary"
  | "Pending"
  | "Promotional"
  | "Personal";

const sentimentEmojis: { [key in Sentiment]: string } = {
  Angry: "😡",
  Needy: "🙏",
  Confused: "🤔",
  Appreciative: "🙌",
  Complimentary: "😊",
  Pending: "🤷",
  Promotional: "🎉",
  Personal: "👨‍👩‍👧‍👦",
};

export default function EmotionEmojisTable(): ReactElement {
  const sentiments = Object.entries(sentimentEmojis);

  return (
    <table className="table-auto border-collapse w-full max-w-md mx-auto mt-8">
      <thead>
        <tr>
          <th className="border px-4 py-2 bg-gray-100">Emotion</th>
          <th className="border px-4 py-2 bg-gray-100">Emoji</th>
        </tr>
      </thead>
      <tbody>
        {sentiments.map(([emotion, emoji]) => (
          <tr key={emotion}>
            <td className="border px-4 py-2 text-center">{emotion}</td>
            <td className="border px-4 py-2 text-center text-5xl">{emoji}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
