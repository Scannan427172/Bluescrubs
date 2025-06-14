import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function analyzeImage(imagePath: string): Promise<string> {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this image and describe what features, functionality, or interface elements are shown. Focus on any medical education, question interface, or UI components that might be relevant to implementing in a web application."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 500
    });

    return response.choices[0].message.content || "Unable to analyze image";
  } catch (error) {
    console.error('Error analyzing image:', error);
    return "Error analyzing image";
  }
}

export async function analyzeMultipleImages(imagePaths: string[]): Promise<string[]> {
  const results = await Promise.all(
    imagePaths.map(path => analyzeImage(path))
  );
  return results;
}