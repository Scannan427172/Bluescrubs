import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Send, MessageCircle, Brain, Stethoscope, BookOpen, Search, Clock, Star, ArrowRight, Sparkles, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { apiRequest } from '@/lib/queryClient';

interface MedicalResponse {
  answer: string;
  relatedTopics: string[];
  guidelines: string[];
  confidenceLevel: number;
  examRelevance: {
    plab1: boolean;
    plab2: boolean;
    osce: boolean;
  };
  studyRecommendations: string[];
}

export default function AskNHSPrep() {
  const [question, setQuestion] = useState('');
  const [responses, setResponses] = useState<Array<{ question: string; response: MedicalResponse; timestamp: Date }>>([]);

  const askQuestionMutation = useMutation({
    mutationFn: async (question: string): Promise<MedicalResponse> => {
      const response = await fetch('/api/ask-nhs-prep', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question })
      });
      
      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }
      
      return await response.json();
    },
    onSuccess: (response) => {
      setResponses(prev => [
        { question, response, timestamp: new Date() },
        ...prev
      ]);
      setQuestion('');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      askQuestionMutation.mutate(question.trim());
    }
  };

  const sampleQuestions = [
    {
      category: "PLAB 1",
      questions: [
        "What are the key differences between Type 1 and Type 2 diabetes for PLAB 1?",
        "Explain the management of acute myocardial infarction according to NICE guidelines",
        "What are the red flag symptoms for headache in primary care?"
      ]
    },
    {
      category: "PLAB 2 OSCE",
      questions: [
        "How do I approach a patient with chest pain in OSCE station?",
        "What are the key communication skills for breaking bad news?",
        "How to perform a cardiovascular examination systematically?"
      ]
    },
    {
      category: "Clinical Knowledge",
      questions: [
        "What is the antibiotic choice for community-acquired pneumonia?",
        "How to interpret ABG results step by step?",
        "What are the contraindications for thrombolysis in stroke?"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white" style={{ color: '#1a1a1a' }}>
      <div className="container mx-auto px-4 py-8" style={{ color: '#1a1a1a' }}>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#000000' }}>
            Ask NHS Prep AI
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: '#555555' }}>
            Get instant, evidence-based answers to any medical question. Powered by UK medical guidelines 
            including NICE, CKS, GMC, and NHS protocols. Perfect for PLAB 1, PLAB 2, and clinical practice.
          </p>
        </div>

        {/* Question Input */}
        <Card className="mb-8 shadow-lg border-2 border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2" style={{ color: '#000000' }}>
              <MessageCircle className="w-5 h-5 text-blue-600" />
              Ask Your Medical Question
            </CardTitle>
            <CardDescription style={{ color: '#555555' }}>
              Ask anything about PLAB preparation, clinical conditions, treatments, guidelines, or exam techniques
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Example: What is the first-line treatment for hypertension in a 45-year-old patient with no comorbidities according to NICE guidelines?"
                className="min-h-[100px] text-base"
                maxLength={1000}
              />
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: '#666666' }}>
                  {question.length}/1000 characters
                </span>
                <Button 
                  type="submit" 
                  disabled={!question.trim() || askQuestionMutation.isPending}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  {askQuestionMutation.isPending ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Ask NHS Prep AI
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Sample Questions */}
        {responses.length === 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#000000' }}>
              Popular Questions by Category
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {sampleQuestions.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2" style={{ color: '#000000' }}>
                      {category.category === 'PLAB 1' && <BookOpen className="w-5 h-5 text-blue-600" />}
                      {category.category === 'PLAB 2 OSCE' && <Stethoscope className="w-5 h-5 text-purple-600" />}
                      {category.category === 'Clinical Knowledge' && <Heart className="w-5 h-5 text-green-600" />}
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {category.questions.map((q, qIndex) => (
                      <button
                        key={qIndex}
                        onClick={() => setQuestion(q)}
                        className="w-full p-3 text-left bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors text-sm border border-gray-200 hover:border-blue-200"
                        style={{ color: '#000000' }}
                      >
                        <Search className="w-4 h-4 text-blue-600 mb-2" />
                        <span style={{ color: '#333333' }}>{q}</span>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Responses */}
        {responses.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: '#000000' }}>
              Your Medical Questions & Answers
            </h2>
            
            {responses.map((item, index) => (
              <Card key={index} className="shadow-lg border-l-4 border-l-blue-600">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2" style={{ color: '#000000' }}>
                        <MessageCircle className="w-5 h-5 text-blue-600 inline mr-2" />
                        Your Question:
                      </CardTitle>
                      <p className="bg-blue-50 p-3 rounded-lg" style={{ color: '#333333' }}>
                        {item.question}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {item.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* AI Response */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#000000' }}>
                      <Brain className="w-5 h-5 text-purple-600" />
                      NHS Prep AI Answer:
                    </h4>
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                      <p className="leading-relaxed whitespace-pre-wrap" style={{ color: '#1a1a1a' }}>
                        {item.response.answer}
                      </p>
                    </div>
                  </div>

                  {/* Exam Relevance */}
                  <div>
                    <h4 className="font-semibold mb-3" style={{ color: '#000000' }}>
                      Exam Relevance:
                    </h4>
                    <div className="flex gap-2">
                      {item.response.examRelevance.plab1 && (
                        <Badge className="bg-blue-100 text-blue-800">PLAB 1</Badge>
                      )}
                      {item.response.examRelevance.plab2 && (
                        <Badge className="bg-purple-100 text-purple-800">PLAB 2</Badge>
                      )}
                      {item.response.examRelevance.osce && (
                        <Badge className="bg-green-100 text-green-800">OSCE</Badge>
                      )}
                    </div>
                  </div>

                  {/* Guidelines */}
                  {item.response.guidelines.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3" style={{ color: '#000000' }}>
                        UK Medical Guidelines:
                      </h4>
                      <div className="space-y-1">
                        {item.response.guidelines.map((guideline, gIndex) => (
                          <div key={gIndex} className="flex items-center gap-2 text-sm" style={{ color: '#333333' }}>
                            <ArrowRight className="w-4 h-4 text-blue-600" />
                            {guideline}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Related Topics */}
                  {item.response.relatedTopics.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3" style={{ color: '#000000' }}>
                        Related Topics to Study:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {item.response.relatedTopics.map((topic, tIndex) => (
                          <Badge key={tIndex} variant="outline" className="cursor-pointer hover:bg-blue-50">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Study Recommendations */}
                  {item.response.studyRecommendations.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#000000' }}>
                        <Zap className="w-5 h-5 text-yellow-600" />
                        Personalized Study Recommendations:
                      </h4>
                      <div className="space-y-2">
                        {item.response.studyRecommendations.map((rec, rIndex) => (
                          <div key={rIndex} className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <Star className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm" style={{ color: '#333333' }}>{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Confidence Level */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <span className="text-sm" style={{ color: '#555555' }}>Confidence Level:</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(item.response.confidenceLevel / 20)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium" style={{ color: '#333333' }}>
                        {item.response.confidenceLevel}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: '#000000' }}>AI-Powered Answers</h3>
              <p className="text-sm" style={{ color: '#555555' }}>
                Advanced AI trained on UK medical guidelines and PLAB exam content
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: '#000000' }}>Evidence-Based</h3>
              <p className="text-sm" style={{ color: '#555555' }}>
                All answers backed by NICE, CKS, GMC, and NHS clinical guidelines
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: '#000000' }}>PLAB Focused</h3>
              <p className="text-sm" style={{ color: '#555555' }}>
                Specifically designed for PLAB 1, PLAB 2, and OSCE preparation
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}