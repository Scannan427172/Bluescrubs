import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, BookOpen, Target, Lightbulb, X } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface AITutorProps {
  currentQuestion?: any;
  userPerformance?: any;
  onClose: () => void;
  isVisible: boolean;
}

interface TutorResponse {
  explanation: string;
  studyTips: string[];
  relatedConcepts: string[];
  mnemonics: string[];
  recommendedTopics: string[];
}

export function AITutor({ currentQuestion, userPerformance, onClose, isVisible }: AITutorProps) {
  const [userQuery, setUserQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'help' | 'study' | 'concepts'>('help');
  const queryClient = useQueryClient();

  const tutorMutation = useMutation({
    mutationFn: async (data: { query: string; context?: any }) => {
      const response = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Failed to get tutor response');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tutor-history'] });
    }
  });

  const handleAskTutor = () => {
    if (!userQuery.trim()) return;
    
    tutorMutation.mutate({
      query: userQuery,
      context: {
        question: currentQuestion,
        performance: userPerformance
      }
    });
  };

  const getQuestionHelp = () => {
    if (!currentQuestion) return;
    
    tutorMutation.mutate({
      query: `Please explain this medical question and provide study guidance: ${currentQuestion.scenario}`,
      context: { question: currentQuestion }
    });
  };

  const getStudyPlan = () => {
    tutorMutation.mutate({
      query: 'Create a personalized study plan based on my performance',
      context: { performance: userPerformance }
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            <CardTitle>AI Medical Tutor</CardTitle>
            <Badge variant="secondary">PLAB 1 Assistant</Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex gap-2 border-b">
            <Button
              variant={activeTab === 'help' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('help')}
              className="flex items-center gap-2"
            >
              <Lightbulb className="h-4 w-4" />
              Question Help
            </Button>
            <Button
              variant={activeTab === 'study' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('study')}
              className="flex items-center gap-2"
            >
              <Target className="h-4 w-4" />
              Study Plan
            </Button>
            <Button
              variant={activeTab === 'concepts' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('concepts')}
              className="flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Concepts
            </Button>
          </div>

          {/* Question Help Tab */}
          {activeTab === 'help' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={getQuestionHelp}
                  disabled={!currentQuestion || tutorMutation.isPending}
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <Lightbulb className="h-6 w-6 mb-2" />
                  Explain Current Question
                </Button>
                <Button
                  variant="outline"
                  onClick={() => tutorMutation.mutate({
                    query: 'What are the key learning points for this topic?',
                    context: { question: currentQuestion }
                  })}
                  disabled={!currentQuestion || tutorMutation.isPending}
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <BookOpen className="h-6 w-6 mb-2" />
                  Key Learning Points
                </Button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Ask the AI Tutor:</label>
                <Textarea
                  placeholder="Ask me anything about medical concepts, exam strategies, or study tips..."
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  className="min-h-20"
                />
                <Button
                  onClick={handleAskTutor}
                  disabled={!userQuery.trim() || tutorMutation.isPending}
                  className="w-full"
                >
                  {tutorMutation.isPending ? 'Thinking...' : 'Ask Tutor'}
                </Button>
              </div>
            </div>
          )}

          {/* Study Plan Tab */}
          {activeTab === 'study' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={getStudyPlan}
                  disabled={tutorMutation.isPending}
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <Target className="h-6 w-6 mb-2" />
                  Personalized Study Plan
                </Button>
                <Button
                  variant="outline"
                  onClick={() => tutorMutation.mutate({
                    query: 'What are my weak areas and how can I improve?',
                    context: { performance: userPerformance }
                  })}
                  disabled={tutorMutation.isPending}
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <BookOpen className="h-6 w-6 mb-2" />
                  Weak Areas Analysis
                </Button>
              </div>
            </div>
          )}

          {/* Concepts Tab */}
          {activeTab === 'concepts' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={() => tutorMutation.mutate({
                    query: 'Explain the pathophysiology and clinical approach for this condition',
                    context: { question: currentQuestion }
                  })}
                  disabled={!currentQuestion || tutorMutation.isPending}
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <BookOpen className="h-6 w-6 mb-2" />
                  Clinical Pathophysiology
                </Button>
                <Button
                  variant="outline"
                  onClick={() => tutorMutation.mutate({
                    query: 'Provide memory aids and mnemonics for this topic',
                    context: { question: currentQuestion }
                  })}
                  disabled={!currentQuestion || tutorMutation.isPending}
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <Lightbulb className="h-6 w-6 mb-2" />
                  Memory Aids
                </Button>
              </div>
            </div>
          )}

          {/* Tutor Response */}
          {tutorMutation.data && (
            <Card className="bg-blue-50 dark:bg-blue-950/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  AI Tutor Response
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap">{tutorMutation.data.response}</p>
                </div>
                
                {tutorMutation.data.studyTips?.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Study Tips:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {tutorMutation.data.studyTips.map((tip: string, index: number) => (
                        <li key={index} className="text-sm">{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {tutorMutation.data.mnemonics?.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Memory Aids:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tutorMutation.data.mnemonics.map((mnemonic: string, index: number) => (
                        <Badge key={index} variant="secondary">{mnemonic}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {tutorMutation.data.relatedConcepts?.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Related Concepts:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tutorMutation.data.relatedConcepts.map((concept: string, index: number) => (
                        <Badge key={index} variant="outline">{concept}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {tutorMutation.error && (
            <Card className="bg-red-50 dark:bg-red-950/20 border-red-200">
              <CardContent className="pt-6">
                <p className="text-red-600 dark:text-red-400">
                  Sorry, I'm having trouble responding right now. Please try again.
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}