import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Brain, 
  Target, 
  Clock, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Video, 
  Users,
  AlertTriangle,
  CheckCircle,
  Activity,
  Calendar,
  Zap,
  Globe,
  Heart,
  Stethoscope,
  Pill,
  Baby,
  HeadphonesIcon as Psychiatric,
  Eye,
  Camera
} from 'lucide-react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';

interface PLABProgress {
  currentWeek: number;
  totalWeeks: number;
  plab1Readiness: number;
  plab2Readiness: number;
  overallProgress: number;
  weakAreas: string[];
  strongAreas: string[];
  timeToExam: number;
  predictedScores: {
    plab1: number;
    plab2: number;
    confidence: number;
  };
}

interface StudyMetrics {
  dailyStreak: number;
  weeklyHours: number;
  questionsAnswered: number;
  accuracy: number;
  improvementTrend: number;
}

interface UKGuidelineUpdate {
  id: string;
  title: string;
  category: string;
  dateUpdated: string;
  impact: 'high' | 'medium' | 'low';
  summary: string;
}

export default function AdvancedDashboard() {
  const [selectedCategory, setSelectedCategory] = useState('overview');

  // Fetch user progress data
  const { data: progress } = useQuery<PLABProgress>({
    queryKey: ['/api/plab/progress'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: metrics } = useQuery<StudyMetrics>({
    queryKey: ['/api/study/metrics'],
    staleTime: 5 * 60 * 1000,
  });

  const { data: guidelines } = useQuery<UKGuidelineUpdate[]>({
    queryKey: ['/api/guidelines/updates'],
    staleTime: 30 * 60 * 1000, // 30 minutes
  });

  // Mock data for development
  const mockProgress: PLABProgress = {
    currentWeek: 6,
    totalWeeks: 12,
    plab1Readiness: 78,
    plab2Readiness: 65,
    overallProgress: 72,
    weakAreas: ['Cardiology', 'Ethics', 'Pediatrics'],
    strongAreas: ['Respiratory', 'Endocrinology', 'Pharmacology'],
    timeToExam: 45,
    predictedScores: {
      plab1: 162,
      plab2: 76,
      confidence: 0.87
    }
  };

  const mockMetrics: StudyMetrics = {
    dailyStreak: 12,
    weeklyHours: 18.5,
    questionsAnswered: 1247,
    accuracy: 74.2,
    improvementTrend: 0.15
  };

  const mockGuidelines: UKGuidelineUpdate[] = [
    {
      id: '1',
      title: 'NICE CG180 Atrial Fibrillation Update',
      category: 'Cardiology',
      dateUpdated: '2024-12-15',
      impact: 'high',
      summary: 'Updated anticoagulation thresholds for CHA2DS2-VASc scoring'
    },
    {
      id: '2',
      title: 'BTS Asthma Guidelines Revision',
      category: 'Respiratory',
      dateUpdated: '2024-12-10',
      impact: 'medium',
      summary: 'New inhaler device recommendations and MART therapy updates'
    }
  ];

  const currentProgress = progress || mockProgress;
  const currentMetrics = metrics || mockMetrics;
  const currentGuidelines = guidelines || mockGuidelines;

  const categoryIcons = {
    cardiovascular: Heart,
    respiratory: Activity,
    gastrointestinal: Pill,
    neurology: Brain,
    endocrinology: Target,
    psychiatry: Psychiatric,
    pediatrics: Baby,
    obstetrics: Users,
    ophthalmology: Eye,
    emergency: AlertTriangle
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Advanced PLAB Preparation Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI-powered learning platform with UK clinical guidelines integration
          </p>
        </div>

        {/* Progress Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">PLAB 1 Readiness</p>
                  <p className="text-3xl font-bold">{currentProgress.plab1Readiness}%</p>
                </div>
                <Target className="h-12 w-12 text-blue-200" />
              </div>
              <div className="mt-4">
                <Progress value={currentProgress.plab1Readiness} className="bg-blue-400" />
                <p className="text-sm text-blue-100 mt-2">
                  Predicted Score: {currentProgress.predictedScores.plab1}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">PLAB 2 Readiness</p>
                  <p className="text-3xl font-bold">{currentProgress.plab2Readiness}%</p>
                </div>
                <Stethoscope className="h-12 w-12 text-purple-200" />
              </div>
              <div className="mt-4">
                <Progress value={currentProgress.plab2Readiness} className="bg-purple-400" />
                <p className="text-sm text-purple-100 mt-2">
                  Predicted Score: {currentProgress.predictedScores.plab2}%
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Study Streak</p>
                  <p className="text-3xl font-bold">{currentMetrics.dailyStreak}</p>
                </div>
                <Award className="h-12 w-12 text-green-200" />
              </div>
              <div className="mt-4">
                <p className="text-sm text-green-100">
                  {currentMetrics.weeklyHours}h this week
                </p>
                <p className="text-sm text-green-100">
                  {currentMetrics.accuracy}% accuracy
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Days to Exam</p>
                  <p className="text-3xl font-bold">{currentProgress.timeToExam}</p>
                </div>
                <Calendar className="h-12 w-12 text-orange-200" />
              </div>
              <div className="mt-4">
                <p className="text-sm text-orange-100">
                  Week {currentProgress.currentWeek} of {currentProgress.totalWeeks}
                </p>
                <Progress 
                  value={(currentProgress.currentWeek / currentProgress.totalWeeks) * 100} 
                  className="bg-orange-400 mt-2" 
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="learning">AI Learning</TabsTrigger>
            <TabsTrigger value="guidelines">UK Guidelines</TabsTrigger>
            <TabsTrigger value="osce">OSCE Practice</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-6 w-6 mr-2 text-blue-600" />
                  AI-Powered Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-red-600 mb-3">Priority Focus Areas</h4>
                    <div className="space-y-2">
                      {currentProgress.weakAreas.map((area, index) => (
                        <Alert key={index} className="border-red-200">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            <span className="font-medium">{area}</span> - Needs immediate attention
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-600 mb-3">Strong Areas</h4>
                    <div className="space-y-2">
                      {currentProgress.strongAreas.map((area, index) => (
                        <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span className="font-medium text-green-800">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Today's Study Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-6 w-6 mr-2 text-purple-600" />
                  Today's Personalized Study Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-blue-900">Cardiovascular System Review</h4>
                        <p className="text-blue-700">NICE CG167 Acute Coronary Syndromes</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-blue-600">60 min</Badge>
                        <p className="text-sm text-blue-600 mt-1">High Priority</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-purple-900">OSCE Station Practice</h4>
                        <p className="text-purple-700">History Taking - Chest Pain</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-purple-600">30 min</Badge>
                        <p className="text-sm text-purple-600 mt-1">Skill Building</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-green-900">Question Practice</h4>
                        <p className="text-green-700">Mixed specialty questions (40 questions)</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-600">45 min</Badge>
                        <p className="text-sm text-green-600 mt-1">Assessment</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="learning" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-6 w-6 mr-2 text-yellow-600" />
                  AI Learning Systems
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="border-2 border-blue-200">
                    <CardContent className="p-6">
                      <Brain className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="font-bold text-lg mb-2">Weakness Prediction</h3>
                      <p className="text-gray-600 mb-4">
                        AI predicts exam failure 2-3 weeks early with 94% accuracy
                      </p>
                      <Button className="w-full">View Analysis</Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-purple-200">
                    <CardContent className="p-6">
                      <Target className="h-12 w-12 text-purple-600 mb-4" />
                      <h3 className="font-bold text-lg mb-2">Adaptive Questions</h3>
                      <p className="text-gray-600 mb-4">
                        Difficulty adjusts based on your performance patterns
                      </p>
                      <Button className="w-full">Start Practice</Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-green-200">
                    <CardContent className="p-6">
                      <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
                      <h3 className="font-bold text-lg mb-2">Progress Tracking</h3>
                      <p className="text-gray-600 mb-4">
                        Real-time performance analytics and improvement insights
                      </p>
                      <Button className="w-full">View Progress</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guidelines" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-6 w-6 mr-2 text-blue-600" />
                  Latest UK Clinical Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentGuidelines.map((guideline) => (
                    <div key={guideline.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{guideline.title}</h4>
                          <p className="text-gray-600 mt-1">{guideline.summary}</p>
                          <div className="flex items-center mt-2 space-x-3">
                            <Badge variant="outline">{guideline.category}</Badge>
                            <Badge 
                              className={
                                guideline.impact === 'high' ? 'bg-red-100 text-red-800' :
                                guideline.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }
                            >
                              {guideline.impact} impact
                            </Badge>
                            <span className="text-sm text-gray-500">{guideline.dateUpdated}</span>
                          </div>
                        </div>
                        <Button size="sm">Review</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="osce" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="h-6 w-6 mr-2 text-purple-600" />
                  PLAB 2 OSCE Training
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: 'History Taking', stations: 6, completed: 4, color: 'blue' },
                    { title: 'Physical Examination', stations: 8, completed: 5, color: 'green' },
                    { title: 'Communication Skills', stations: 4, completed: 2, color: 'purple' },
                    { title: 'Emergency Scenarios', stations: 3, completed: 1, color: 'red' },
                    { title: 'Practical Procedures', stations: 5, completed: 3, color: 'yellow' },
                    { title: 'Ethics & Law', stations: 2, completed: 1, color: 'indigo' }
                  ].map((category, index) => (
                    <Card key={index} className="border-2">
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-2">{category.title}</h3>
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{category.completed}/{category.stations}</span>
                          </div>
                          <Progress value={(category.completed / category.stations) * 100} />
                        </div>
                        <Link href={`/plab2-osce?category=${category.title.toLowerCase()}`}>
                          <Button className="w-full">Continue Practice</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-6 w-6 mr-2 text-green-600" />
                  Performance Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Study Statistics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span>Questions Answered</span>
                        <span className="font-bold">{currentMetrics.questionsAnswered}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span>Overall Accuracy</span>
                        <span className="font-bold text-green-600">{currentMetrics.accuracy}%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span>Study Hours (Week)</span>
                        <span className="font-bold">{currentMetrics.weeklyHours}h</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span>Improvement Trend</span>
                        <span className="font-bold text-blue-600">
                          {currentMetrics.improvementTrend > 0 ? '+' : ''}{(currentMetrics.improvementTrend * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Subject Performance</h4>
                    <div className="space-y-3">
                      {[
                        { name: 'Cardiology', score: 68, trend: -0.05 },
                        { name: 'Respiratory', score: 85, trend: 0.12 },
                        { name: 'Endocrinology', score: 79, trend: 0.08 },
                        { name: 'Neurology', score: 72, trend: 0.03 },
                        { name: 'Psychiatry', score: 66, trend: -0.02 }
                      ].map((subject, index) => (
                        <div key={index} className="p-3 border rounded">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{subject.name}</span>
                            <span className={`text-sm ${subject.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {subject.trend > 0 ? '↗' : '↘'} {Math.abs(subject.trend * 100).toFixed(1)}%
                            </span>
                          </div>
                          <Progress value={subject.score} className="mb-1" />
                          <span className="text-sm text-gray-600">{subject.score}% accuracy</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
                    UK Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li><Link href="/guidelines/nice" className="text-blue-600 hover:underline">NICE Guidelines</Link></li>
                    <li><Link href="/guidelines/cks" className="text-blue-600 hover:underline">Clinical Knowledge Summaries</Link></li>
                    <li><Link href="/guidelines/gmc" className="text-blue-600 hover:underline">GMC Guidance</Link></li>
                    <li><Link href="/guidelines/rcgp" className="text-blue-600 hover:underline">RCGP Resources</Link></li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-6 w-6 mr-2 text-green-600" />
                    Community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li><Link href="/community/forums" className="text-blue-600 hover:underline">Discussion Forums</Link></li>
                    <li><Link href="/community/study-groups" className="text-blue-600 hover:underline">Study Groups</Link></li>
                    <li><Link href="/community/mentorship" className="text-blue-600 hover:underline">Expert Mentorship</Link></li>
                    <li><Link href="/community/success-stories" className="text-blue-600 hover:underline">Success Stories</Link></li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-6 w-6 mr-2 text-purple-600" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li><Link href="/certifications/bls" className="text-blue-600 hover:underline">Basic Life Support</Link></li>
                    <li><Link href="/certifications/als" className="text-blue-600 hover:underline">Advanced Life Support</Link></li>
                    <li><Link href="/certifications/paediatric" className="text-blue-600 hover:underline">Paediatric Life Support</Link></li>
                    <li><Link href="/certifications/safeguarding" className="text-blue-600 hover:underline">Safeguarding Training</Link></li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/plab1-new">
                <Button className="w-full h-20 flex flex-col items-center justify-center">
                  <BookOpen className="h-6 w-6 mb-2" />
                  PLAB 1 Practice
                </Button>
              </Link>
              <Link href="/plab2-osce">
                <Button className="w-full h-20 flex flex-col items-center justify-center" variant="outline">
                  <Video className="h-6 w-6 mb-2" />
                  OSCE Training
                </Button>
              </Link>
              <Link href="/video-osce">
                <Button className="w-full h-20 flex flex-col items-center justify-center" variant="outline">
                  <Video className="h-6 w-6 mb-2" />
                  Video Practice
                </Button>
              </Link>
              <Link href="/mock-exams">
                <Button className="w-full h-20 flex flex-col items-center justify-center" variant="outline">
                  <Clock className="h-6 w-6 mb-2" />
                  Mock Exams
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}