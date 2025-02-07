import { useChat } from "./use-chat";
const { sendMessage } = useChat();

console.log("Welcome to the AI console. Type 'exit' to quit.\n");
process.stdout.write("> ");

process.stdin.on("data", async (data) => {
  const userInput = data.toString().trim();

  if (userInput.toLowerCase() === "exit") {
    console.log("Exiting...");
    process.exit(0);
  }

  process.stdout.write("Agent: ");

  function tokenFunction(token: string) {
    process.stdout.write(token);
  }

  await sendMessage(userInput, tokenFunction);
  console.log();

  process.stdout.write("> ");
});
