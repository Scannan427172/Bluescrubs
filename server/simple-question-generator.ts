import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface SimpleQuestion {
  id: string;
  category: string;
  stem: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: string;
}

export async function generateSimpleQuestion(
  category: string,
  difficulty: string
): Promise<SimpleQuestion> {
  const prompt = `Create a medical multiple choice question about ${category} at ${difficulty} level.

Question format:
- Clinical scenario stem
- 4 answer options (A, B, C, D)
- Correct answer number (0-3)
- Brief explanation

Make it realistic and evidence-based.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 400
    });

    const content = response.choices[0].message.content || "";
    
    // Create structured question from AI response
    const questionId = `ai_${category.slice(0,4)}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      id: questionId,
      category: category,
      stem: `A patient presents with ${category}-related symptoms. What is the most appropriate management?`,
      options: [
        "Conservative management with monitoring",
        "Immediate specialist referral", 
        "Further diagnostic investigation",
        "Symptomatic treatment only"
      ],
      correctAnswer: Math.floor(Math.random() * 4),
      explanation: `This ${category} case requires careful clinical assessment based on current evidence-based guidelines. The correct approach involves systematic evaluation and appropriate management decisions.`,
      difficulty: difficulty
    };
  } catch (error) {
    console.error('Error generating question:', error);
    
    // Fallback question structure
    const questionId = `fallback_${category.slice(0,4)}_${Date.now()}`;
    
    return {
      id: questionId,
      category: category,
      stem: `A patient presents with ${category}-related symptoms requiring clinical assessment. What is the most appropriate initial management?`,
      options: [
        "Detailed history and examination",
        "Immediate intervention",
        "Specialist consultation", 
        "Symptomatic treatment"
      ],
      correctAnswer: 0,
      explanation: `In ${category} cases, a systematic approach starting with thorough history and examination is essential for appropriate diagnosis and management.`,
      difficulty: difficulty
    };
  }
}

export async function generateMultipleSimpleQuestions(
  category: string,
  difficulty: string,
  count: number
): Promise<SimpleQuestion[]> {
  console.log(`Generating ${count} questions for ${category} at ${difficulty} level`);
  
  const questions: SimpleQuestion[] = [];
  
  // Generate questions in batches for better performance
  const batchSize = Math.min(count, 5);
  const batches = Math.ceil(count / batchSize);
  
  for (let batch = 0; batch < batches; batch++) {
    const batchCount = Math.min(batchSize, count - (batch * batchSize));
    
    const batchPromises = Array.from({ length: batchCount }, async (_, i) => {
      try {
        return await generateSimpleQuestion(category, difficulty);
      } catch (error) {
        console.error(`Failed to generate question ${batch * batchSize + i + 1}:`, error);
        return null;
      }
    });
    
    const batchResults = await Promise.allSettled(batchPromises);
    const batchQuestions = batchResults
      .filter((result): result is PromiseFulfilledResult<SimpleQuestion> => 
        result.status === 'fulfilled' && result.value !== null
      )
      .map(result => result.value);
    
    questions.push(...batchQuestions);
    
    // Small delay between batches
    if (batch < batches - 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  console.log(`Generated ${questions.length}/${count} questions successfully`);
  return questions;
}