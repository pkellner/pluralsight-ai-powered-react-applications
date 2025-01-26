import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  const result = streamText({
    model: openai("gpt-4"),
    system: `
        1. Provide responses based on user input.
        2. Specialize in currency exchange-related questions only.
        3. Politely decline unrelated questions about other topics.
        4. Keep explanations clear, concise, and user-friendly.
        5. Avoid financial advice; focus on factual information.
        6. When a currency or country is not supported, 
           clearly state this and end the response.
        7. Do not make assumptions or offer alternative conversions
           when data is unavailable.
        8. Use polite and professional language in all interactions.
    `,
    messages,
  });

  return result.toDataStreamResponse();
}