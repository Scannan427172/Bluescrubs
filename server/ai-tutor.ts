import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-openai-placeholder'
});

interface TutorContext {
  question?: any;
  performance?: any;
  userLevel?: string;
}

interface TutorResponse {
  response: string;
  studyTips?: string[];
  mnemonics?: string[];
  relatedConcepts?: string[];
  recommendedTopics?: string[];
}

export async function generateTutorResponse(query: string, context?: TutorContext): Promise<TutorResponse> {
  try {
    const systemPrompt = `You are an expert medical tutor specializing in PLAB 1 exam preparation. Your role is to:

1. Provide clear, accurate medical explanations suitable for medical students
2. Break down complex concepts into understandable parts
3. Offer practical study tips and memory aids
4. Connect related medical concepts
5. Suggest focused study areas based on performance

Guidelines:
- Use UK medical terminology and guidelines (NICE, CKS, GMC standards)
- Provide clinically accurate information
- Offer practical exam strategies
- Create memorable mnemonics when helpful
- Be encouraging but realistic about study requirements

Current context: ${context ? JSON.stringify(context, null, 2) : 'No specific context provided'}`;

    const userPrompt = buildUserPrompt(query, context);

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 1500,
      temperature: 0.3,
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userPrompt
        }
      ]
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from AI');
    }

    return parseAIResponse(content.text);
  } catch (error) {
    console.error('AI Tutor generation error:', error);
    
    // Fallback response for when AI is unavailable
    return generateFallbackResponse(query, context);
  }
}

function buildUserPrompt(query: string, context?: TutorContext): string {
  let prompt = `Student Query: ${query}\n\n`;

  if (context?.question) {
    prompt += `Current Question Context:\n`;
    prompt += `Scenario: ${context.question.scenario}\n`;
    prompt += `Question: ${context.question.question}\n`;
    prompt += `Correct Answer: ${context.question.options[context.question.correct_answer]}\n`;
    prompt += `Explanation: ${context.question.explanation}\n\n`;
  }

  if (context?.performance) {
    prompt += `Student Performance Context:\n`;
    prompt += `Recent performance data available for personalized recommendations.\n\n`;
  }

  prompt += `Please provide:
1. A clear, helpful response to the student's query
2. 3-5 practical study tips (if applicable)
3. Memory aids or mnemonics (if applicable)
4. Related medical concepts to explore
5. Recommended study focus areas

Format your response as a structured text that I can parse for different sections.`;

  return prompt;
}

function parseAIResponse(text: string): TutorResponse {
  const response: TutorResponse = {
    response: text
  };

  // Extract study tips
  const studyTipsMatch = text.match(/(?:Study Tips?|Tips for Success|Learning Strategies?)[\s\S]*?(?=\n\n|\n[A-Z]|$)/i);
  if (studyTipsMatch) {
    const tipsSection = studyTipsMatch[0];
    const tips = tipsSection.split('\n')
      .filter(line => line.match(/^\d+\.|\-|\•/))
      .map(tip => tip.replace(/^\d+\.|\-|\•\s*/, '').trim())
      .filter(tip => tip.length > 10);
    if (tips.length > 0) response.studyTips = tips;
  }

  // Extract mnemonics
  const mnemonicsMatch = text.match(/(?:Mnemonic|Memory Aid|Remember)[\s\S]*?(?=\n\n|\n[A-Z]|$)/i);
  if (mnemonicsMatch) {
    const mnemonicsSection = mnemonicsMatch[0];
    const mnemonics = mnemonicsSection.split('\n')
      .filter(line => line.includes(':') || line.match(/[A-Z]{2,}/))
      .map(mnemonic => mnemonic.trim())
      .filter(mnemonic => mnemonic.length > 3 && mnemonic.length < 100);
    if (mnemonics.length > 0) response.mnemonics = mnemonics;
  }

  // Extract related concepts
  const conceptsMatch = text.match(/(?:Related Concepts?|Also Consider|Similar Topics?)[\s\S]*?(?=\n\n|\n[A-Z]|$)/i);
  if (conceptsMatch) {
    const conceptsSection = conceptsMatch[0];
    const concepts = conceptsSection.split('\n')
      .filter(line => line.match(/^\d+\.|\-|\•/))
      .map(concept => concept.replace(/^\d+\.|\-|\•\s*/, '').trim())
      .filter(concept => concept.length > 3 && concept.length < 80);
    if (concepts.length > 0) response.relatedConcepts = concepts;
  }

  return response;
}

function generateFallbackResponse(query: string, context?: TutorContext): TutorResponse {
  const response: TutorResponse = {
    response: "I'm currently experiencing technical difficulties, but I can still help with some general guidance."
  };

  // Provide basic study tips based on query content
  if (query.toLowerCase().includes('explain') || query.toLowerCase().includes('understand')) {
    response.studyTips = [
      "Break complex topics into smaller, manageable chunks",
      "Use active recall by testing yourself regularly",
      "Connect new information to what you already know",
      "Practice with similar questions to reinforce learning"
    ];
  }

  if (query.toLowerCase().includes('remember') || query.toLowerCase().includes('memorize')) {
    response.studyTips = [
      "Create visual associations for complex information",
      "Use spaced repetition for long-term retention",
      "Practice retrieval without looking at notes",
      "Teach the concept to someone else"
    ];
  }

  if (context?.question) {
    const specialty = extractSpecialty(context.question.scenario);
    response.relatedConcepts = getRelatedConcepts(specialty);
  }

  return response;
}

function extractSpecialty(scenario: string): string {
  const cardiacTerms = ['heart', 'cardiac', 'chest pain', 'murmur', 'ecg'];
  const respiratoryTerms = ['lung', 'breath', 'cough', 'wheeze', 'oxygen'];
  const neuroTerms = ['headache', 'seizure', 'weakness', 'confused', 'stroke'];
  
  const lowerScenario = scenario.toLowerCase();
  
  if (cardiacTerms.some(term => lowerScenario.includes(term))) return 'cardiology';
  if (respiratoryTerms.some(term => lowerScenario.includes(term))) return 'respiratory';
  if (neuroTerms.some(term => lowerScenario.includes(term))) return 'neurology';
  
  return 'general';
}

function getRelatedConcepts(specialty: string): string[] {
  const concepts: Record<string, string[]> = {
    cardiology: ['ECG interpretation', 'Heart failure management', 'Arrhythmia recognition', 'Chest pain differential'],
    respiratory: ['Asthma management', 'COPD assessment', 'Pneumonia diagnosis', 'Oxygen therapy'],
    neurology: ['Stroke protocols', 'Seizure management', 'Headache red flags', 'Neurological examination'],
    general: ['Clinical reasoning', 'Patient safety', 'Communication skills', 'Evidence-based practice']
  };
  
  return concepts[specialty] || concepts.general;
}