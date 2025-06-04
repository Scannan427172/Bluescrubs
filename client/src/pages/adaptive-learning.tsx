import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Brain, TrendingUp, Target, Clock, Award, Lightbulb,
  BarChart3, BookOpen, Zap, CheckCircle, AlertCircle,
  ArrowRight, RefreshCw, Calendar, Users, Star
} from "lucide-react";

// Mock user ID for demo
const DEMO_USER_ID = 1;

export default function AdaptiveLearning() {
  const [selectedWeakness, setSelectedWeakness] = useState<string | null>(null);

  // Simulated adaptive learning data (would come from AI analysis in production)
  const adaptiveData = {
    learningProfile: {
      weakCategories: ["cardiology", "ethics", "pharmacology"],
      strongCategories: ["respiratory", "neurology", "psychiatry"],
      learningVelocity: 85, // percentage of normal pace
      totalQuestionsAnswered: 2847,
      accuracyTrend: [65, 68, 72, 75, 78, 82, 85, 87],
      lastUpdated: new Date()
    },
    recommendations: [
      {
        id: 1,
        type: "weakness-focus",
        category: "cardiology",
        priority: 9,
        title: "Focus on ECG Interpretation",
        description: "You've answered 45% correctly in ECG questions. Practice 15 more ECG cases today.",
        estimatedTime: 25,
        questions: 15,
        reason: "Low accuracy in cardiac rhythm analysis"
      },
      {
        id: 2,
        type: "spaced-repetition",
        category: "ethics",
        priority: 8,
        title: "Review Medical Ethics",
        description: "Time to review consent and confidentiality topics from 3 days ago.",
        estimatedTime: 20,
        questions: 12,
        reason: "Spaced repetition algorithm suggests review"
      },
      {
        id: 3,
        type: "strength-maintenance",
        category: "respiratory",
        priority: 5,
        title: "Maintain Respiratory Knowledge",
        description: "Quick review to maintain your 92% accuracy in respiratory cases.",
        estimatedTime: 10,
        questions: 8,
        reason: "Maintaining strong performance area"
      }
    ],
    insights: [
      {
        type: "improvement",
        title: "Great Progress in Pharmacology!",
        description: "Your accuracy improved from 58% to 76% this week. Keep it up!",
        trend: "positive"
      },
      {
        type: "warning",
        title: "Cardiology Needs Attention",
        description: "You've been avoiding cardiology questions. Daily practice recommended.",
        trend: "negative"
      },
      {
        type: "suggestion",
        title: "Optimal Study Time Detected",
        description: "You perform 23% better between 9-11 AM. Schedule challenging topics then.",
        trend: "neutral"
      }
    ]
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 8) return "bg-red-100 text-red-700 border-red-200";
    if (priority >= 6) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-green-100 text-green-700 border-green-200";
  };

  const getPriorityText = (priority: number) => {
    if (priority >= 8) return "High Priority";
    if (priority >= 6) return "Medium Priority";
    return "Low Priority";
  };

  return (
    <div className="min-h-screen bg-light-bg pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white py-12 border-b" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Brain className="w-8 h-8 mr-3 text-purple-600" />
              <h1 className="text-4xl font-bold" style={{ color: '#000000' }}>AI-Powered Learning</h1>
            </div>
            <p className="text-xl" style={{ color: '#666666' }}>Your personal AI tutor adapts to your learning patterns and weaknesses</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Learning Profile Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>85%</div>
              <div className="text-sm" style={{ color: '#666666' }}>Learning Velocity</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>87%</div>
              <div className="text-sm" style={{ color: '#666666' }}>Current Accuracy</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>2,847</div>
              <div className="text-sm" style={{ color: '#666666' }}>Questions Answered</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>3</div>
              <div className="text-sm" style={{ color: '#666666' }}>Priority Areas</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="recommendations" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white">
            <TabsTrigger value="recommendations" className="text-black">AI Recommendations</TabsTrigger>
            <TabsTrigger value="weaknesses" className="text-black">Weakness Analysis</TabsTrigger>
            <TabsTrigger value="progress" className="text-black">Learning Progress</TabsTrigger>
            <TabsTrigger value="insights" className="text-black">Smart Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="mt-6">
            <div className="space-y-6">
              {adaptiveData.recommendations.map((rec) => (
                <Card key={rec.id} className="bg-white border shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Brain className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-black mb-1">{rec.title}</h3>
                          <Badge className={`${getPriorityColor(rec.priority)} border text-xs`}>
                            {getPriorityText(rec.priority)}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-black">{rec.questions} questions</div>
                        <div className="text-sm text-gray-600">{rec.estimatedTime} min</div>
                      </div>
                    </div>
                    
                    <p className="text-black mb-4 leading-relaxed">{rec.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Lightbulb className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-gray-600">{rec.reason}</span>
                      </div>
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                        Start Practice
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weaknesses" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
                <CardHeader>
                  <CardTitle style={{ color: '#000000' }}>Areas Needing Attention</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {adaptiveData.learningProfile.weakCategories.map((category) => (
                      <div key={category} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                          <span className="font-medium capitalize" style={{ color: '#000000' }}>{category}</span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedWeakness(category)}
                        >
                          Focus Here
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
                <CardHeader>
                  <CardTitle style={{ color: '#000000' }}>Strong Performance Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {adaptiveData.learningProfile.strongCategories.map((category) => (
                      <div key={category} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="font-medium capitalize" style={{ color: '#000000' }}>{category}</span>
                        </div>
                        <Badge className="bg-green-100 text-green-700">Strong</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
              <CardHeader>
                <CardTitle style={{ color: '#000000' }}>Accuracy Trend (Last 8 Sessions)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <span style={{ color: '#666666' }}>Progress: 65% → 87%</span>
                    <Badge className="bg-green-100 text-green-700">+22% Improvement</Badge>
                  </div>
                  <Progress value={87} className="w-full h-2" />
                  <div className="grid grid-cols-8 gap-1 mt-4">
                    {adaptiveData.learningProfile.accuracyTrend.map((score, index) => (
                      <div key={index} className="text-center">
                        <div className="text-sm font-medium" style={{ color: '#000000' }}>{score}%</div>
                        <div className="text-xs text-gray-500">S{index + 1}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="space-y-4">
              {adaptiveData.insights.map((insight, index) => (
                <Alert key={index} className={`border ${
                  insight.trend === 'positive' ? 'border-green-200 bg-green-50' :
                  insight.trend === 'negative' ? 'border-red-200 bg-red-50' :
                  'border-blue-200 bg-blue-50'
                }`}>
                  <div className="flex items-start space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      insight.trend === 'positive' ? 'bg-green-100' :
                      insight.trend === 'negative' ? 'bg-red-100' :
                      'bg-blue-100'
                    }`}>
                      {insight.trend === 'positive' ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : insight.trend === 'negative' ? (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      ) : (
                        <Lightbulb className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold" style={{ color: '#000000' }}>{insight.title}</h4>
                      <AlertDescription style={{ color: '#666666' }}>
                        {insight.description}
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Action Panel */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-0 mt-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#000000' }}>Ready for Your Personalized Study Session?</h3>
                <p style={{ color: '#666666' }}>AI has prepared 23 questions targeting your weak areas with optimized difficulty.</p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Analysis
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Brain className="w-4 h-4 mr-2" />
                  Start AI Session
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}