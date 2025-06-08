import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, Calendar, Target, Brain, Users, Trophy, 
  Clock, CheckCircle, AlertTriangle, BarChart3, LineChart
} from "lucide-react";

export default function AdvancedAnalytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('month');

  // Mock analytics data - in real app this would come from backend
  const analyticsData = {
    overall: {
      totalQuestions: 1247,
      correctAnswers: 934,
      accuracy: 75,
      studyTime: 87, // hours
      streak: 12,
      improvementRate: 8.5
    },
    categoryPerformance: [
      { category: 'Cardiovascular', accuracy: 82, questions: 245, timeSpent: 18, trend: 'up' },
      { category: 'Respiratory', accuracy: 78, questions: 198, timeSpent: 15, trend: 'up' },
      { category: 'Gastroenterology', accuracy: 71, questions: 156, timeSpent: 12, trend: 'down' },
      { category: 'Neurology', accuracy: 68, questions: 134, timeSpent: 14, trend: 'stable' },
      { category: 'Endocrinology', accuracy: 85, questions: 187, timeSpent: 16, trend: 'up' },
      { category: 'Psychiatry', accuracy: 73, questions: 112, timeSpent: 9, trend: 'up' },
      { category: 'Obstetrics & Gynaecology', accuracy: 76, questions: 98, timeSpent: 8, trend: 'stable' },
      { category: 'Paediatrics', accuracy: 79, questions: 117, timeSpent: 11, trend: 'up' }
    ],
    weeklyProgress: [
      { week: 'Week 1', accuracy: 68, questions: 156 },
      { week: 'Week 2', accuracy: 71, questions: 189 },
      { week: 'Week 3', accuracy: 74, questions: 203 },
      { week: 'Week 4', accuracy: 75, questions: 234 }
    ],
    examReadiness: {
      plab1: 78,
      estimatedPassProbability: 82,
      recommendedStudyDays: 45,
      weakestAreas: ['Gastroenterology', 'Neurology'],
      strongestAreas: ['Endocrinology', 'Cardiovascular']
    },
    peerComparison: {
      yourPercentile: 73,
      averageAccuracy: 69,
      averageStudyTime: 52
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const getPerformanceColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-600 bg-green-50';
    if (accuracy >= 70) return 'text-blue-600 bg-blue-50';
    if (accuracy >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              Advanced Analytics
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Comprehensive performance insights and exam readiness assessment
            </p>
          </div>
          <div className="flex gap-2">
            {(['week', 'month', 'quarter'] as const).map((timeframe) => (
              <Button
                key={timeframe}
                variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTimeframe(timeframe)}
                className="capitalize"
              >
                {timeframe}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-600" />
              Overall Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overall.accuracy}%</div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">+{analyticsData.overall.improvementRate}% this month</span>
            </div>
            <Progress value={analyticsData.overall.accuracy} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Questions Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overall.totalQuestions.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground mt-2">
              {analyticsData.overall.correctAnswers} correct answers
            </div>
            <div className="text-xs text-green-600 mt-1">
              Target: 2,000 questions for exam readiness
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-600" />
              Study Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overall.studyTime}h</div>
            <div className="text-sm text-muted-foreground mt-2">
              This month
            </div>
            <div className="text-xs text-purple-600 mt-1">
              Above average ({analyticsData.peerComparison.averageStudyTime}h peer avg)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Trophy className="w-4 h-4 text-orange-600" />
              Study Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overall.streak} days</div>
            <div className="text-sm text-muted-foreground mt-2">
              Current streak
            </div>
            <div className="text-xs text-orange-600 mt-1">
              Keep it up! Target: 30 days
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exam Readiness Assessment */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-600" />
            PLAB 1 Exam Readiness
          </CardTitle>
          <CardDescription>
            AI-powered assessment based on your performance patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Readiness Score</span>
                <span className="text-2xl font-bold text-blue-600">
                  {analyticsData.examReadiness.plab1}%
                </span>
              </div>
              <Progress value={analyticsData.examReadiness.plab1} className="mb-4" />
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pass Probability</span>
                  <span className="font-medium text-green-600">
                    {analyticsData.examReadiness.estimatedPassProbability}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Recommended Study Days</span>
                  <span className="font-medium">
                    {analyticsData.examReadiness.recommendedStudyDays} days
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  Focus Areas
                </h4>
                <div className="space-y-2">
                  {analyticsData.examReadiness.weakestAreas.map((area) => (
                    <Badge key={area} variant="destructive" className="mr-2">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Strong Areas
                </h4>
                <div className="space-y-2">
                  {analyticsData.examReadiness.strongestAreas.map((area) => (
                    <Badge key={area} className="mr-2 bg-green-600">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Performance */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="w-5 h-5 text-purple-600" />
            Performance by Medical Specialty
          </CardTitle>
          <CardDescription>
            Detailed breakdown of your performance across all medical categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.categoryPerformance.map((category) => (
              <div key={category.category} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{category.category}</h4>
                    <div className="flex items-center gap-3">
                      {getTrendIcon(category.trend)}
                      <span className={`px-2 py-1 rounded text-sm font-medium ${getPerformanceColor(category.accuracy)}`}>
                        {category.accuracy}%
                      </span>
                    </div>
                  </div>
                  <Progress value={category.accuracy} className="mb-2" />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{category.questions} questions completed</span>
                    <span>{category.timeSpent}h study time</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Progress Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-600" />
            Weekly Progress Trend
          </CardTitle>
          <CardDescription>
            Your accuracy improvement over the past month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.weeklyProgress.map((week, index) => (
              <div key={week.week} className="flex items-center gap-4">
                <div className="w-20 text-sm font-medium">{week.week}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{week.accuracy}% accuracy</span>
                    <span className="text-sm text-muted-foreground">{week.questions} questions</span>
                  </div>
                  <Progress value={week.accuracy} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Peer Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Peer Comparison
          </CardTitle>
          <CardDescription>
            See how you compare with other PLAB candidates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {analyticsData.peerComparison.yourPercentile}rd
              </div>
              <div className="text-sm text-muted-foreground">Percentile Rank</div>
              <div className="text-xs text-blue-600 mt-1">
                Better than {analyticsData.peerComparison.yourPercentile}% of candidates
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {analyticsData.overall.accuracy}%
              </div>
              <div className="text-sm text-muted-foreground">Your Accuracy</div>
              <div className="text-xs text-green-600 mt-1">
                vs {analyticsData.peerComparison.averageAccuracy}% peer average
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {analyticsData.overall.studyTime}h
              </div>
              <div className="text-sm text-muted-foreground">Study Time</div>
              <div className="text-xs text-purple-600 mt-1">
                vs {analyticsData.peerComparison.averageStudyTime}h peer average
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}