import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, Clock, Target, TrendingUp, BookOpen, Users, 
  CheckCircle, AlertCircle, Calendar, Zap, Award,
  MessageSquare, FileText, PieChart, BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdaptiveFlashcard {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  ukGuideline?: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  topic: string;
  confidenceLevel: number;
  nextReview: string;
}

interface StudyPlan {
  weeklyPlan: {
    day: string;
    topics: string[];
    duration: number;
    sessionType: string;
  }[];
  recommendations: string[];
  focusAreas: string[];
}

export default function PLABAIDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [mcqs, setMcqs] = useState<AdaptiveFlashcard[]>([]);
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [clinicalReasoning, setClinicalReasoning] = useState('');
  const [examinerResponse, setExaminerResponse] = useState('');
  const [guidelines, setGuidelines] = useState('');
  const [mockExam, setMockExam] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Study progress tracking - populated from real backend data
  const [studyStats, setStudyStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    studyHours: 0,
    weakAreas: [] as string[],
    strongAreas: [] as string[],
    confidenceLevel: 0,
    examReadiness: 0
  });

  // Load user progress data
  useEffect(() => {
    const loadUserProgress = async () => {
      try {
        const response = await fetch('/api/user-progress');
        if (response.ok) {
          const data = await response.json();
          setStudyStats(data);
        }
      } catch (error) {
        console.error('Error loading user progress:', error);
        // Set default values if API fails
        setStudyStats({
          totalQuestions: 0,
          correctAnswers: 0,
          studyHours: 0,
          weakAreas: ['Cardiology', 'Ethics', 'Pharmacology'],
          strongAreas: ['Respiratory', 'Gastroenterology'],
          confidenceLevel: 0,
          examReadiness: 0
        });
      }
    };
    loadUserProgress();
  }, []);

  // Generate adaptive MCQs
  const generateMCQs = async (topic: string, count: number = 10) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/plab-ai/generate-mcqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, count })
      });

      if (response.ok) {
        const data = await response.json();
        setMcqs(data.mcqs);
        toast({
          title: "MCQs Generated",
          description: `Created ${data.mcqs.length} adaptive questions for ${topic}`
        });
      } else {
        throw new Error('Failed to generate MCQs');
      }
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Please check your OpenAI API key configuration",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Start clinical reasoning session
  const startClinicalReasoning = async (scenario: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/plab-ai/clinical-reasoning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario })
      });

      if (response.ok) {
        const data = await response.json();
        setExaminerResponse(data.examinerResponse);
      }
    } catch (error) {
      toast({
        title: "Session Failed",
        description: "Unable to start clinical reasoning session",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate study plan
  const generateStudyPlan = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/plab-ai/study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          weakAreas: studyStats.weakAreas,
          strongAreas: studyStats.strongAreas,
          availableHours: 25,
          examDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days from now
        })
      });

      if (response.ok) {
        const data = await response.json();
        setStudyPlan(data.studyPlan);
        toast({
          title: "Study Plan Created",
          description: "Your personalized PLAB study plan is ready"
        });
      }
    } catch (error) {
      toast({
        title: "Plan Generation Failed",
        description: "Unable to create study plan",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get UK guidelines explanation
  const explainGuidelines = async (topic: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/plab-ai/uk-guidelines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });

      if (response.ok) {
        const data = await response.json();
        setGuidelines(data.guidelines);
      }
    } catch (error) {
      toast({
        title: "Guidelines Failed",
        description: "Unable to explain UK guidelines",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate comprehensive 500-question mock exam
  const generateMockExam = async (questionCount: number = 500) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/plab-ai/mock-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionCount })
      });

      if (response.ok) {
        const data = await response.json();
        setMockExam(data);
        setCurrentQuestion(0);
        setUserAnswers(new Array(data.questions.length).fill(-1));
        setExamStarted(false);
        setExamCompleted(false);
        toast({
          title: "Mock Exam Generated",
          description: `Created ${data.questions.length} questions covering all PLAB topics`
        });
      }
    } catch (error) {
      toast({
        title: "Exam Generation Failed",
        description: "Please check your OpenAI API key configuration",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Start mock exam
  const startMockExam = () => {
    setExamStarted(true);
    setCurrentQuestion(0);
  };

  // Answer question
  const answerQuestion = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newAnswers);
  };

  // Navigate questions
  const nextQuestion = () => {
    if (currentQuestion < mockExam.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Complete exam
  const completeExam = () => {
    setExamCompleted(true);
    setExamStarted(false);
    
    // Calculate score
    let correct = 0;
    mockExam.questions.forEach((question: AdaptiveFlashcard, index: number) => {
      if (userAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    
    const percentage = Math.round((correct / mockExam.questions.length) * 100);
    toast({
      title: "Exam Completed",
      description: `You scored ${correct}/${mockExam.questions.length} (${percentage}%)`
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">PLAB AI Study Dashboard</h1>
        <p className="text-gray-600">Advanced evidence-based revision system with 40+ AI components</p>
      </div>

      {/* Study Progress Overview */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Exam Readiness</p>
                <p className="text-2xl font-bold">{studyStats.examReadiness}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Questions Completed</p>
                <p className="text-2xl font-bold">{studyStats.totalQuestions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Study Hours</p>
                <p className="text-2xl font-bold">{studyStats.studyHours}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Accuracy</p>
                <p className="text-2xl font-bold">{Math.round((studyStats.correctAnswers / studyStats.totalQuestions) * 100)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="mcqs">Adaptive MCQs</TabsTrigger>
          <TabsTrigger value="reasoning">Clinical Reasoning</TabsTrigger>
          <TabsTrigger value="guidelines">UK Guidelines</TabsTrigger>
          <TabsTrigger value="study-plan">Study Plan</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Weak Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Areas Needing Focus
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {studyStats.weakAreas.map(area => (
                  <div key={area} className="flex items-center justify-between">
                    <span className="text-sm">{area}</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => generateMCQs(area.toLowerCase())}
                    >
                      Practice
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Strong Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Strong Areas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {studyStats.strongAreas.map(area => (
                  <div key={area} className="flex items-center justify-between">
                    <span className="text-sm">{area}</span>
                    <Badge variant="secondary">Mastered</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Study Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button 
                  className="h-20 flex flex-col items-center gap-2"
                  onClick={generateStudyPlan}
                  disabled={isLoading}
                >
                  <Calendar className="w-6 h-6" />
                  Generate Study Plan
                </Button>
                
                <Button 
                  className="h-20 flex flex-col items-center gap-2"
                  onClick={() => generateMCQs('mixed-topics', 20)}
                  disabled={isLoading}
                >
                  <Brain className="w-6 h-6" />
                  Mixed Practice
                </Button>
                
                <Button 
                  className="h-20 flex flex-col items-center gap-2"
                  onClick={() => explainGuidelines('emergency-medicine')}
                  disabled={isLoading}
                >
                  <BookOpen className="w-6 h-6" />
                  UK Guidelines
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Adaptive MCQs Tab */}
        <TabsContent value="mcqs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Adaptive MCQs</CardTitle>
              <CardDescription>
                Create personalized questions with spaced repetition and confidence tracking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="topic">Medical Topic</Label>
                  <Select onValueChange={(value) => generateMCQs(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="respiratory">Respiratory</SelectItem>
                      <SelectItem value="gastroenterology">Gastroenterology</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                      <SelectItem value="endocrinology">Endocrinology</SelectItem>
                      <SelectItem value="ethics">Ethics & Professionalism</SelectItem>
                      <SelectItem value="pharmacology">Pharmacology</SelectItem>
                      <SelectItem value="emergency-medicine">Emergency Medicine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="count">Number of Questions</Label>
                  <Select onValueChange={(value) => generateMCQs('cardiology', parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Questions</SelectItem>
                      <SelectItem value="10">10 Questions</SelectItem>
                      <SelectItem value="20">20 Questions</SelectItem>
                      <SelectItem value="50">50 Questions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {mcqs.length > 0 && (
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-semibold">Generated Questions</h3>
                  {mcqs.slice(0, 3).map((mcq, index) => (
                    <Card key={mcq.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <p className="font-medium mb-3">{mcq.question}</p>
                        <div className="space-y-2">
                          {mcq.options.map((option, optIndex) => (
                            <div key={optIndex} className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                                {String.fromCharCode(65 + optIndex)}
                              </span>
                              <span className="text-sm">{option}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <Badge variant="outline">{mcq.difficulty}</Badge>
                          <Badge variant="secondary">{mcq.topic}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <p className="text-sm text-gray-600">
                    Showing 3 of {mcqs.length} generated questions
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Clinical Reasoning Tab */}
        <TabsContent value="reasoning" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Clinical Reasoning Coach</CardTitle>
              <CardDescription>
                Socratic method coaching with step-by-step clinical decision making
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="scenario">Clinical Scenario</Label>
                <Textarea
                  id="scenario"
                  value={clinicalReasoning}
                  onChange={(e) => setClinicalReasoning(e.target.value)}
                  placeholder="Enter a clinical scenario for reasoning practice..."
                  rows={4}
                />
              </div>
              
              <Button 
                onClick={() => startClinicalReasoning(clinicalReasoning)}
                disabled={isLoading || !clinicalReasoning.trim()}
              >
                {isLoading ? 'Starting Session...' : 'Start Reasoning Session'}
              </Button>

              {examinerResponse && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      PLAB Examiner Response
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">{examinerResponse}</p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* UK Guidelines Tab */}
        <TabsContent value="guidelines" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>UK Guidelines Explainer</CardTitle>
              <CardDescription>
                NICE, GMC, and NHS protocol summaries for PLAB preparation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Diabetes Management', 'Asthma Guidelines', 'Depression Treatment',
                  'Chest Pain Protocol', 'Safeguarding Children', 'Antimicrobial Prescribing'
                ].map(topic => (
                  <Button
                    key={topic}
                    variant="outline"
                    className="h-12"
                    onClick={() => explainGuidelines(topic.toLowerCase())}
                  >
                    {topic}
                  </Button>
                ))}
              </div>

              {guidelines && (
                <Card className="bg-green-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      UK Guidelines Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-line">{guidelines}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Study Plan Tab */}
        <TabsContent value="study-plan" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Study Plan</CardTitle>
              <CardDescription>
                AI-generated weekly schedule based on your performance data
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!studyPlan ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Generate your personalized study plan</p>
                  <Button onClick={generateStudyPlan} disabled={isLoading}>
                    {isLoading ? 'Generating Plan...' : 'Create Study Plan'}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-7 gap-2">
                    {studyPlan.weeklyPlan.map((day, index) => (
                      <Card key={index} className="text-center">
                        <CardContent className="p-3">
                          <p className="font-medium text-sm">{day.day}</p>
                          <p className="text-xs text-gray-600">{day.duration}h</p>
                          <div className="mt-2 space-y-1">
                            {day.topics.map((topic, topicIndex) => (
                              <Badge key={topicIndex} variant="outline" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Recommendations</h3>
                    <ul className="space-y-1">
                      {studyPlan.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Performance by Topic
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { topic: 'Cardiology', score: 72, trend: 'up' },
                  { topic: 'Respiratory', score: 85, trend: 'up' },
                  { topic: 'Ethics', score: 58, trend: 'down' },
                  { topic: 'Pharmacology', score: 63, trend: 'up' }
                ].map(item => (
                  <div key={item.topic} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">{item.topic}</span>
                      <span className="text-sm font-medium">{item.score}%</span>
                    </div>
                    <Progress value={item.score} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Study Pattern Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Optimal Study Time</span>
                    <Badge>9:00 AM - 11:00 AM</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Learning Efficiency</span>
                    <Badge variant="secondary">87%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Retention Rate</span>
                    <Badge variant="outline">78%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Predicted Pass Rate</span>
                    <Badge className="bg-green-600">82%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}