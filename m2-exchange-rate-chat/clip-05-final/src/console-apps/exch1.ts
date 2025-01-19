import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import "dotenv/config";

// just question with no history

async function main(): Promise<void> {
  // Example prompt for the AI model
  const prompt: string = "Convert $150 Dollars to Euros";

  // Stream text from OpenAI's GPT-4 using the ai-sdk library (don't remove await)
  const result = await streamText({
    model: openai("gpt-4"), // Specify the model
    temperature: 0.9, // Creativity level
    prompt, // Prompt passed to the model
  });

  // Stream the response in chunks
  for await (const textPart of result.textStream) {
    process.stdout.write(textPart); // Write response chunks without line breaks
  }

  console.log(); // Ensure a new line after all text is printed
}

// Execute the main function and handle errors
main().catch(console.error);

/*
Comparison:
1. Standard ChatGPT: Directly returns the complete result after processing.
2. Streamed Approach (this script): Streams responses in real-time, chunk by chunk. This is particularly useful for reducing perceived latency when handling large responses or real-time applications.
*/
