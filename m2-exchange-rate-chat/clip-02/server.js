import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

generateText({
  model: openai("gpt-4"),
  prompt: "What is more valuable, 50 dollars or 50 euros?",
})
  .then((result) => console.log(result.text))
  .catch(console.error);
