import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft,
  Brain,
  Send,
  Sparkles,
  BookOpen,
  Stethoscope,
  MessageCircle,
  Clock,
  CheckCircle
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function AskNHSPrep() {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responses, setResponses] = useState<Array<{
    question: string;
    answer: string;
    timestamp: Date;
  }>>([]);

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    const currentQuestion = question;
    setQuestion("");
    
    // Simulate AI processing
    setTimeout(() => {
      const mockResponse = getMockResponse(currentQuestion);
      setResponses(prev => [...prev, {
        question: currentQuestion,
        answer: mockResponse,
        timestamp: new Date()
      }]);
      setIsLoading(false);
    }, 2000);
  };

  const getMockResponse = (q: string) => {
    const responses = [
      `Based on current UK medical guidelines, here's what you need to know:

**Clinical Approach:**
This scenario follows NICE guidance and standard NHS protocols. The key considerations are:

1. **Assessment**: Follow the systematic approach used in UK clinical practice
2. **Guidelines**: This aligns with current NICE/CKS recommendations
3. **PLAB Relevance**: This type of question commonly appears in PLAB examinations

**Key Learning Points:**
- Always consider safety-netting advice
- Follow the GMC's Good Medical Practice principles
- Apply evidence-based medicine as per UK standards

Would you like me to elaborate on any specific aspect of this clinical scenario?`,

      `Great question for PLAB preparation! Here's a comprehensive explanation:

**UK Medical Context:**
This reflects real NHS practice and follows established protocols you'll encounter as an IMG in the UK.

**Clinical Reasoning:**
- Primary assessment follows ABCDE approach
- Differential diagnosis considers common UK presentations
- Management aligns with local formulary and guidelines

**PLAB Strategy:**
This question type tests your ability to apply UK medical standards. Focus on:
- Patient safety first
- Cost-effective investigations
- Appropriate referral pathways

**Further Reading:**
Consider reviewing the relevant NICE guidelines and BNF sections for comprehensive understanding.`,

      `Excellent clinical question! As your AI tutor, I can help break this down:

**Step-by-Step Analysis:**
1. **History**: What red flags should you look for?
2. **Examination**: Which clinical signs are most relevant?
3. **Investigations**: What's appropriate for NHS setting?
4. **Management**: Following UK protocols

**Educational Focus:**
This scenario teaches important principles of UK medical practice that are essential for PLAB success.

**Memory Aid:**
Try using the mnemonic we've developed for similar cases - it's particularly helpful for rapid recall during exams.

Would you like me to provide specific guidance on any aspect of this clinical presentation?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const quickQuestions = [
    "What are the red flags for headache in UK practice?",
    "NICE guidelines for diabetes management in primary care?",
    "When to refer for urgent cardiology in NHS?",
    "UK antibiotic guidelines for UTI treatment?",
    "PLAB 2 OSCE station on chest pain assessment?"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Navigation */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/more" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Ask BlueScrubsPrep AI</h2>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered
          </Badge>
        </div>

        {/* AI Introduction */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Your Personal Medical AI Tutor</h3>
                <p className="text-blue-800 mb-4">
                  Ask me anything about UK medical practice, PLAB preparation, or clinical scenarios. 
                  I'm trained on UK guidelines (NICE, CKS, GMC) and PLAB-specific content.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-blue-300 text-blue-700">UK Guidelines</Badge>
                  <Badge variant="outline" className="border-blue-300 text-blue-700">PLAB Expert</Badge>
                  <Badge variant="outline" className="border-blue-300 text-blue-700">Clinical Scenarios</Badge>
                  <Badge variant="outline" className="border-blue-300 text-blue-700">Instant Answers</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Questions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-green-600" />
              Quick Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {quickQuestions.map((q, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start text-left h-auto p-3 text-sm"
                  onClick={() => setQuestion(q)}
                >
                  {q}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Question Input */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex gap-3">
              <Input
                placeholder="Ask me about UK medical guidelines, PLAB questions, or clinical scenarios..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
                className="flex-1"
              />
              <Button 
                onClick={handleAskQuestion}
                disabled={!question.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-blue-800">Analyzing your question with UK medical guidelines...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Responses */}
        <div className="space-y-6">
          {responses.map((response, index) => (
            <div key={index} className="space-y-4">
              {/* User Question */}
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">You</span>
                    </div>
                    <div>
                      <p className="text-gray-900">{response.question}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {response.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Response */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-blue-900">BlueScrubsPrep AI</span>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          UK Guidelines
                        </Badge>
                      </div>
                      <div className="text-gray-900 whitespace-pre-line">{response.answer}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">UK Guidelines</h3>
              <p className="text-sm text-gray-600">
                Trained on NICE, CKS, GMC, and BNF guidelines for accurate UK medical advice
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Stethoscope className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">PLAB Focused</h3>
              <p className="text-sm text-gray-600">
                Specialized knowledge of PLAB 1 and PLAB 2 examination requirements
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Instant Help</h3>
              <p className="text-sm text-gray-600">
                Get immediate answers to complex medical questions with detailed explanations
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}