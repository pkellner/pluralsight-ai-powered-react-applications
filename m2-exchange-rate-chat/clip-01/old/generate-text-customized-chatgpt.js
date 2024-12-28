import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import "dotenv/config";

async function main() {
  // For this example, we'll parse a hard-coded user question
  const userQuestion = "How many months are there that contain 30 days?";
  const days = 30;
  const isContain = userQuestion.toLowerCase().includes("contain");

  console.log("// userQuestion:", userQuestion);

  const result = await generateText({
    model: openai("gpt-4"),
    temperature: 0.9,
    messages: [
      {
        role: "user",
        content: userQuestion
      }
    ],
    tools: {
      analyzeDaysQuery: {
        description:
          "Use this function to count how many months in the calendar either contain or have exactly a certain number of days.",
        parameters: z.object({
          days: z.number().describe("The number of days to check"),
          isContain: z.boolean().optional(),
        }),
        execute: async ({ days, isContain = false }) => {
          console.log("// analyzeDaysQuery execute called");
          if (isContain) {
            if (days === 28) {
              return "All 12 months contain at least 28 days.";
            } else if (days === 29) {
              return "All but (common) February contain at least 29 days (11 months).";
            } else if (days === 30) {
              return "11 months contain 30 days. February may have fewer.";
            } else if (days === 31) {
              return "7 months contain 31 days: January, March, May, July, August, October, and December.";
            }
            return `No months contain ${days} days.`;
          } else {
            if (days === 28) {
              return "Only February in common years has exactly 28 days.";
            } else if (days === 29) {
              return "Only February in leap years has exactly 29 days.";
            } else if (days === 30) {
              return "There are 4 months that have exactly 30 days: April, June, September, and November.";
            } else if (days === 31) {
              return "There are 7 months that have exactly 31 days: January, March, May, July, August, October, and December.";
            }
            return `No months in the calendar have exactly ${days} days.`;
          }
        },
      },
    },
    functionCall: {
      name: "analyzeDaysQuery",
      arguments: JSON.stringify({ days, isContain }),
    },
  });

  // If the model was forced to only respond via functionCall, `result.text` might be blank
  console.log("// result.text:", result.text || "(empty)");

  // The tool's response usually ends up in `functionCalls` as the "arguments" to the function
  // Grab that function output if `result.text` is empty
  const toolOutput = result?.functionCalls?.[0]?.arguments;
  console.log("// toolOutput:", toolOutput || "(empty)");
}

main().catch(console.error);
