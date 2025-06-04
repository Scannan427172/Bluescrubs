import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ProgressChart } from "@/components/progress-chart";
import { 
  BookOpen, Users, GraduationCap, Play, Clock, CheckCircle, 
  TrendingUp, Calendar, Award, Flame, Heart, Brain, Stethoscope 
} from "lucide-react";
import type { User, UserStats, Question, CommunityPost, StudyPlan } from "@/lib/types";

// Mock user for demo - in real app this would come from auth
const DEMO_USER: User = {
  id: 1,
  email: "demo@example.com",
  username: "Dr. Sarah Ahmed",
  password: "",
  currentStage: "plab1",
  studyStreak: 12,
  totalPoints: 2847,
  createdAt: new Date()
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Fetch user stats
  const { data: userStats } = useQuery<UserStats>({
    queryKey: [`/api/users/${DEMO_USER.id}/stats`],
  });

  // Fetch recent questions for quick practice
  const { data: questions } = useQuery<Question[]>({
    queryKey: [`/api/questions?examType=plab1&limit=5`],
  });

  // Fetch community posts
  const { data: communityPosts } = useQuery<(CommunityPost & { author: { username: string } })[]>({
    queryKey: [`/api/community/posts?limit=3`],
  });

  // Today's date for study plan
  const today = new Date().toISOString().split('T')[0];
  const { data: todaysPlan } = useQuery<StudyPlan>({
    queryKey: [`/api/users/${DEMO_USER.id}/study-plan/${today}`],
  });

  const categoryStats = userStats?.categoryStats || {};
  const topCategories = Object.entries(categoryStats)
    .map(([category, stats]) => ({
      category,
      accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
      total: stats.total
    }))
    .sort((a, b) => b.accuracy - a.accuracy)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-light-bg pb-20 md:pb-0">
      {/* Welcome Hero Section */}
      <section className="bg-gradient-to-br from-medical-blue to-purple-accent text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4" style={{ color: '#000000' }}>
                Welcome back, {DEMO_USER.username.split(' ')[1]}! 👋
              </h1>
              <p className="text-xl mb-8 opacity-90" style={{ color: '#000000' }}>
                Continue your PLAB journey with personalized study plans and comprehensive practice.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="bg-white/10 rounded-lg px-6 py-4" style={{ color: '#000000' }}>
                  <div className="flex items-center space-x-2 mb-1">
                    <Flame className="w-5 h-5 text-amber-warning" />
                    <span className="text-sm font-medium" style={{ color: '#000000' }}>Study Streak</span>
                  </div>
                  <div className="text-2xl font-bold" style={{ color: '#000000' }}>{DEMO_USER.studyStreak} days</div>
                </div>
                <div className="bg-white/10 rounded-lg px-6 py-4" style={{ color: '#000000' }}>
                  <div className="flex items-center space-x-2 mb-1">
                    <Award className="w-5 h-5 text-mint-green" />
                    <span className="text-sm font-medium" style={{ color: '#000000' }}>Total Points</span>
                  </div>
                  <div className="text-2xl font-bold" style={{ color: '#000000' }}>{DEMO_USER.totalPoints.toLocaleString()}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/plab1">
                  <Button className="bg-white text-medical-blue hover:bg-gray-100 font-semibold px-8 py-3" style={{ color: '#2E86AB' }}>
                    Continue Learning
                  </Button>
                </Link>
                <Button variant="outline" className="border-white/30 hover:bg-white/10 px-8 py-3" style={{ color: '#000000', borderColor: '#000000' }}>
                  View Progress
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm" style={{ color: '#000000' }}>
                <h3 className="text-xl font-bold mb-6" style={{ color: '#000000' }}>Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span style={{ color: '#000000' }}>Questions Completed</span>
                    <span className="font-bold" style={{ color: '#000000' }}>{userStats?.totalAnswered || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: '#000000' }}>Accuracy Rate</span>
                    <span className="font-bold" style={{ color: '#000000' }}>
                      {userStats?.totalAnswered ? Math.round((userStats.correctAnswers / userStats.totalAnswered) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: '#000000' }}>Current Focus</span>
                    <Badge className="bg-white/20" style={{ color: '#000000' }}>PLAB 1</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Action Cards */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/plab1">
              <Card className="card-hover cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-medical-blue/10 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-medical-blue" />
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">PLAB 1 MCQs</h3>
                  <p className="text-sm text-gray-600 mb-4">Practice multiple choice questions</p>
                  <div className="flex items-center text-sm text-medical-blue font-medium">
                    <Play className="w-4 h-4 mr-2" />
                    Start Practice
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/plab2">
              <Card className="card-hover cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-deep-rose/10 rounded-lg flex items-center justify-center">
                      <Stethoscope className="w-6 h-6 text-deep-rose" />
                    </div>
                    <Badge variant="outline">Coming Soon</Badge>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">PLAB 2 OSCE</h3>
                  <p className="text-sm text-gray-600 mb-4">Clinical station simulations</p>
                  <div className="flex items-center text-sm text-deep-rose font-medium">
                    <Play className="w-4 h-4 mr-2" />
                    Start OSCE
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Card className="card-hover cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-mint-green" />
                  </div>
                  <Badge variant="secondary">Ready</Badge>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Timed Mock</h3>
                <p className="text-sm text-gray-600 mb-4">Full exam simulation</p>
                <div className="flex items-center text-sm text-mint-green font-medium">
                  <Play className="w-4 h-4 mr-2" />
                  Start Mock
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-accent/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-purple-accent" />
                  </div>
                  <Badge variant="outline">Personal</Badge>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Study Plan</h3>
                <p className="text-sm text-gray-600 mb-4">Your personalized schedule</p>
                <div className="flex items-center text-sm text-purple-accent font-medium">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Plan
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Overview */}
            {userStats && (
              <ProgressChart userStats={userStats} />
            )}

            {/* Study Modules */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Study Modules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* PLAB 1 Module */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-medical-blue/10 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-medical-blue" />
                      </div>
                      <Badge className="bg-medical-blue/10 text-medical-blue">Active</Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">PLAB 1 Practice</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Master MCQs with 3,000+ questions across all medical specialties
                    </p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm font-medium text-medical-blue">68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                    
                    <Link href="/plab1">
                      <Button className="w-full btn-medical">
                        Continue Practice
                      </Button>
                    </Link>
                  </div>

                  {/* PLAB 2 Module */}
                  <div className="border border-gray-200 rounded-lg p-6 opacity-75">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Stethoscope className="w-6 h-6 text-gray-400" />
                      </div>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-500">Locked</Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">PLAB 2 OSCE</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Practice clinical stations with video scenarios and communication skills
                    </p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Requirement</span>
                        <span className="text-sm font-medium text-gray-500">Pass PLAB 1</span>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>
                    
                    <Button disabled className="w-full bg-gray-300 text-gray-500 cursor-not-allowed">
                      Unlock After PLAB 1
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-mint-green/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-mint-green" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Completed Cardiology Quiz</p>
                      <p className="text-sm text-gray-600">Score: 8/10 (80%) • 2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-medical-blue/10 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-medical-blue" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Improved in Respiratory Medicine</p>
                      <p className="text-sm text-gray-600">Accuracy increased to 85% • 1 day ago</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-amber-warning/10 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-amber-warning" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Achieved 10-day Study Streak</p>
                      <p className="text-sm text-gray-600">Keep up the momentum! • 2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Today's Study Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Today's Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-mint-green rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Cardiology MCQs</p>
                      <p className="text-xs text-gray-600">20 questions • Completed ✓</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-medical-blue rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Respiratory MCQs</p>
                      <p className="text-xs text-gray-600">15 questions • In Progress (7/15)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">Review Flashcards</p>
                      <p className="text-xs text-gray-500">Endocrinology • Pending</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">Mock Exam Review</p>
                      <p className="text-xs text-gray-500">Previous errors • Pending</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Daily Progress</span>
                    <span className="text-sm font-medium text-medical-blue">60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Performance by Topic */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Performance by Topic</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCategories.map(({ category, accuracy, total }) => (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          {category === 'cardiology' ? <Heart className="w-4 h-4 text-red-500" /> :
                           category === 'neurology' ? <Brain className="w-4 h-4 text-purple-500" /> :
                           <Stethoscope className="w-4 h-4 text-blue-500" />}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 capitalize">{category}</h4>
                          <p className="text-xs text-gray-600">{total} questions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-semibold ${
                          accuracy >= 85 ? 'text-mint-green' :
                          accuracy >= 70 ? 'text-amber-warning' :
                          'text-deep-rose'
                        }`}>
                          {accuracy}%
                        </div>
                        <div className="w-16 bg-gray-200 rounded-full h-1">
                          <div
                            className={`h-1 rounded-full ${
                              accuracy >= 85 ? 'bg-mint-green' :
                              accuracy >= 70 ? 'bg-amber-warning' :
                              'bg-deep-rose'
                            }`}
                            style={{ width: `${accuracy}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Highlights */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold">Community</CardTitle>
                  <Link href="/community">
                    <Button variant="ghost" size="sm" className="text-medical-blue">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {communityPosts?.slice(0, 2).map((post) => (
                    <div key={post.id} className="border-l-4 border-medical-blue pl-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-900">{post.author.username}</span>
                        <span className="text-xs text-gray-500">2h ago</span>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2">{post.content}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <button className="text-xs text-gray-500 hover:text-medical-blue">
                          👍 {post.likes}
                        </button>
                        <button className="text-xs text-gray-500 hover:text-medical-blue">
                          💬 {post.replies}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link href="/community">
                    <Button variant="outline" className="w-full text-sm">
                      Join Discussion
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
