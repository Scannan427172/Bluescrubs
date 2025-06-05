import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, TrendingUp, Target, Clock, Brain,
  Calendar, Award, AlertTriangle, CheckCircle,
  Users, BookOpen, Zap, Eye, Download, Lightbulb
} from "lucide-react";

// Demo user ID
const DEMO_USER_ID = 1;

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("30days");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loadingAdaptivePlan, setLoadingAdaptivePlan] = useState(false);
  const [adaptivePlan, setAdaptivePlan] = useState<any>(null);

  // Fetch AI-powered analytics
  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: [`/api/analytics/${DEMO_USER_ID}`],
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
  });

  const generateAdaptivePlan = async () => {
    setLoadingAdaptivePlan(true);
    try {
      const response = await fetch(`/api/analytics/${DEMO_USER_ID}/adaptive-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        const plan = await response.json();
        setAdaptivePlan(plan);
      }
    } catch (error) {
      console.error('Failed to generate adaptive plan:', error);
    } finally {
      setLoadingAdaptivePlan(false);
    }
  };

  // Advanced analytics data
  const analyticsData = {
    overview: {
      totalStudyTime: 47.5, // hours
      questionsAnswered: 1247,
      accuracy: 78,
      streak: 12,
      weakestCategory: "Cardiology",
      strongestCategory: "Respiratory",
      improvementRate: 23 // percentage increase
    },
    performance: {
      accuracyTrend: [
        { date: "2025-05-07", accuracy: 65 },
        { date: "2025-05-14", accuracy: 68 },
        { date: "2025-05-21", accuracy: 72 },
        { date: "2025-05-28", accuracy: 75 },
        { date: "2025-06-04", accuracy: 78 }
      ],
      categoryBreakdown: [
        { category: "Cardiology", correct: 45, total: 67, accuracy: 67, improvement: -3 },
        { category: "Respiratory", correct: 89, total: 95, accuracy: 94, improvement: 8 },
        { category: "Neurology", correct: 78, total: 92, accuracy: 85, improvement: 12 },
        { category: "Endocrinology", correct: 56, total: 73, accuracy: 77, improvement: 5 },
        { category: "Psychiatry", correct: 67, total: 81, accuracy: 83, improvement: 15 },
        { category: "Ethics", correct: 34, total: 48, accuracy: 71, improvement: -2 }
      ],
      timeDistribution: [
        { category: "PLAB 1 Practice", hours: 18.5, percentage: 39 },
        { category: "OSCE Practice", hours: 12.3, percentage: 26 },
        { category: "Cultural Training", hours: 6.2, percentage: 13 },
        { category: "Community", hours: 4.8, percentage: 10 },
        { category: "Reading", hours: 5.7, percentage: 12 }
      ]
    },
    insights: [
      {
        type: "strength",
        title: "Respiratory Mastery",
        description: "You've achieved 94% accuracy in respiratory questions - excellent work!",
        action: "Maintain with weekly review sessions",
        priority: "low"
      },
      {
        type: "weakness",
        title: "Cardiology Focus Needed",
        description: "Accuracy dropped 3% in cardiology. ECG interpretation needs attention.",
        action: "Schedule daily ECG practice for 2 weeks",
        priority: "high"
      },
      {
        type: "pattern",
        title: "Peak Performance Time",
        description: "You score 23% higher between 9-11 AM. Schedule difficult topics then.",
        action: "Adjust study schedule automatically",
        priority: "medium"
      },
      {
        type: "prediction",
        title: "Exam Readiness Forecast",
        description: "At current pace, you'll reach 85% accuracy by exam date.",
        action: "Consider increasing daily practice by 30 minutes",
        priority: "medium"
      }
    ],
    comparisons: {
      percentile: 87, // compared to other users
      averageAccuracy: 73, // platform average
      topPerformers: 91, // top 10% average
      similarUsers: [
        { category: "Same stage", accuracy: 75, rank: "Top 15%" },
        { category: "Same timeline", accuracy: 77, rank: "Top 12%" },
        { category: "Similar background", accuracy: 79, rank: "Top 8%" }
      ]
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "strength": return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "weakness": return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case "pattern": return <Eye className="w-5 h-5 text-blue-600" />;
      case "prediction": return <TrendingUp className="w-5 h-5 text-purple-600" />;
      default: return <Brain className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const exportData = () => {
    // Simulate data export
    const data = JSON.stringify(analyticsData, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plab-analytics-export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-light-bg pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white py-12 border-b" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <BarChart3 className="w-8 h-8 mr-3 text-blue-600" />
              <h1 className="text-4xl font-bold" style={{ color: '#000000' }}>Advanced Analytics</h1>
            </div>
            <p className="text-xl" style={{ color: '#666666' }}>Deep insights into your learning patterns and performance trends</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="3months">Last 3 months</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="respiratory">Respiratory</SelectItem>
                <SelectItem value="neurology">Neurology</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={exportData} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>{analyticsData.overview.totalStudyTime}h</div>
              <div className="text-sm" style={{ color: '#666666' }}>Study Time</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>{analyticsData.overview.questionsAnswered}</div>
              <div className="text-sm" style={{ color: '#666666' }}>Questions</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>{analyticsData.overview.accuracy}%</div>
              <div className="text-sm" style={{ color: '#666666' }}>Accuracy</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>{analyticsData.overview.streak}</div>
              <div className="text-sm" style={{ color: '#666666' }}>Day Streak</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>+{analyticsData.overview.improvementRate}%</div>
              <div className="text-sm" style={{ color: '#666666' }}>Improvement</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>{analyticsData.comparisons.percentile}th</div>
              <div className="text-sm" style={{ color: '#666666' }}>Percentile</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="comparison">Benchmarking</TabsTrigger>
            <TabsTrigger value="predictions">Forecasting</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Category Performance */}
              <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
                <CardHeader>
                  <CardTitle style={{ color: '#000000' }}>Category Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.performance.categoryBreakdown.map((category) => (
                      <div key={category.category} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium" style={{ color: '#000000' }}>{category.category}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm" style={{ color: '#666666' }}>
                              {category.correct}/{category.total}
                            </span>
                            <Badge className={`text-xs ${
                              category.improvement >= 0 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {category.improvement >= 0 ? '+' : ''}{category.improvement}%
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={category.accuracy} className="flex-1" />
                          <span className="text-sm font-medium w-12" style={{ color: '#000000' }}>
                            {category.accuracy}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Time Distribution */}
              <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
                <CardHeader>
                  <CardTitle style={{ color: '#000000' }}>Study Time Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.performance.timeDistribution.map((item) => (
                      <div key={item.category} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium" style={{ color: '#000000' }}>{item.category}</span>
                          <span className="text-sm" style={{ color: '#666666' }}>{item.hours}h</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={item.percentage} className="flex-1" />
                          <span className="text-sm font-medium w-12" style={{ color: '#000000' }}>
                            {item.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Accuracy Trend */}
            <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
              <CardHeader>
                <CardTitle style={{ color: '#000000' }}>Accuracy Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {analyticsData.performance.accuracyTrend.map((point, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className="bg-blue-500 w-full rounded-t"
                        style={{ height: `${(point.accuracy / 100) * 200}px` }}
                      />
                      <div className="text-xs mt-2 text-center" style={{ color: '#666666' }}>
                        {new Date(point.date).toLocaleDateString()}
                      </div>
                      <div className="text-xs font-medium" style={{ color: '#000000' }}>
                        {point.accuracy}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="space-y-4">
              {analyticsData.insights.map((insight, index) => (
                <Card key={index} className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {getInsightIcon(insight.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold" style={{ color: '#000000' }}>{insight.title}</h4>
                          <Badge className={`${getPriorityColor(insight.priority)} border text-xs`}>
                            {insight.priority} priority
                          </Badge>
                        </div>
                        <p className="text-gray-700 mb-3">{insight.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium" style={{ color: '#000000' }}>
                            Recommended Action: {insight.action}
                          </span>
                          <Button size="sm" variant="outline">
                            Apply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
                <CardHeader>
                  <CardTitle style={{ color: '#000000' }}>Performance Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {analyticsData.comparisons.percentile}th percentile
                      </div>
                      <p className="text-gray-600">You're performing better than {analyticsData.comparisons.percentile}% of users</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span style={{ color: '#000000' }}>Your accuracy:</span>
                        <span className="font-bold text-blue-600">{analyticsData.overview.accuracy}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span style={{ color: '#000000' }}>Platform average:</span>
                        <span className="font-bold text-gray-600">{analyticsData.comparisons.averageAccuracy}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span style={{ color: '#000000' }}>Top 10% average:</span>
                        <span className="font-bold text-green-600">{analyticsData.comparisons.topPerformers}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
                <CardHeader>
                  <CardTitle style={{ color: '#000000' }}>Peer Comparisons</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.comparisons.similarUsers.map((comparison, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium" style={{ color: '#000000' }}>{comparison.category}</span>
                          <Badge className="bg-blue-100 text-blue-700">{comparison.rank}</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={(comparison.accuracy / 100) * 100} className="flex-1" />
                          <span className="text-sm font-medium" style={{ color: '#000000' }}>
                            {comparison.accuracy}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
              <CardHeader>
                <CardTitle style={{ color: '#000000' }}>Exam Readiness Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">85%</div>
                    <p className="text-sm text-gray-600">Predicted accuracy by exam date</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">18 days</div>
                    <p className="text-sm text-gray-600">To reach 90% accuracy</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">92%</div>
                    <p className="text-sm text-gray-600">Success probability</p>
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