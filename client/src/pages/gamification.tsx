import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, Star, Target, Zap, Award, Crown,
  Flame, Shield, Gem, Users, Calendar, CheckCircle
} from "lucide-react";

export default function Gamification() {
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);

  const gamificationData = {
    playerProfile: {
      level: 23,
      xp: 15750,
      xpToNext: 2250,
      title: "PLAB Scholar",
      rank: "Silver",
      totalPoints: 8940,
      streak: 12,
      badges: 15,
      completedChallenges: 8
    },
    achievements: [
      {
        id: 1,
        title: "First Steps",
        description: "Complete your first 10 questions",
        icon: "🚀",
        category: "milestone",
        points: 100,
        rarity: "common",
        completed: true,
        completedDate: "2025-05-15",
        progress: 100
      },
      {
        id: 2,
        title: "Streak Master",
        description: "Maintain a 7-day study streak",
        icon: "🔥",
        category: "consistency",
        points: 500,
        rarity: "rare",
        completed: true,
        completedDate: "2025-05-28",
        progress: 100
      },
      {
        id: 3,
        title: "Cardiology Specialist",
        description: "Achieve 90% accuracy in cardiology (25/25)",
        icon: "❤️",
        category: "mastery",
        points: 750,
        rarity: "epic",
        completed: false,
        progress: 72
      },
      {
        id: 4,
        title: "Community Helper",
        description: "Help 5 fellow students in community",
        icon: "🤝",
        category: "social",
        points: 300,
        rarity: "uncommon",
        completed: true,
        completedDate: "2025-06-01",
        progress: 100
      },
      {
        id: 5,
        title: "Speed Demon",
        description: "Answer 20 questions in under 15 minutes",
        icon: "⚡",
        category: "performance",
        points: 400,
        rarity: "rare",
        completed: false,
        progress: 60
      },
      {
        id: 6,
        title: "Knowledge Vault",
        description: "Complete 500 total questions",
        icon: "📚",
        category: "milestone",
        points: 1000,
        rarity: "legendary",
        completed: false,
        progress: 85
      }
    ],
    challenges: [
      {
        id: 1,
        title: "Weekly Warrior",
        description: "Complete 50 questions this week",
        timeLeft: "3 days",
        progress: 34,
        target: 50,
        reward: "250 XP + Warrior Badge",
        difficulty: "Medium",
        participants: 847
      },
      {
        id: 2,
        title: "Perfect Week",
        description: "Achieve 95%+ accuracy for 7 consecutive days",
        timeLeft: "5 days",
        progress: 3,
        target: 7,
        reward: "500 XP + Perfectionist Badge",
        difficulty: "Hard",
        participants: 234
      },
      {
        id: 3,
        title: "OSCE Champion",
        description: "Complete 5 video OSCE stations with 80%+ scores",
        timeLeft: "6 days",
        progress: 2,
        target: 5,
        reward: "750 XP + Champion Crown",
        difficulty: "Expert",
        participants: 156
      }
    ],
    leaderboard: [
      { rank: 1, name: "Dr. Aisha Khan", points: 12450, level: 28, badge: "👑" },
      { rank: 2, name: "Dr. Michael Chen", points: 11890, level: 27, badge: "🥈" },
      { rank: 3, name: "Dr. Sarah Ahmed", points: 11340, level: 26, badge: "🥉" },
      { rank: 4, name: "Dr. Raj Patel", points: 10220, level: 24, badge: "⭐" },
      { rank: 5, name: "You", points: 8940, level: 23, badge: "🔥", highlight: true },
      { rank: 6, name: "Dr. Emma Wilson", points: 8750, level: 22, badge: "💎" },
      { rank: 7, name: "Dr. Ahmed Hassan", points: 8340, level: 22, badge: "🎯" }
    ]
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-gray-100 text-gray-700 border-gray-300";
      case "uncommon": return "bg-green-100 text-green-700 border-green-300";
      case "rare": return "bg-blue-100 text-blue-700 border-blue-300";
      case "epic": return "bg-purple-100 text-purple-700 border-purple-300";
      case "legendary": return "bg-yellow-100 text-yellow-700 border-yellow-300";
      default: return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Hard": return "bg-red-100 text-red-700";
      case "Expert": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-light-bg pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 mr-3" />
              <h1 className="text-4xl font-bold">Achievement Center</h1>
            </div>
            <p className="text-xl opacity-90">Level up your PLAB preparation with challenges, achievements, and rewards</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Player Profile */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-0 mb-8">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold" style={{ color: '#000000' }}>{gamificationData.playerProfile.title}</h3>
                <Badge className="mt-2 bg-purple-100 text-purple-700">Level {gamificationData.playerProfile.level}</Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span style={{ color: '#000000' }}>Experience Points</span>
                    <span style={{ color: '#666666' }}>{gamificationData.playerProfile.xp} XP</span>
                  </div>
                  <Progress value={(gamificationData.playerProfile.xp / (gamificationData.playerProfile.xp + gamificationData.playerProfile.xpToNext)) * 100} className="w-full" />
                  <div className="text-sm text-gray-600 mt-1">{gamificationData.playerProfile.xpToNext} XP to level {gamificationData.playerProfile.level + 1}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{gamificationData.playerProfile.totalPoints}</div>
                  <div className="text-sm text-gray-600">Total Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{gamificationData.playerProfile.streak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{gamificationData.playerProfile.badges}</div>
                  <div className="text-sm text-gray-600">Badges</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{gamificationData.playerProfile.completedChallenges}</div>
                  <div className="text-sm text-gray-600">Challenges</div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <Button id="view-full-profile-btn" className="btn-medical">
                  <Trophy className="w-4 h-4 mr-2" />
                  View Full Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="achievements" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="challenges">Active Challenges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="rewards">Reward Shop</TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gamificationData.achievements.map((achievement) => (
                <Card key={achievement.id} className={`bg-white border ${achievement.completed ? 'ring-2 ring-green-200' : ''}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`text-3xl ${achievement.completed ? 'grayscale-0' : 'grayscale'}`}>
                          {achievement.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg" style={{ color: '#000000' }}>{achievement.title}</CardTitle>
                          <Badge className={`${getRarityColor(achievement.rarity)} border text-xs mt-1`}>
                            {achievement.rarity}
                          </Badge>
                        </div>
                      </div>
                      {achievement.completed && <CheckCircle className="w-6 h-6 text-green-500" />}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{achievement.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium" style={{ color: '#000000' }}>Progress</span>
                        <span className="text-sm" style={{ color: '#666666' }}>{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="w-full" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium" style={{ color: '#000000' }}>Reward</span>
                        <Badge className="bg-yellow-100 text-yellow-700">
                          <Star className="w-3 h-3 mr-1" />
                          {achievement.points} XP
                        </Badge>
                      </div>

                      {achievement.completed && (
                        <div className="text-center mt-4">
                          <Badge className="bg-green-100 text-green-700">
                            Completed {achievement.completedDate}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <div className="space-y-6">
              {gamificationData.challenges.map((challenge) => (
                <Card key={challenge.id} className="bg-white border">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-4 gap-6">
                      <div className="md:col-span-2">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Target className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold" style={{ color: '#000000' }}>{challenge.title}</h3>
                            <Badge className={getDifficultyColor(challenge.difficulty)}>
                              {challenge.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">{challenge.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{challenge.timeLeft} left</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{challenge.participants} participants</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-center mb-4">
                          <div className="text-3xl font-bold text-blue-600 mb-1">
                            {challenge.progress}/{challenge.target}
                          </div>
                          <div className="text-sm text-gray-600">Progress</div>
                        </div>
                        <Progress value={(challenge.progress / challenge.target) * 100} className="w-full" />
                      </div>

                      <div className="flex flex-col justify-between">
                        <div className="text-center mb-4">
                          <div className="text-sm font-medium mb-2" style={{ color: '#000000' }}>Reward</div>
                          <Badge className="bg-yellow-100 text-yellow-700 text-xs">
                            {challenge.reward}
                          </Badge>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          Join Challenge
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="bg-white border">
              <CardHeader>
                <CardTitle style={{ color: '#000000' }}>Global Leaderboard - This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {gamificationData.leaderboard.map((player) => (
                    <div 
                      key={player.rank} 
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        player.highlight ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          player.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                          player.rank === 2 ? 'bg-gray-100 text-gray-700' :
                          player.rank === 3 ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {player.rank}
                        </div>
                        <div className="text-2xl">{player.badge}</div>
                        <div>
                          <div className={`font-medium ${player.highlight ? 'text-blue-700' : ''}`} style={{ color: player.highlight ? '#1d4ed8' : '#000000' }}>
                            {player.name}
                          </div>
                          <div className="text-sm text-gray-600">Level {player.level}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold" style={{ color: '#000000' }}>{player.points.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <Card className="bg-white border">
              <CardHeader>
                <CardTitle style={{ color: '#000000' }}>Reward Shop</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Gem className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4" style={{ color: '#000000' }}>Reward Shop Coming Soon</h3>
                  <p className="text-gray-600 mb-6">Exchange your points for premium features, custom themes, and exclusive content</p>
                  <div className="text-2xl font-bold text-purple-600 mb-2">{gamificationData.playerProfile.totalPoints}</div>
                  <div className="text-sm text-gray-600">Points Available</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}