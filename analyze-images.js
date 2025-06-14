import fs from 'fs';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function analyzeImages() {
  try {
    const image1Path = 'attached_assets/64218561-4470-4c99-a563-82f6f3f6ad57_1749940470256.jpeg';
    const image2Path = 'attached_assets/da962a62-2bc0-407f-9af9-f9ff0d93f30a_1749940470256.jpeg';
    
    if (!fs.existsSync(image1Path) || !fs.existsSync(image2Path)) {
      console.log('Images not found');
      return;
    }

    const image1 = fs.readFileSync(image1Path);
    const image2 = fs.readFileSync(image2Path);
    
    const base64Image1 = image1.toString('base64');
    const base64Image2 = image2.toString('base64');
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze these medical education interface screenshots. Describe what specific features, UI components, question formats, scoring systems, or educational elements are shown that could be implemented in a medical education web application. Be detailed about any unique functionality or interface patterns.'
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image1}`
              }
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image2}`
              }
            }
          ]
        }
      ],
      max_tokens: 1000
    });

    console.log('IMAGE ANALYSIS RESULTS:');
    console.log('========================');
    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error('Analysis error:', error.message);
  }
}

analyzeImages();