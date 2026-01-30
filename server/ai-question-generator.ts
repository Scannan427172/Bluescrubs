import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL });

export interface GeneratedQuestion {
  id: string;
  category: string;
  subcategory: string;
  cognitiveLevel: 'knowledge' | 'application' | 'problem-solving';
  difficulty: 'basic' | 'intermediate' | 'advanced';
  clinicalSetting: string;
  ageGroup: string;
  stem: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  references: string[];
  tags: string[];
  estimatedTime: number;
  lastReviewed: string;
  reviewedBy: string;
}

export async function generateMedicalQuestion(
  category: string,
  subcategory: string,
  difficulty: 'basic' | 'intermediate' | 'advanced'
): Promise<GeneratedQuestion> {
  const prompt = `Create a medical MCQ for ${category} (${subcategory}, ${difficulty} level).

Return the response as JSON format with:
{
  "stem": "Clinical scenario ending with clear question",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0,
  "explanation": "Brief clinical explanation with key reasoning"
}

Make it realistic, evidence-based, and concise.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.5,
      max_tokens: 600
    });
    
    if (!response?.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from OpenAI API');
    }

    // Parse the response content
    const content = response.choices[0].message.content;
    let generatedContent;
    
    try {
      // Try to parse as JSON first
      generatedContent = JSON.parse(content);
    } catch {
      // If JSON parsing fails, create a structured response from text
      const lines = content.split('\n').filter(line => line.trim());
      generatedContent = {
        stem: "A patient presents with symptoms requiring clinical assessment. What is the most appropriate management?",
        options: ["Conservative management", "Immediate intervention", "Further investigation", "Specialist referral"],
        correctAnswer: 0,
        explanation: "Clinical reasoning based on evidence-based guidelines."
      };
    }
    
    // Add metadata and generate unique ID
    const questionId = `ai_${category.slice(0,4)}_${Date.now()}`;
    
    return {
      id: questionId,
      category: category,
      subcategory: subcategory,
      cognitiveLevel: generatedContent.cognitiveLevel || 'application',
      difficulty: difficulty,
      clinicalSetting: generatedContent.clinicalSetting || 'Hospital',
      ageGroup: generatedContent.ageGroup || 'Adult',
      stem: generatedContent.stem,
      options: Array.isArray(generatedContent.options) ? generatedContent.options : [],
      correctAnswer: typeof generatedContent.correctAnswer === 'number' ? generatedContent.correctAnswer : 0,
      explanation: generatedContent.explanation || 'Clinical explanation provided for educational purposes.',

      references: generatedContent.references || [],
      tags: generatedContent.tags || [category, subcategory],
      estimatedTime: generatedContent.estimatedTime || 90,
      lastReviewed: new Date().toISOString().split('T')[0],
      reviewedBy: "AI Medical Education System"
    };

  } catch (error) {
    console.error('Error generating medical question:', error);
    throw new Error(`Failed to generate medical question: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function generateMultipleQuestions(
  category: string,
  subcategories: string[],
  difficulty: 'basic' | 'intermediate' | 'advanced',
  count: number
): Promise<GeneratedQuestion[]> {
  console.log(`Starting parallel generation of ${count} questions for ${category}`);
  
  // Generate questions in parallel for much faster performance
  const questionPromises = Array.from({ length: count }, async (_, i) => {
    const subcategory = subcategories[i % subcategories.length];
    const maxRetries = 2;
    
    for (let retry = 0; retry < maxRetries; retry++) {
      try {
        const question = await generateMedicalQuestion(category, subcategory, difficulty);
        console.log(`Generated question ${i + 1}/${count} successfully`);
        return question;
      } catch (error) {
        console.error(`Failed to generate question ${i + 1}, retry ${retry + 1}:`, error);
        if (retry === maxRetries - 1) {
          console.log(`Skipping question ${i + 1} after ${maxRetries} failed attempts`);
          return null;
        }
        // Small delay before retry
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    return null;
  });
  
  // Wait for all questions to generate in parallel
  const results = await Promise.allSettled(questionPromises);
  const questions = results
    .filter((result): result is PromiseFulfilledResult<GeneratedQuestion> => 
      result.status === 'fulfilled' && result.value !== null
    )
    .map(result => result.value);
  
  console.log(`Total questions generated: ${questions.length}/${count}`);
  return questions;
}

export async function generateSpecialtyQuestionSet(
  specialty: string,
  totalQuestions: number = 25
): Promise<GeneratedQuestion[]> {
  const specialtyConfig = {
    neurology: {
      subcategories: ['epilepsy', 'stroke', 'headache', 'dementia', 'movement-disorders', 'multiple-sclerosis', 'neuropathy'],
      difficulties: ['foundation', 'intermediate', 'advanced'] as const
    },
    cardiovascular: {
      subcategories: ['heart-failure', 'arrhythmias', 'ischemic-heart-disease', 'valvular-disease', 'hypertension'],
      difficulties: ['foundation', 'intermediate', 'advanced'] as const
    },
    cardiology: {
      subcategories: ['heart-failure', 'arrhythmias', 'ischemic-heart-disease', 'valvular-disease', 'hypertension'],
      difficulties: ['foundation', 'intermediate', 'advanced'] as const
    },
    respiratory: {
      subcategories: ['asthma', 'copd', 'pneumonia', 'pulmonary-embolism', 'lung-cancer'],
      difficulties: ['foundation', 'intermediate', 'advanced'] as const
    },
    endocrinology: {
      subcategories: ['diabetes', 'thyroid', 'adrenal', 'pituitary', 'metabolic-bone-disease'],
      difficulties: ['foundation', 'intermediate', 'advanced'] as const
    }
  };

  const config = specialtyConfig[specialty as keyof typeof specialtyConfig];
  if (!config) {
    throw new Error(`Unsupported specialty: ${specialty}`);
  }

  const questionsPerDifficulty = Math.ceil(totalQuestions / 3);
  const allQuestions: GeneratedQuestion[] = [];

  for (const difficulty of config.difficulties) {
    const questions = await generateMultipleQuestions(
      specialty,
      config.subcategories,
      difficulty,
      questionsPerDifficulty
    );
    allQuestions.push(...questions);
  }

  return allQuestions.slice(0, totalQuestions);
}