interface PerplexityResponse {
  id: string;
  model: string;
  object: string;
  created: number;
  citations: string[];
  choices: {
    index: number;
    finish_reason: string;
    message: {
      role: string;
      content: string;
    };
    delta: {
      role: string;
      content: string;
    };
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface AIResponse {
  answer: string;
  citations: string[];
  confidence: 'high' | 'medium' | 'low';
  sources: {
    title: string;
    url: string;
    type: 'guideline' | 'research' | 'educational';
  }[];
}

export async function askMedicalAI(question: string): Promise<AIResponse> {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  
  if (!apiKey) {
    throw new Error('Perplexity API key not configured');
  }

  const systemPrompt = `You are a medical education AI assistant providing evidence-based answers for healthcare professionals and students. Focus on:

1. Provide accurate, evidence-based medical information
2. Reference current guidelines (NICE, WHO, ESC, AHA, etc.)
3. Include differential diagnoses when relevant
4. Mention contraindications and safety considerations
5. Use clear, professional medical language
6. Always emphasize when clinical judgment is needed

Format your response with:
- Clear, structured answer
- Key clinical points
- Current guideline references
- Safety considerations when relevant`;

  const userPrompt = `Medical Question: ${question}

Please provide a comprehensive, evidence-based answer suitable for medical education. Include:
- Pathophysiology when relevant
- Current diagnostic criteria or guidelines
- Treatment approaches with evidence levels
- Important contraindications or precautions
- Recent updates to guidelines if applicable`;

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.2,
        top_p: 0.9,
        search_domain_filter: [
          'who.int',
          'nice.org.uk', 
          'uptodate.com',
          'bmj.com',
          'nejm.org',
          'thelancet.com',
          'jamanetwork.com',
          'escardio.org',
          'heart.org',
          'guidelines.diabetes.org.uk'
        ],
        return_images: false,
        return_related_questions: false,
        search_recency_filter: 'year',
        top_k: 0,
        stream: false,
        presence_penalty: 0,
        frequency_penalty: 0.1
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Perplexity API error: ${response.status} - ${errorText}`);
    }

    const data: PerplexityResponse = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response from AI service');
    }

    const content = data.choices[0].message.content;
    const citations = data.citations || [];

    // Determine confidence based on content quality and citations
    const confidence = determineConfidence(content, citations);

    // Extract and format sources from citations
    const sources = formatSources(citations);

    return {
      answer: content,
      citations,
      confidence,
      sources
    };

  } catch (error) {
    console.error('Perplexity API error:', error);
    throw new Error('Unable to get AI response. Please try again.');
  }
}

function determineConfidence(content: string, citations: string[]): 'high' | 'medium' | 'low' {
  const citationCount = citations.length;
  const hasGuidelines = citations.some(citation => 
    citation.includes('nice.org.uk') || 
    citation.includes('who.int') || 
    citation.includes('guidelines')
  );
  const hasRecentSources = citations.some(citation => 
    citation.includes('2023') || citation.includes('2024')
  );

  if (citationCount >= 3 && hasGuidelines && hasRecentSources) {
    return 'high';
  } else if (citationCount >= 2 && (hasGuidelines || hasRecentSources)) {
    return 'medium';
  } else {
    return 'low';
  }
}

function formatSources(citations: string[]) {
  return citations.slice(0, 5).map(citation => {
    const url = citation;
    let title = extractTitleFromUrl(url);
    let type: 'guideline' | 'research' | 'educational' = 'educational';

    if (url.includes('nice.org.uk') || url.includes('who.int') || url.includes('guidelines')) {
      type = 'guideline';
      title = title.replace(/\|\s*NICE|\|\s*WHO|\|\s*Guidelines/gi, '').trim();
    } else if (url.includes('nejm.org') || url.includes('thelancet.com') || url.includes('bmj.com')) {
      type = 'research';
    }

    return {
      title: title || 'Medical Reference',
      url,
      type
    };
  });
}

function extractTitleFromUrl(url: string): string {
  try {
    const urlParts = url.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    return lastPart
      .replace(/[-_]/g, ' ')
      .replace(/\.[^.]*$/, '')
      .replace(/\b\w/g, l => l.toUpperCase())
      .substring(0, 100);
  } catch {
    return 'Medical Reference';
  }
}