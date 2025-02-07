"use server";

import { experimental_generateImage as generateImage } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const StyleSchema = z.enum(["vivid", "natural"]).optional();
const QualitySchema = z.enum(["standard", "hd"]).optional();

export async function generateAds(
  holiday: string,
  productName: string,
  style?: string,
  quality?: string,
  instructions?: string,
): Promise<{ image: string }[]> {
  
  StyleSchema.parse(style);
  QualitySchema.parse(quality);

  const numberOfImages = 1;

  let prompt = `Create an advertisement for ${productName} with a theme of ${holiday};`;
  prompt += `also, follow these more general instructions:
                  1: Ensure all advertisements include cheerful and engaging visuals.  
                  2: Avoid generating imagery or themes offensive to any group or culture.  
                  3: Incorporate text that directly relates to the specific holiday theme.  
                  4: Use a unified palette Fresh teal, coral, golden yellow, and cool gray form a vibrant, cheerful, and harmonious brand look.. 
                  5: Add symbols or icons associated with the specific holiday celebration.  
                  6: Ensure advertisements feel inclusive and welcoming to all audiences.  
                  7: Use dynamic layouts with bold typography and creative design elements.  
                  8: Prioritize crisp, professional designs without clutter or distractions.  
                  9: Maintain cohesive branding while adapting to each unique holiday.
                  `;

  if (instructions && instructions.trim().length > 0) {
    prompt += `; additional instructions: ${instructions.trim()}`;
  }

  try {
    const { images } = await generateImage({
      model: openai.image("dall-e-3"),
      prompt,
      n: numberOfImages,
      providerOptions: {
        openai: {
          style: style || "natural",
          quality: quality || "standard",
        },
      },
    });
    return images.map((image) => ({
      image: image.base64 || "",
    }));
  } catch (error) {
    console.error("Error generating ads:", error);
    throw new Error("Failed to generate advertisements");
  }
}
