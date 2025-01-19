import { useChat } from "./use-chat";

console.log("Welcome to the AI console. Type 'exit' to quit.\n");
process.stdout.write("> ");

// Create the chat instance
const { sendMessage } = useChat();

// Handle user input
process.stdin.on("data", async (data) => {
  const userInput = data.toString().trim();

  if (userInput.toLowerCase() === "exit") {
    console.log("Exiting...");
    process.exit(0);
  }

  process.stdout.write("Agent: ");

  // Stream tokens as they arrive
  await sendMessage(userInput, (token) => {
    process.stdout.write(token);
  });

  console.log(); // Move to a new line after the response is done
  process.stdout.write("> ");
});
