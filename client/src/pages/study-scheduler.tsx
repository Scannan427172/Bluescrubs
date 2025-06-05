import { useState, useEffect } from "react";
import { Calendar, Clock, Brain, Target, Settings, BookOpen, TrendingUp, AlertCircle, CheckCircle2, Play, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface UserPreferences {
  id?: number;
  userId: number;
  preferredStudyHours: { start: number; end: number };
  preferredDays: number[];
  maxSessionDuration: number;
  minBreakBetweenSessions: number;
  studyIntensity: "light" | "moderate" | "intensive";
  learningStyle: "visual" | "auditory" | "kinesthetic" | "reading";
  weakAreas: string[];
  strongAreas: string[];
  examDate?: string;
  dailyStudyGoal: number;
}

interface StudySession {
  id: string;
  userId: number;
  subject: string;
  category: string;
  difficulty: "foundation" | "intermediate" | "advanced";
  scheduledStart: string;
  scheduledEnd: string;
  duration: number;
  priority: "low" | "medium" | "high" | "critical";
  sessionType: "review" | "learning" | "practice" | "assessment";
  learningObjectives: string[];
  estimatedQuestions: number;
  completed: boolean;
  actualStart?: string;
  actualEnd?: string;
  performance?: {
    accuracy: number;
    timePerQuestion: number;
    confidence: number;
  };
}

interface PerformanceMetrics {
  id: number;
  userId: number;
  category: string;
  difficulty: string;
  recentAccuracy: number;
  averageTimePerQuestion: number;
  completionRate: number;
  retentionRate: number;
  improvementTrend: number;
  lastStudied: string;
  masteryLevel: number;
  strugglingTopics: string[];
}

export default function StudyScheduler() {
  const [userId] = useState(1); // In real app, get from auth context
  const [activeTab, setActiveTab] = useState("schedule");
  const [isGeneratingSchedule, setIsGeneratingSchedule] = useState(false);
  const [selectedSession, setSelectedSession] = useState<StudySession | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch user preferences
  const { data: preferences, isLoading: preferencesLoading } = useQuery({
    queryKey: ["/api/study-scheduler/preferences", userId],
    queryFn: () => apiRequest("GET", `/api/study-scheduler/preferences/${userId}`),
    retry: false,
  });

  // Fetch study sessions
  const { data: sessionsData, isLoading: sessionsLoading } = useQuery({
    queryKey: ["/api/study-scheduler/sessions", userId],
    queryFn: () => apiRequest("GET", `/api/study-scheduler/sessions/${userId}`),
  });

  // Fetch performance metrics
  const { data: metricsData, isLoading: metricsLoading } = useQuery({
    queryKey: ["/api/study-scheduler/metrics", userId],
    queryFn: () => apiRequest("GET", `/api/study-scheduler/metrics/${userId}`),
  });

  // Generate schedule mutation
  const generateScheduleMutation = useMutation({
    mutationFn: async (data: { startDate: string; endDate: string }) => {
      return apiRequest("POST", "/api/study-scheduler/generate-schedule", {
        userId,
        ...data
      });
    },
    onSuccess: () => {
      toast({
        title: "Schedule Generated",
        description: "Your optimized study schedule has been created successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/study-scheduler/sessions", userId] });
    },
    onError: (error: any) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate study schedule",
        variant: "destructive",
      });
    },
  });

  // Update session mutation
  const updateSessionMutation = useMutation({
    mutationFn: async (data: { sessionId: string; updates: Partial<StudySession> }) => {
      return apiRequest("PUT", `/api/study-scheduler/sessions/${data.sessionId}`, data.updates);
    },
    onSuccess: () => {
      toast({
        title: "Session Updated",
        description: "Study session has been updated successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/study-scheduler/sessions", userId] });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update session",
        variant: "destructive",
      });
    },
  });

  const handleGenerateSchedule = () => {
    if (!preferences) {
      toast({
        title: "Setup Required",
        description: "Please set up your study preferences first",
        variant: "destructive",
      });
      setActiveTab("preferences");
      return;
    }

    setIsGeneratingSchedule(true);
    const startDate = new Date().toISOString().split('T')[0];
    const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    generateScheduleMutation.mutate({ startDate, endDate });
    setIsGeneratingSchedule(false);
  };

  const handleCompleteSession = (session: StudySession) => {
    const performance = {
      accuracy: Math.random() * 40 + 60, // 60-100%
      timePerQuestion: Math.random() * 60 + 30, // 30-90 seconds
      confidence: Math.random() * 30 + 70, // 70-100%
    };

    updateSessionMutation.mutate({
      sessionId: session.id,
      updates: {
        completed: true,
        actualEnd: new Date().toISOString(),
        performance
      }
    });
  };

  const sessions: StudySession[] = sessionsData?.sessions || [];
  const metrics: PerformanceMetrics[] = metricsData?.metrics || [];
  const upcomingSessions = sessions.filter(s => !s.completed && new Date(s.scheduledStart) > new Date());
  const completedSessions = sessions.filter(s => s.completed);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "foundation": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low": return "bg-blue-100 text-blue-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  if (preferencesLoading || sessionsLoading || metricsLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Study Scheduler</h1>
            <p className="text-gray-600">Personalized, adaptive learning schedule optimization</p>
          </div>
        </div>
        
        {!preferences && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <div>
                <h3 className="font-semibold text-yellow-800">Setup Required</h3>
                <p className="text-yellow-700">Please configure your study preferences to enable AI-powered scheduling.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            AI Insights
          </TabsTrigger>
        </TabsList>

        {/* Schedule Tab */}
        <TabsContent value="schedule" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Optimized Schedule</h2>
            <Button 
              onClick={handleGenerateSchedule} 
              disabled={isGeneratingSchedule || !preferences}
              className="flex items-center gap-2"
            >
              <Brain className="h-4 w-4" />
              {isGeneratingSchedule ? "Generating..." : "Generate AI Schedule"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Upcoming Sessions</p>
                      <p className="text-2xl font-bold text-blue-600">{upcomingSessions.length}</p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Completed Sessions</p>
                      <p className="text-2xl font-bold text-green-600">{completedSessions.length}</p>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Weekly Hours</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {Math.round((sessions.reduce((acc, s) => acc + s.duration, 0) / 60) * 10) / 10}h
                      </p>
                    </div>
                    <Target className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg. Performance</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {metrics.length > 0 ? Math.round(metrics.reduce((acc, m) => acc + m.recentAccuracy, 0) / metrics.length) : 0}%
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Sessions */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.length === 0 ? (
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No upcoming sessions scheduled</p>
                      <p className="text-sm text-gray-400">Generate an AI schedule to get started</p>
                    </div>
                  ) : (
                    upcomingSessions.slice(0, 5).map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold">{session.subject}</h4>
                            <Badge className={getDifficultyColor(session.difficulty)}>
                              {session.difficulty}
                            </Badge>
                            <Badge className={getPriorityColor(session.priority)}>
                              {session.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{session.category} • {session.sessionType}</p>
                          <p className="text-sm text-gray-500">
                            {formatDate(session.scheduledStart)} at {formatTime(session.scheduledStart)} 
                            ({session.duration} min)
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleCompleteSession(session)}
                          className="flex items-center gap-2"
                        >
                          <Play className="h-4 w-4" />
                          Start
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.length === 0 ? (
                    <div className="text-center py-8">
                      <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No performance data yet</p>
                      <p className="text-sm text-gray-400">Complete sessions to see analytics</p>
                    </div>
                  ) : (
                    metrics.slice(0, 3).map((metric) => (
                      <div key={metric.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{metric.category}</span>
                          <span className="text-sm text-gray-600">{Math.round(metric.recentAccuracy)}%</span>
                        </div>
                        <Progress value={metric.recentAccuracy} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Mastery: {metric.masteryLevel}%</span>
                          <span className={metric.improvementTrend > 0 ? "text-green-600" : "text-red-600"}>
                            {metric.improvementTrend > 0 ? "↗" : "↘"} 
                            {Math.abs(metric.improvementTrend * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <PreferencesForm userId={userId} preferences={preferences} onUpdate={() => {
            queryClient.invalidateQueries({ queryKey: ["/api/study-scheduler/preferences", userId] });
          }} />
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <PerformanceAnalytics metrics={metrics} sessions={completedSessions} />
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <AIInsights metrics={metrics} sessions={sessions} preferences={preferences} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Preferences Form Component
function PreferencesForm({ userId, preferences, onUpdate }: { 
  userId: number; 
  preferences: UserPreferences | null; 
  onUpdate: () => void;
}) {
  const [formData, setFormData] = useState<Partial<UserPreferences>>({
    userId,
    preferredStudyHours: { start: 9, end: 17 },
    preferredDays: [1, 2, 3, 4, 5],
    maxSessionDuration: 60,
    minBreakBetweenSessions: 15,
    studyIntensity: "moderate",
    learningStyle: "visual",
    weakAreas: [],
    strongAreas: [],
    dailyStudyGoal: 120,
    ...preferences
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: async (data: Partial<UserPreferences>) => {
      if (preferences) {
        return apiRequest("PUT", `/api/study-scheduler/preferences/${userId}`, data);
      } else {
        return apiRequest("POST", "/api/study-scheduler/preferences", data);
      }
    },
    onSuccess: () => {
      toast({
        title: "Preferences Saved",
        description: "Your study preferences have been updated successfully!",
      });
      onUpdate();
    },
    onError: (error: any) => {
      toast({
        title: "Save Failed",
        description: error.message || "Failed to save preferences",
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    saveMutation.mutate(formData);
  };

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Study Preferences</h2>
        <p className="text-gray-600">Configure your learning preferences for optimal AI scheduling</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Schedule Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime">Preferred Start Time</Label>
                <Select
                  value={formData.preferredStudyHours?.start?.toString()}
                  onValueChange={(value) => setFormData(prev => ({
                    ...prev,
                    preferredStudyHours: { ...prev.preferredStudyHours!, start: parseInt(value) }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {i.toString().padStart(2, '0')}:00
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="endTime">Preferred End Time</Label>
                <Select
                  value={formData.preferredStudyHours?.end?.toString()}
                  onValueChange={(value) => setFormData(prev => ({
                    ...prev,
                    preferredStudyHours: { ...prev.preferredStudyHours!, end: parseInt(value) }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {i.toString().padStart(2, '0')}:00
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Preferred Study Days</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {dayNames.map((day, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`day-${index}`}
                      checked={formData.preferredDays?.includes(index)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData(prev => ({
                            ...prev,
                            preferredDays: [...(prev.preferredDays || []), index]
                          }));
                        } else {
                          setFormData(prev => ({
                            ...prev,
                            preferredDays: prev.preferredDays?.filter(d => d !== index)
                          }));
                        }
                      }}
                    />
                    <Label htmlFor={`day-${index}`} className="text-sm">
                      {day.slice(0, 3)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="maxSession">Max Session Duration (minutes)</Label>
              <Input
                id="maxSession"
                type="number"
                value={formData.maxSessionDuration}
                onChange={(e) => setFormData(prev => ({ ...prev, maxSessionDuration: parseInt(e.target.value) }))}
                min={15}
                max={180}
              />
            </div>

            <div>
              <Label htmlFor="dailyGoal">Daily Study Goal (minutes)</Label>
              <Input
                id="dailyGoal"
                type="number"
                value={formData.dailyStudyGoal}
                onChange={(e) => setFormData(prev => ({ ...prev, dailyStudyGoal: parseInt(e.target.value) }))}
                min={30}
                max={480}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="intensity">Study Intensity</Label>
              <Select
                value={formData.studyIntensity}
                onValueChange={(value: "light" | "moderate" | "intensive") => 
                  setFormData(prev => ({ ...prev, studyIntensity: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light (Relaxed pace)</SelectItem>
                  <SelectItem value="moderate">Moderate (Balanced approach)</SelectItem>
                  <SelectItem value="intensive">Intensive (Accelerated learning)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="learningStyle">Learning Style</Label>
              <Select
                value={formData.learningStyle}
                onValueChange={(value: "visual" | "auditory" | "kinesthetic" | "reading") => 
                  setFormData(prev => ({ ...prev, learningStyle: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visual">Visual (Diagrams, charts)</SelectItem>
                  <SelectItem value="auditory">Auditory (Lectures, discussions)</SelectItem>
                  <SelectItem value="kinesthetic">Kinesthetic (Hands-on practice)</SelectItem>
                  <SelectItem value="reading">Reading/Writing (Text-based)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="examDate">Target Exam Date (Optional)</Label>
              <Input
                id="examDate"
                type="date"
                value={formData.examDate}
                onChange={(e) => setFormData(prev => ({ ...prev, examDate: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="breakTime">Minimum Break Between Sessions (minutes)</Label>
              <Input
                id="breakTime"
                type="number"
                value={formData.minBreakBetweenSessions}
                onChange={(e) => setFormData(prev => ({ ...prev, minBreakBetweenSessions: parseInt(e.target.value) }))}
                min={5}
                max={60}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saveMutation.isPending} className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          {saveMutation.isPending ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  );
}

// Performance Analytics Component
function PerformanceAnalytics({ metrics, sessions }: { 
  metrics: PerformanceMetrics[]; 
  sessions: StudySession[];
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Performance Analytics</h2>
        <p className="text-gray-600">Detailed insights into your learning progress and patterns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.id}>
            <CardHeader>
              <CardTitle className="text-lg">{metric.category}</CardTitle>
              <CardDescription>{metric.difficulty} level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Recent Accuracy</span>
                    <span className="text-sm text-gray-600">{Math.round(metric.recentAccuracy)}%</span>
                  </div>
                  <Progress value={metric.recentAccuracy} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Mastery Level</span>
                    <span className="text-sm text-gray-600">{metric.masteryLevel}%</span>
                  </div>
                  <Progress value={metric.masteryLevel} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Completion Rate</p>
                    <p className="font-semibold">{Math.round(metric.completionRate * 100)}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Avg. Time/Q</p>
                    <p className="font-semibold">{Math.round(metric.averageTimePerQuestion)}s</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Trend</span>
                  <span className={metric.improvementTrend > 0 ? "text-green-600" : "text-red-600"}>
                    {metric.improvementTrend > 0 ? "↗" : "↘"} 
                    {Math.abs(metric.improvementTrend * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// AI Insights Component
function AIInsights({ metrics, sessions, preferences }: { 
  metrics: PerformanceMetrics[]; 
  sessions: StudySession[];
  preferences: UserPreferences | null;
}) {
  const generateInsights = () => {
    const insights = [];
    
    if (metrics.length > 0) {
      const avgAccuracy = metrics.reduce((acc, m) => acc + m.recentAccuracy, 0) / metrics.length;
      const weakAreas = metrics.filter(m => m.recentAccuracy < 70);
      
      if (avgAccuracy > 85) {
        insights.push({
          type: "success",
          title: "Excellent Progress",
          message: "Your overall performance is outstanding. Consider increasing difficulty levels.",
          icon: CheckCircle2,
          color: "text-green-600"
        });
      }
      
      if (weakAreas.length > 0) {
        insights.push({
          type: "warning",
          title: "Focus Areas Identified",
          message: `Consider spending more time on: ${weakAreas.map(w => w.category).join(", ")}`,
          icon: AlertCircle,
          color: "text-orange-600"
        });
      }
    }

    const completedSessions = sessions.filter(s => s.completed);
    if (completedSessions.length > 5) {
      const avgSessionsPerWeek = completedSessions.length / 4;
      if (avgSessionsPerWeek < 3) {
        insights.push({
          type: "info",
          title: "Study Frequency",
          message: "Consider increasing your study frequency for better retention.",
          icon: TrendingUp,
          color: "text-blue-600"
        });
      }
    }

    if (preferences?.studyIntensity === "light" && metrics.some(m => m.improvementTrend < 0)) {
      insights.push({
        type: "suggestion",
        title: "Intensity Adjustment",
        message: "Your current intensity might be too low. Consider switching to moderate intensity.",
        icon: Target,
        color: "text-purple-600"
      });
    }

    return insights;
  };

  const insights = generateInsights();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">AI-Powered Insights</h2>
        <p className="text-gray-600">Personalized recommendations based on your learning patterns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg bg-gray-100 ${insight.color}`}>
                  <insight.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{insight.title}</h3>
                  <p className="text-gray-600 text-sm">{insight.message}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {insights.length === 0 && (
          <Card className="md:col-span-2">
            <CardContent className="p-6">
              <div className="text-center py-8">
                <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">AI insights will appear as you complete more study sessions</p>
                <p className="text-sm text-gray-400">Continue studying to unlock personalized recommendations</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}