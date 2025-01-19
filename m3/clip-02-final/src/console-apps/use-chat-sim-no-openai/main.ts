import { useChat } from "./use-chat";

console.log("Welcome to the AI console. Type 'exit' to quit.\n");
process.stdout.write("> ");

// get function that will process the prompt message and stream result
const { sendMessage } = useChat();

// process input typed into console
process.stdin.on("data", async (data) => {
  const userInput = data.toString().trim();

  // check for user typing "exit" at prompt
  if (userInput.toLowerCase() === "exit") {
    console.log("Exiting...");
    process.exit(0);
  }

  process.stdout.write("Agent: ");

  // send input and stream output
  function tokenFunction(token: string) {
    process.stdout.write(token);
  }

  await sendMessage(userInput, tokenFunction);

  // Move to a new line after the response is done
  console.log();

  process.stdout.write("> ");
});
