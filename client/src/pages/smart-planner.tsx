import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Calendar as CalendarIcon, Clock, Target, TrendingUp, 
  RefreshCw, AlertTriangle, CheckCircle, Zap, Brain,
  BookOpen, Users, Award, BarChart3, Settings
} from "lucide-react";

export default function SmartPlanner() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [examDate, setExamDate] = useState(new Date('2025-08-15'));
  const [dailyHours, setDailyHours] = useState([3]);
  const [autoRebalance, setAutoRebalance] = useState(true);
  const [adaptiveMode, setAdaptiveMode] = useState(true);

  // Mock smart planner data
  const plannerData = {
    currentStreak: 12,
    weeklyGoal: 21, // hours
    weeklyProgress: 16.5,
    daysUntilExam: 72,
    studyEfficiency: 87,
    missedDays: 3,
    adaptivePlan: {
      weeklySchedule: [
        { day: 'Monday', hours: 3, topics: ['Cardiology', 'Ethics'], completed: true, efficiency: 92 },
        { day: 'Tuesday', hours: 2.5, topics: ['Respiratory', 'Pharmacology'], completed: true, efficiency: 85 },
        { day: 'Wednesday', hours: 3.5, topics: ['Neurology', 'OSCE Practice'], completed: false, efficiency: 0 },
        { day: 'Thursday', hours: 3, topics: ['Endocrinology', 'Statistics'], completed: false, efficiency: 0 },
        { day: 'Friday', hours: 2, topics: ['Psychiatry', 'Communication'], completed: false, efficiency: 0 },
        { day: 'Saturday', hours: 4, topics: ['Mock Exam', 'Review'], completed: false, efficiency: 0 },
        { day: 'Sunday', hours: 3, topics: ['Weak Areas', 'Revision'], completed: false, efficiency: 0 }
      ],
      rebalanceHistory: [
        { date: '2025-06-02', reason: 'Missed Monday session - redistributed 3 hours across week', impact: 'Low' },
        { date: '2025-05-28', reason: 'Low cardiology scores - increased cardiology time by 40%', impact: 'Medium' },
        { date: '2025-05-25', reason: 'Ahead of schedule in respiratory - reduced by 1 hour weekly', impact: 'Low' }
      ]
    },
    insights: [
      {
        type: 'performance',
        title: 'Peak Performance Time',
        description: 'You perform 28% better between 9-11 AM. Consider scheduling difficult topics then.',
        actionable: true
      },
      {
        type: 'warning',
        title: 'Cardiology Lag',
        description: 'Behind target by 15% in cardiology. Auto-rebalance increased weekly time.',
        actionable: false
      },
      {
        type: 'success',
        title: 'Consistency Streak',
        description: '12-day study streak! Consistency is key to long-term retention.',
        actionable: false
      }
    ]
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 85) return 'text-green-600';
    if (efficiency >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getEfficiencyBadge = (efficiency: number) => {
    if (efficiency >= 85) return 'bg-green-100 text-green-700';
    if (efficiency >= 70) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const rebalancePlan = () => {
    // Simulate smart rebalancing
    alert('Smart rebalancing complete! Your study plan has been optimized based on your recent performance and remaining time until exam.');
  };

  return (
    <div className="min-h-screen bg-light-bg pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white py-12 border-b" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Brain className="w-8 h-8 mr-3 text-blue-600" />
              <h1 className="text-4xl font-bold" style={{ color: '#000000' }}>Smart Study Planner</h1>
            </div>
            <p className="text-xl" style={{ color: '#666666' }}>AI-powered planning that adapts to your life and learning patterns</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>{plannerData.daysUntilExam}</div>
              <div className="text-sm" style={{ color: '#666666' }}>Days to Exam</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>{plannerData.currentStreak}</div>
              <div className="text-sm" style={{ color: '#666666' }}>Day Streak</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>{plannerData.studyEfficiency}%</div>
              <div className="text-sm" style={{ color: '#666666' }}>Efficiency</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>{plannerData.weeklyProgress}</div>
              <div className="text-sm" style={{ color: '#666666' }}>Hours This Week</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>{plannerData.missedDays}</div>
              <div className="text-sm" style={{ color: '#666666' }}>Missed Days</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="schedule" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
            <TabsTrigger value="settings">Plan Settings</TabsTrigger>
            <TabsTrigger value="rebalance">Auto-Rebalance</TabsTrigger>
            <TabsTrigger value="insights">Smart Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
                  <CardHeader>
                    <CardTitle style={{ color: '#000000' }}>This Week's Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {plannerData.adaptivePlan.weeklySchedule.map((day, index) => (
                        <div key={index} className={`p-4 border rounded-lg ${day.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              {day.completed ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <Clock className="w-5 h-5 text-gray-400" />
                              )}
                              <span className="font-medium" style={{ color: '#000000' }}>{day.day}</span>
                              <Badge className={day.completed ? getEfficiencyBadge(day.efficiency) : 'bg-gray-100 text-gray-600'}>
                                {day.completed ? `${day.efficiency}% efficiency` : 'Pending'}
                              </Badge>
                            </div>
                            <span className="text-sm" style={{ color: '#666666' }}>{day.hours}h</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {day.topics.map((topic, topicIndex) => (
                              <Badge key={topicIndex} variant="outline" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
                  <CardHeader>
                    <CardTitle style={{ color: '#000000' }}>Weekly Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span style={{ color: '#666666' }}>Hours Completed</span>
                          <span style={{ color: '#000000' }}>{plannerData.weeklyProgress}/{plannerData.weeklyGoal}h</span>
                        </div>
                        <Progress value={(plannerData.weeklyProgress / plannerData.weeklyGoal) * 100} className="w-full" />
                      </div>
                      
                      <div className="pt-4 border-t">
                        <h4 className="font-medium mb-3" style={{ color: '#000000' }}>Quick Actions</h4>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Rebalance This Week
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Clock className="w-4 h-4 mr-2" />
                            Mark Session Complete
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Report Missed Day
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
                <CardHeader>
                  <CardTitle style={{ color: '#000000' }}>Plan Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label style={{ color: '#000000' }}>Exam Date</Label>
                    <Input 
                      type="date" 
                      value={examDate.toISOString().split('T')[0]}
                      onChange={(e) => setExamDate(new Date(e.target.value))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label style={{ color: '#000000' }}>Daily Study Hours: {dailyHours[0]}h</Label>
                    <Slider
                      value={dailyHours}
                      onValueChange={setDailyHours}
                      max={8}
                      min={1}
                      step={0.5}
                      className="mt-2"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label style={{ color: '#000000' }}>Auto-Rebalance</Label>
                    <Switch 
                      checked={autoRebalance} 
                      onCheckedChange={setAutoRebalance}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label style={{ color: '#000000' }}>Adaptive Mode</Label>
                    <Switch 
                      checked={adaptiveMode} 
                      onCheckedChange={setAdaptiveMode}
                    />
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Update Plan
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
                <CardHeader>
                  <CardTitle style={{ color: '#000000' }}>Calendar View</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rebalance" className="space-y-6">
            <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
              <CardHeader>
                <CardTitle style={{ color: '#000000' }}>Auto-Rebalance History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {plannerData.adaptivePlan.rebalanceHistory.map((event, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium" style={{ color: '#000000' }}>{event.date}</span>
                        <Badge className={`
                          ${event.impact === 'High' ? 'bg-red-100 text-red-700' :
                            event.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'}
                        `}>
                          {event.impact} Impact
                        </Badge>
                      </div>
                      <p className="text-gray-700">{event.reason}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium" style={{ color: '#000000' }}>Manual Rebalance Available</h4>
                      <p className="text-sm text-gray-600">Your performance data suggests optimizations are possible.</p>
                    </div>
                    <Button onClick={rebalancePlan} className="bg-blue-600 hover:bg-blue-700 text-white">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Rebalance Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="space-y-4">
              {plannerData.insights.map((insight, index) => (
                <Card key={index} className={`border ${
                  insight.type === 'success' ? 'border-green-200 bg-green-50' :
                  insight.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                  'border-blue-200 bg-blue-50'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          insight.type === 'success' ? 'bg-green-100' :
                          insight.type === 'warning' ? 'bg-yellow-100' :
                          'bg-blue-100'
                        }`}>
                          {insight.type === 'success' ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : insight.type === 'warning' ? (
                            <AlertTriangle className="w-5 h-5 text-yellow-600" />
                          ) : (
                            <BarChart3 className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold" style={{ color: '#000000' }}>{insight.title}</h4>
                          <p className="text-gray-700 mt-1">{insight.description}</p>
                        </div>
                      </div>
                      {insight.actionable && (
                        <Button variant="outline" size="sm">
                          Apply
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}