import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Set up an initial system message so the AI has context
const messages: Message[] = [
  {
    role: "assistant",
    content: `You are an AI that provides responses based on the following rules:
1. For currency conversions, assume $1 (USD) is equivalent to €0.5 (EUR).
2. If asked about any currency conversions other than USD to EUR, respond appropriately explaining the limitation.`,
  },
];

console.log("Welcome to the AI console. Type 'exit' to quit.\n");
process.stdout.write("> ");

// Handle user input
process.stdin.on("data", async (data) => {
  const userInput = data.toString().trim();

  if (userInput.toLowerCase() === "exit") {
    console.log("Exiting...");
    process.exit(0);
  }

  // Add the user input to the message history
  messages.push({ role: "user", content: userInput });

  try {
    const result = streamText({
      model: openai("gpt-4"),
      temperature: 0.9,
      messages,
    });

    process.stdout.write("Agent: ");
    let aiResponse = "";

    for await (const textPart of result.textStream) {
      process.stdout.write(textPart);
      aiResponse += textPart;
    }

    console.log();

    // Add the AI response to the message history
    messages.push({
      role: "assistant",
      content: aiResponse,
    });
  } catch (error) {
    console.error("Error:", error);
  }

  process.stdout.write("> ");
});
