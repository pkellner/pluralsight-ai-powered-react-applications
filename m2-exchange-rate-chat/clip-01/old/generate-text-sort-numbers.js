import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import "dotenv/config";

async function main() {
  const userQuestion = "What number comes next: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3...?";

  // First try without tool
  const aiResult = await generateText({
    model: openai("gpt-4"),
    temperature: 0.9,
    messages: [{ role: "user", content: userQuestion }]
  });

  console.log("// userQuestion:", userQuestion);
  console.log("// AI's potentially wrong answer:", aiResult.text);

  // Now with tool
  const toolResult = await generateText({
    model: openai("gpt-4"),
    messages: [{ role: "user", content: userQuestion }],
    tools: {
      getNextNumber: {
        description: "Find next number in repeating sequence",
        parameters: z.object({
          number: z.number().describe("The next number in sequence"),
        }),
        execute: async ({ number }) => {
          return `The next number is ${number}. The sequence is clearly repeating (1-10, 1-10...), so after 3 comes 4.`;
        },
      }
    },
    functionCall: "getNextNumber",
    temperature: 0
  });

  if (toolResult.functionCalls?.[0]) {
    const toolResponse = await toolResult.functionCalls[0].function.execute({
      number: 4
    });
    console.log("// Tool's correct answer:", toolResponse);
  }
}

main().catch(console.error);