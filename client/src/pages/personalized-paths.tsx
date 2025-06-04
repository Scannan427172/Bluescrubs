import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Route, MapPin, Target, Calendar, Clock, 
  TrendingUp, CheckCircle, AlertTriangle, Star,
  Brain, BookOpen, Users, Award, Zap
} from "lucide-react";

export default function PersonalizedPaths() {
  const [selectedPath, setSelectedPath] = useState<any>(null);

  const learningPaths = {
    currentPath: {
      id: 1,
      name: "PLAB Success Fast Track",
      type: "Comprehensive",
      duration: "12 weeks",
      difficulty: "Intermediate",
      progress: 67,
      currentWeek: 8,
      estimatedCompletion: "2025-08-15",
      description: "Personalized pathway based on your current knowledge level and exam date",
      features: ["Adaptive difficulty", "Weak area focus", "Time optimization"]
    },
    availablePaths: [
      {
        id: 1,
        name: "PLAB Success Fast Track",
        type: "Comprehensive",
        duration: "12 weeks",
        difficulty: "Intermediate",
        suitableFor: "6+ months medical experience",
        weeklyHours: "15-20 hours",
        successRate: 89,
        description: "Balanced approach covering all topics with adaptive learning",
        milestones: [
          { week: 2, title: "Foundation Knowledge", completed: true },
          { week: 4, title: "Core Systems Mastery", completed: true },
          { week: 6, title: "Clinical Reasoning", completed: true },
          { week: 8, title: "Advanced Topics", completed: false, current: true },
          { week: 10, title: "Mock Examinations", completed: false },
          { week: 12, title: "Final Preparation", completed: false }
        ]
      },
      {
        id: 2,
        name: "Intensive Crash Course",
        type: "Accelerated",
        duration: "6 weeks",
        difficulty: "Advanced",
        suitableFor: "Strong medical background",
        weeklyHours: "25-30 hours",
        successRate: 76,
        description: "High-intensity program for experienced doctors with time constraints",
        milestones: [
          { week: 1, title: "Rapid Assessment", completed: false },
          { week: 2, title: "High-Yield Topics", completed: false },
          { week: 3, title: "Practice Intensive", completed: false },
          { week: 4, title: "Weak Area Blitz", completed: false },
          { week: 5, title: "Mock Marathon", completed: false },
          { week: 6, title: "Final Polish", completed: false }
        ]
      },
      {
        id: 3,
        name: "Foundation Builder",
        type: "Comprehensive",
        duration: "20 weeks",
        difficulty: "Beginner",
        suitableFor: "Recent graduates or career changers",
        weeklyHours: "10-15 hours",
        successRate: 92,
        description: "Thorough foundation building with extensive support and mentoring",
        milestones: [
          { week: 3, title: "Medical Terminology", completed: false },
          { week: 6, title: "Basic Sciences Review", completed: false },
          { week: 9, title: "System by System", completed: false },
          { week: 12, title: "Clinical Application", completed: false },
          { week: 15, title: "Integration Practice", completed: false },
          { week: 18, title: "Mock Examinations", completed: false },
          { week: 20, title: "Confidence Building", completed: false }
        ]
      },
      {
        id: 4,
        name: "OSCE Specialist Track",
        type: "Skills-Focused",
        duration: "8 weeks",
        difficulty: "Intermediate",
        suitableFor: "PLAB 1 passed, focusing on PLAB 2",
        weeklyHours: "12-18 hours",
        successRate: 85,
        description: "Intensive OSCE preparation with video practice and cultural training",
        milestones: [
          { week: 1, title: "Communication Basics", completed: false },
          { week: 2, title: "History Taking Mastery", completed: false },
          { week: 3, title: "Physical Examination", completed: false },
          { week: 4, title: "Data Interpretation", completed: false },
          { week: 5, title: "Practical Procedures", completed: false },
          { week: 6, title: "Cultural Competency", completed: false },
          { week: 7, title: "Mock OSCE Practice", completed: false },
          { week: 8, title: "Performance Optimization", completed: false }
        ]
      }
    ],
    weeklySchedule: [
      {
        day: "Monday",
        focus: "Cardiology & Respiratory",
        activities: [
          { time: "09:00-10:30", activity: "MCQ Practice - Cardiology", type: "practice" },
          { time: "10:45-11:30", activity: "Video OSCE - Chest Pain", type: "osce" },
          { time: "14:00-15:00", activity: "Cultural Training - NHS Structure", type: "cultural" }
        ],
        completed: true
      },
      {
        day: "Tuesday",
        focus: "Neurology & Psychiatry",
        activities: [
          { time: "09:00-10:00", activity: "Adaptive Learning - Neurology", type: "adaptive" },
          { time: "10:15-11:15", activity: "Mock Questions - Psychiatry", type: "practice" },
          { time: "15:00-16:00", activity: "Mentor Session - Communication", type: "mentoring" }
        ],
        completed: true
      },
      {
        day: "Wednesday",
        focus: "Endocrinology & Pharmacology",
        activities: [
          { time: "09:00-10:30", activity: "MCQ Practice - Endocrinology", type: "practice" },
          { time: "10:45-11:30", activity: "Flashcard Review - Pharmacology", type: "review" },
          { time: "14:00-15:30", activity: "Video OSCE - Breaking Bad News", type: "osce" }
        ],
        completed: false,
        current: true
      }
    ]
  };

  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case "practice": return <BookOpen className="w-4 h-4 text-blue-600" />;
      case "osce": return <Users className="w-4 h-4 text-purple-600" />;
      case "cultural": return <MapPin className="w-4 h-4 text-green-600" />;
      case "adaptive": return <Brain className="w-4 h-4 text-red-600" />;
      case "mentoring": return <Users className="w-4 h-4 text-yellow-600" />;
      case "review": return <Target className="w-4 h-4 text-gray-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-700";
      case "Intermediate": return "bg-yellow-100 text-yellow-700";
      case "Advanced": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const switchPath = (path: any) => {
    setSelectedPath(path);
  };

  return (
    <div className="min-h-screen bg-light-bg pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white py-12 border-b" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Route className="w-8 h-8 mr-3 text-indigo-600" />
              <h1 className="text-4xl font-bold" style={{ color: '#000000' }}>Personalized Learning Paths</h1>
            </div>
            <p className="text-xl" style={{ color: '#666666' }}>AI-curated study paths tailored to your background, timeline, and learning style</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Path Overview */}
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-0 mb-8">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#000000' }}>{learningPaths.currentPath.name}</h3>
                <p className="text-gray-700 mb-4">{learningPaths.currentPath.description}</p>
                <div className="flex flex-wrap gap-2">
                  {learningPaths.currentPath.features.map((feature, index) => (
                    <Badge key={index} className="bg-indigo-100 text-indigo-700 text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span style={{ color: '#000000' }}>Progress</span>
                    <span style={{ color: '#666666' }}>Week {learningPaths.currentPath.currentWeek} of {learningPaths.currentPath.duration.split(' ')[0]}</span>
                  </div>
                  <Progress value={learningPaths.currentPath.progress} className="w-full" />
                  <div className="text-sm text-gray-600 mt-1">{learningPaths.currentPath.progress}% complete</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Duration:</span>
                    <div className="font-medium" style={{ color: '#000000' }}>{learningPaths.currentPath.duration}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Est. Completion:</span>
                    <div className="font-medium" style={{ color: '#000000' }}>{learningPaths.currentPath.estimatedCompletion}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Route className="w-4 h-4 mr-2" />
                  Continue Path
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="current" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="current">Current Path</TabsTrigger>
            <TabsTrigger value="schedule">This Week</TabsTrigger>
            <TabsTrigger value="paths">Switch Path</TabsTrigger>
            <TabsTrigger value="progress">Progress Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            <Card className="bg-white border">
              <CardHeader>
                <CardTitle style={{ color: '#000000' }}>Path Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningPaths.availablePaths[0].milestones.map((milestone, index) => (
                    <div key={index} className={`flex items-center space-x-4 p-4 rounded-lg border ${
                      milestone.completed ? 'bg-green-50 border-green-200' : 
                      milestone.current ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                    }`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        milestone.completed ? 'bg-green-500' :
                        milestone.current ? 'bg-blue-500' : 'bg-gray-300'
                      }`}>
                        {milestone.completed ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <span className="text-white font-bold">{milestone.week}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium" style={{ color: '#000000' }}>Week {milestone.week}: {milestone.title}</h4>
                        {milestone.current && (
                          <div className="text-sm text-blue-600 mt-1">Current milestone - 3 days remaining</div>
                        )}
                      </div>
                      {milestone.current && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          Continue
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <div className="space-y-4">
              {learningPaths.weeklySchedule.map((day, index) => (
                <Card key={index} className={`bg-white border ${day.completed ? 'opacity-75' : day.current ? 'ring-2 ring-blue-200' : ''}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg" style={{ color: '#000000' }}>{day.day}</CardTitle>
                        <p className="text-gray-600">Focus: {day.focus}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {day.completed && <CheckCircle className="w-6 h-6 text-green-500" />}
                        {day.current && <Badge className="bg-blue-100 text-blue-700">Today</Badge>}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {day.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="flex items-center space-x-3 p-3 border rounded-lg">
                          {getActivityTypeIcon(activity.type)}
                          <div className="flex-1">
                            <div className="font-medium" style={{ color: '#000000' }}>{activity.activity}</div>
                            <div className="text-sm text-gray-600">{activity.time}</div>
                          </div>
                          <Badge variant="outline" className="text-xs capitalize">
                            {activity.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="paths" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {learningPaths.availablePaths.map((path) => (
                <Card key={path.id} className={`bg-white border ${path.id === learningPaths.currentPath.id ? 'ring-2 ring-indigo-200' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg" style={{ color: '#000000' }}>{path.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge className={getDifficultyColor(path.difficulty)}>
                            {path.difficulty}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {path.duration}
                          </Badge>
                        </div>
                      </div>
                      {path.id === learningPaths.currentPath.id && (
                        <Badge className="bg-indigo-100 text-indigo-700">Current</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{path.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Suitable for:</span>
                          <div className="font-medium" style={{ color: '#000000' }}>{path.suitableFor}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Weekly commitment:</span>
                          <div className="font-medium" style={{ color: '#000000' }}>{path.weeklyHours}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Success rate:</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={path.successRate} className="w-20" />
                          <span className="text-sm font-medium" style={{ color: '#000000' }}>{path.successRate}%</span>
                        </div>
                      </div>
                    </div>

                    <Button 
                      className={`w-full ${
                        path.id === learningPaths.currentPath.id 
                          ? 'bg-indigo-600 hover:bg-indigo-700' 
                          : 'bg-gray-600 hover:bg-gray-700'
                      } text-white`}
                      onClick={() => switchPath(path)}
                      disabled={path.id === learningPaths.currentPath.id}
                    >
                      {path.id === learningPaths.currentPath.id ? 'Current Path' : 'Switch to This Path'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white border">
                <CardHeader>
                  <CardTitle style={{ color: '#000000' }}>Path Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-indigo-600 mb-2">87%</div>
                      <div className="text-sm text-gray-600">Average accuracy on path</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">+23%</div>
                      <div className="text-sm text-gray-600">Improvement since starting</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border">
                <CardHeader>
                  <CardTitle style={{ color: '#000000' }}>Time Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">16.5h</div>
                      <div className="text-sm text-gray-600">Average weekly study time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-2">92%</div>
                      <div className="text-sm text-gray-600">Schedule adherence</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border">
                <CardHeader>
                  <CardTitle style={{ color: '#000000' }}>Predictions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">91%</div>
                      <div className="text-sm text-gray-600">Predicted exam success rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600 mb-2">3 weeks</div>
                      <div className="text-sm text-gray-600">Time to target readiness</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}