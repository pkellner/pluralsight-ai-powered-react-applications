import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Add the same "assistant" instruction as in the console example
  const initialMessage = {
    role: "assistant",
    content: `You are an AI that provides responses based on the following rules:
      1. You can only answer questions about currency conversions that involve USD, EUR and Yen. Otherwise respond appropriately.
      2. The only currencies you know about are the USD, EUR and YEN
      3. For currency conversions, assume $1 (USD) is equivalent to €0.5 (EUR).
      4. You also know that $1 (USD) is equivalent to ¥110 (Yen).
      5. You can make assumptions for converting between all three currencies rates`,
  };

  const updatedMessages = [initialMessage, ...messages];

  const result = streamText({
    model: openai("gpt-4-turbo"),
    system: "You are a helpful assistant.",
    messages: updatedMessages,
  });

  return result.toDataStreamResponse();
}
