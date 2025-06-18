import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Target, TrendingUp, Clock, BookOpen, CheckCircle, AlertCircle, Users, Zap } from "lucide-react";

export default function AdaptiveLearning() {
  const [selectedWeakness, setSelectedWeakness] = useState("Cardiology");

  const learningData = {
    overallProgress: 78,
    strongAreas: ["Respiratory", "Gastroenterology", "Dermatology"],
    weakAreas: ["Cardiology", "Neurology", "Endocrinology"],
    studyTime: 145,
    questionsAnswered: 2847,
    accuracy: 82
  };

  const adaptiveFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Machine learning algorithms analyze your performance patterns",
      benefit: "Identifies knowledge gaps and learning preferences automatically"
    },
    {
      icon: Target,
      title: "Personalized Study Plans",
      description: "Custom learning paths based on your strengths and weaknesses",
      benefit: "Optimizes study time for maximum improvement"
    },
    {
      icon: TrendingUp,
      title: "Dynamic Difficulty",
      description: "Question difficulty adjusts based on your current skill level",
      benefit: "Maintains optimal challenge level for continuous growth"
    },
    {
      icon: Clock,
      title: "Smart Scheduling",
      description: "AI recommends optimal study times and session lengths",
      benefit: "Maximizes retention and prevents burnout"
    }
  ];

  const weeklyPlan = [
    { day: "Monday", focus: "Cardiology", time: "45 min", questions: 30, type: "Weakness Focus" },
    { day: "Tuesday", focus: "Respiratory", time: "30 min", questions: 20, type: "Maintenance" },
    { day: "Wednesday", focus: "Neurology", time: "60 min", questions: 40, type: "Weakness Focus" },
    { day: "Thursday", focus: "Mixed Review", time: "45 min", questions: 35, type: "Integration" },
    { day: "Friday", focus: "Endocrinology", time: "50 min", questions: 35, type: "Weakness Focus" },
    { day: "Saturday", focus: "Mock Exam", time: "90 min", questions: 60, type: "Assessment" },
    { day: "Sunday", focus: "Review Errors", time: "40 min", questions: 25, type: "Remediation" }
  ];

  const performanceMetrics = [
    { subject: "Cardiology", accuracy: 68, trend: "improving", questions: 245 },
    { subject: "Respiratory", accuracy: 89, trend: "stable", questions: 312 },
    { subject: "Neurology", accuracy: 71, trend: "improving", questions: 187 },
    { subject: "Gastroenterology", accuracy: 85, trend: "stable", questions: 298 },
    { subject: "Endocrinology", accuracy: 74, trend: "declining", questions: 156 },
    { subject: "Dermatology", accuracy: 91, trend: "improving", questions: 203 }
  ];

  const aiRecommendations = [
    {
      type: "urgent",
      title: "Focus on ECG Interpretation",
      description: "Your cardiology accuracy drops significantly on ECG questions (58%). Spend 20 minutes daily on ECG practice.",
      action: "Start ECG Module"
    },
    {
      type: "suggestion",
      title: "Increase Neurology Exposure",
      description: "You've answered fewer neurology questions. Increase daily allocation to build familiarity.",
      action: "Add to Plan"
    },
    {
      type: "maintenance",
      title: "Maintain Respiratory Strength",
      description: "Excellent performance in respiratory. Continue light review to maintain accuracy.",
      action: "Keep Current"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">AI Adaptive Learning</h1>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Personalized PLAB preparation powered by artificial intelligence. Our system learns from your performance 
            and creates customized study plans to maximize your success.
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{learningData.overallProgress}%</div>
              <div className="text-gray-600">Overall Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{learningData.studyTime}h</div>
              <div className="text-gray-600">Study Time</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{learningData.questionsAnswered}</div>
              <div className="text-gray-600">Questions Answered</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{learningData.accuracy}%</div>
              <div className="text-gray-600">Overall Accuracy</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="plan">Study Plan</TabsTrigger>
            <TabsTrigger value="features">AI Features</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* AI Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-600" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiRecommendations.map((rec, index) => (
                    <div key={index} className={`p-4 rounded-lg ${
                      rec.type === 'urgent' ? 'bg-red-50 border border-red-200' :
                      rec.type === 'suggestion' ? 'bg-yellow-50 border border-yellow-200' :
                      'bg-green-50 border border-green-200'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{rec.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                        </div>
                        <AlertCircle className={`w-4 h-4 mt-1 ${
                          rec.type === 'urgent' ? 'text-red-600' :
                          rec.type === 'suggestion' ? 'text-yellow-600' :
                          'text-green-600'
                        }`} />
                      </div>
                      <Button size="sm" variant="outline" className="mt-2">
                        {rec.action}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Strength & Weakness Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Strength & Weakness Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-green-700 mb-2">Strong Areas</h4>
                      <div className="flex flex-wrap gap-2">
                        {learningData.strongAreas.map((area) => (
                          <Badge key={area} className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-700 mb-2">Areas for Improvement</h4>
                      <div className="flex flex-wrap gap-2">
                        {learningData.weakAreas.map((area) => (
                          <Badge key={area} variant="destructive" className="bg-red-100 text-red-800">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceMetrics.map((metric) => (
                    <div key={metric.subject} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{metric.subject}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant={
                            metric.trend === 'improving' ? 'default' :
                            metric.trend === 'declining' ? 'destructive' : 'secondary'
                          }>
                            {metric.trend}
                          </Badge>
                          <span className="text-sm text-gray-600">{metric.questions} questions</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={metric.accuracy} className="flex-1" />
                        <span className="font-medium">{metric.accuracy}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Study Plan Tab */}
          <TabsContent value="plan" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Weekly Study Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weeklyPlan.map((day, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                          <div>
                            <h4 className="font-medium">{day.day}</h4>
                            <p className="text-sm text-gray-600">{day.focus}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{day.time}</div>
                          <div className="text-sm text-gray-600">{day.questions} questions</div>
                        </div>
                        <Badge variant="outline">{day.type}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {adaptiveFeatures.map((feature, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <feature.icon className="w-8 h-8 text-purple-600 mb-4" />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-purple-700 text-sm font-medium">Benefit:</p>
                      <p className="text-purple-600 text-sm">{feature.benefit}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>How AI Adaptive Learning Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">1. Performance Analysis</h4>
                    <p className="text-blue-700 text-sm">AI continuously analyzes your question responses, timing, and error patterns to understand your learning profile.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">2. Personalized Adaptation</h4>
                    <p className="text-green-700 text-sm">The system adjusts question difficulty, topic focus, and study recommendations based on your progress.</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">3. Continuous Optimization</h4>
                    <p className="text-purple-700 text-sm">Your study plan evolves daily as the AI learns more about your learning patterns and preferences.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}