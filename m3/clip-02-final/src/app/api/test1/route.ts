import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    system:
      "You are an AI that provides responses based on users input. Only answer questions about currencies",
    messages,
  });

  return result.toDataStreamResponse();
}
