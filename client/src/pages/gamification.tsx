import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Star, Target, Flame, Medal, Crown, Zap, BookOpen, Users, Calendar } from "lucide-react";

export default function Gamification() {
  const [selectedAchievement, setSelectedAchievement] = useState(0);

  const userStats = {
    level: 12,
    xp: 8450,
    xpToNext: 1550,
    streak: 15,
    totalQuestions: 2847,
    accuracy: 82,
    rank: 156,
    badges: 23
  };

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first 10 questions",
      icon: Target,
      category: "Progress",
      points: 100,
      completed: true,
      progress: 100,
      rarity: "common"
    },
    {
      id: 2,
      title: "Study Streak Master",
      description: "Maintain a 7-day study streak",
      icon: Flame,
      category: "Consistency",
      points: 250,
      completed: true,
      progress: 100,
      rarity: "uncommon"
    },
    {
      id: 3,
      title: "Cardiology Expert",
      description: "Achieve 90% accuracy in 100 cardiology questions",
      icon: Medal,
      category: "Mastery",
      points: 500,
      completed: true,
      progress: 100,
      rarity: "rare"
    },
    {
      id: 4,
      title: "Speed Demon",
      description: "Answer 50 questions in under 30 minutes",
      icon: Zap,
      category: "Speed",
      points: 300,
      completed: false,
      progress: 76,
      rarity: "uncommon"
    },
    {
      id: 5,
      title: "PLAB Perfectionist",
      description: "Score 100% on a 50-question practice exam",
      icon: Crown,
      category: "Excellence",
      points: 1000,
      completed: false,
      progress: 0,
      rarity: "legendary"
    },
    {
      id: 6,
      title: "Knowledge Seeker",
      description: "Complete 1000 questions across all specialties",
      icon: BookOpen,
      category: "Volume",
      points: 750,
      completed: false,
      progress: 85,
      rarity: "epic"
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Dr. Ahmed Hassan", points: 15420, level: 28, streak: 45, badge: "👑" },
    { rank: 2, name: "Dr. Maria Rodriguez", points: 14850, level: 26, streak: 32, badge: "🥈" },
    { rank: 3, name: "Dr. James Chen", points: 14200, level: 25, streak: 28, badge: "🥉" },
    { rank: 4, name: "Dr. Priya Patel", points: 13900, level: 24, streak: 31, badge: "⭐" },
    { rank: 5, name: "Dr. Sarah Johnson", points: 13450, level: 23, streak: 19, badge: "⭐" },
    { rank: 156, name: "You", points: 8450, level: 12, streak: 15, badge: "🔥", isUser: true }
  ];

  const challenges = [
    {
      title: "Weekly Challenge: Respiratory Master",
      description: "Complete 100 respiratory questions this week",
      progress: 67,
      target: 100,
      timeLeft: "3 days",
      reward: "500 XP + Respiratory Badge",
      difficulty: "Medium"
    },
    {
      title: "Speed Challenge: Quick Fire",
      description: "Answer 25 questions in 15 minutes",
      progress: 0,
      target: 25,
      timeLeft: "Available now",
      reward: "300 XP + Speed Badge",
      difficulty: "Hard"
    },
    {
      title: "Monthly Goal: Study Consistency",
      description: "Study for 20 days this month",
      progress: 15,
      target: 20,
      timeLeft: "12 days",
      reward: "1000 XP + Consistency Master Badge",
      difficulty: "Easy"
    }
  ];

  const dailyTasks = [
    { task: "Complete 30 questions", progress: 24, target: 30, points: 50, completed: false },
    { task: "Study for 1 hour", progress: 45, target: 60, points: 25, completed: false },
    { task: "Review 5 incorrect answers", progress: 5, target: 5, points: 30, completed: true },
    { task: "Practice 1 OSCE station", progress: 0, target: 1, points: 40, completed: false }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'uncommon': return 'text-green-600 bg-green-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-600" />
            <h1 className="text-3xl font-bold text-gray-900">Achievements & Gamification</h1>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Track your progress, earn achievements, and compete with fellow PLAB candidates. 
            Stay motivated with our comprehensive gamification system.
          </p>
        </div>

        {/* User Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">Level {userStats.level}</div>
              <div className="text-sm text-gray-600 mb-3">{userStats.xp} / {userStats.xp + userStats.xpToNext} XP</div>
              <Progress value={(userStats.xp / (userStats.xp + userStats.xpToNext)) * 100} className="h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Flame className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.streak}</div>
              <div className="text-gray-600">Day Streak</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.accuracy}%</div>
              <div className="text-gray-600">Accuracy</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Crown className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">#{userStats.rank}</div>
              <div className="text-gray-600">Global Rank</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="achievements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="daily">Daily Tasks</TabsTrigger>
          </TabsList>

          {/* Achievements */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card 
                  key={achievement.id}
                  className={`cursor-pointer transition-all ${
                    achievement.completed ? 'bg-green-50 border-green-200' : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedAchievement(achievement.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <achievement.icon className={`w-8 h-8 ${
                        achievement.completed ? 'text-green-600' : 'text-gray-400'
                      }`} />
                      <Badge className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{achievement.category}</Badge>
                        <span className="font-bold text-yellow-600">+{achievement.points} XP</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Challenges */}
          <TabsContent value="challenges" className="space-y-6">
            <div className="space-y-4">
              {challenges.map((challenge, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{challenge.title}</h3>
                        <p className="text-gray-600 mb-3">{challenge.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <Badge variant={
                            challenge.difficulty === 'Easy' ? 'secondary' :
                            challenge.difficulty === 'Medium' ? 'default' : 'destructive'
                          }>
                            {challenge.difficulty}
                          </Badge>
                          <span className="text-gray-600">⏰ {challenge.timeLeft}</span>
                          <span className="text-yellow-600 font-medium">🎁 {challenge.reward}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress: {challenge.progress} / {challenge.target}</span>
                        <span>{Math.round((challenge.progress / challenge.target) * 100)}%</span>
                      </div>
                      <Progress value={(challenge.progress / challenge.target) * 100} className="h-3" />
                      <Button className="w-full mt-3">
                        {challenge.progress === 0 ? 'Start Challenge' : 'Continue Challenge'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Leaderboard */}
          <TabsContent value="leaderboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Global Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((user) => (
                    <div 
                      key={user.rank}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        user.isUser ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold">
                          {user.rank <= 3 ? user.badge : user.rank}
                        </div>
                        <div>
                          <h4 className={`font-medium ${user.isUser ? 'text-blue-900' : ''}`}>
                            {user.name}
                          </h4>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>Level {user.level}</span>
                            <span>🔥 {user.streak} days</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{user.points}</div>
                        <div className="text-sm text-gray-600">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Daily Tasks */}
          <TabsContent value="daily" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Today's Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dailyTasks.map((task, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      task.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{task.task}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-600 font-medium">+{task.points} XP</span>
                          {task.completed && <Star className="w-4 h-4 text-green-600 fill-current" />}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{task.progress} / {task.target}</span>
                          <span>{Math.round((task.progress / task.target) * 100)}%</span>
                        </div>
                        <Progress value={(task.progress / task.target) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Daily Bonus Progress</h4>
                  <div className="flex justify-between text-sm text-blue-700 mb-1">
                    <span>Complete all tasks for bonus XP</span>
                    <span>1/4 completed</span>
                  </div>
                  <Progress value={25} className="h-2" />
                  <div className="text-sm text-blue-600 mt-2">Bonus: +100 XP</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}