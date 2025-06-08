import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { User } from "@shared/schema";

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

export default function Dashboard() {
  const user = DEMO_USER;

  const { data: userStats } = useQuery({
    queryKey: ["/api/users", user.id, "stats"],
  });

  const { data: userProgress = [] } = useQuery({
    queryKey: ["/api/users", user.id, "progress"],
  });

  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl p-8 border" style={{ backgroundColor: '#ffffff', color: '#000000' }}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#000000' }}>
              Welcome back, {user.username.split(' ')[1]}! 👋
            </h1>
            <p className="text-lg mb-4" style={{ color: '#000000' }}>
              {currentDate} • Ready to continue your PLAB journey?
            </p>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#000000' }}>{user.studyStreak}</div>
                <div className="text-sm" style={{ color: '#666666' }}>Day Streak 🔥</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#000000' }}>{user.totalPoints}</div>
                <div className="text-sm" style={{ color: '#666666' }}>Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#000000' }}>
                  {(userStats as any)?.correctAnswers || 0}
                </div>
                <div className="text-sm" style={{ color: '#666666' }}>Questions Correct</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/plab1-new">
              <Button id="continue-plab1-btn" className="bg-medical-blue hover:bg-blue-700" style={{ backgroundColor: '#2E86AB' }}>
                Continue PLAB 1
              </Button>
            </Link>
            {user.currentStage !== "plab1" && (
              <Link href="/plab2">
                <Button variant="outline" className="border-gray-300" style={{ color: '#000000', borderColor: '#000000' }}>
                  Start PLAB 2
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: '#666666' }}>Questions Answered</p>
                <p className="text-2xl font-bold" style={{ color: '#000000' }}>{(userStats as any)?.totalAnswered || 0}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span style={{ color: '#2E86AB' }}>📝</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: '#666666' }}>Accuracy Rate</p>
                <p className="text-2xl font-bold" style={{ color: '#000000' }}>
                  {(userStats as any)?.totalAnswered ? Math.round(((userStats as any).correctAnswers / (userStats as any).totalAnswered) * 100) : 0}%
                </p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span style={{ color: '#16a34a' }}>✓</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: '#666666' }}>Study Streak</p>
                <p className="text-2xl font-bold" style={{ color: '#000000' }}>{user.studyStreak} days</p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span style={{ color: '#ea580c' }}>🔥</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: '#666666' }}>Total Points</p>
                <p className="text-2xl font-bold" style={{ color: '#000000' }}>{user.totalPoints}</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span style={{ color: '#9333ea' }}>⭐</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Study Modules */}
      <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between" style={{ color: '#000000' }}>
            Study Modules
            <Badge variant="secondary">{user.currentStage.toUpperCase()}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* PLAB 1 Module */}
            <Card className="hover:shadow-md transition-shadow border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl" style={{ color: '#2E86AB' }}>📚</span>
                  </div>
                  <Badge 
                    variant={user.currentStage === "plab1" ? "default" : "secondary"}
                    className={user.currentStage === "plab1" ? "bg-blue-500 text-white" : ""}
                  >
                    {user.currentStage === "plab1" ? "ACTIVE" : "COMPLETED"}
                  </Badge>
                </div>
                
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#000000' }}>PLAB 1 Practice</h3>
                <p className="text-sm mb-4" style={{ color: '#666666' }}>
                  Master MCQs with 3,000+ questions across all medical specialties
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#666666' }}>Progress</span>
                    <span className="font-medium" style={{ color: '#000000' }}>75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                
                <Link href="/plab1-new">
                  <Button id="continue-practice-btn" className="w-full bg-medical-blue" style={{ backgroundColor: '#2E86AB' }}>
                    {user.currentStage === "plab1" ? "Continue Practice" : "Review"}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* PLAB 2 Module */}
            <Card className={`hover:shadow-md transition-shadow border ${user.currentStage === "plab1" ? "opacity-60" : ""}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl" style={{ color: '#16a34a' }}>🏥</span>
                  </div>
                  <Badge variant={user.currentStage === "plab2" ? "default" : "outline"}>
                    {user.currentStage === "plab1" ? "LOCKED" : "ACTIVE"}
                  </Badge>
                </div>
                
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#000000' }}>PLAB 2 OSCE</h3>
                <p className="text-sm mb-4" style={{ color: '#666666' }}>
                  Practice clinical stations with video scenarios and communication skills
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#666666' }}>Stations Completed</span>
                    <span className="font-medium" style={{ color: '#000000' }}>
                      {user.currentStage === "plab1" ? "0/18" : "12/18"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: user.currentStage === "plab1" ? "0%" : "67%" }}></div>
                  </div>
                </div>
                
                <Link href="/plab2">
                  <Button 
                    className="w-full" 
                    variant={user.currentStage === "plab1" ? "outline" : "default"}
                    disabled={user.currentStage === "plab1"}
                    style={user.currentStage === "plab1" ? { color: '#666666' } : { backgroundColor: '#16a34a', color: 'white' }}
                  >
                    {user.currentStage === "plab1" ? "Unlock After PLAB 1" : "Continue OSCE"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
        <CardHeader>
          <CardTitle style={{ color: '#000000' }}>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Link href="/plab1-new">
            <Button variant="outline" className="w-full justify-start border-gray-300" style={{ color: '#000000' }}>
              <span className="mr-2">🎯</span>
              Random MCQ Challenge
            </Button>
          </Link>
          
          <Link href="/plab2">
            <Button variant="outline" className="w-full justify-start border-gray-300" style={{ color: '#000000' }}>
              <span className="mr-2">🏥</span>
              Practice OSCE Station
            </Button>
          </Link>
          
          <Link href="/community">
            <Button variant="outline" className="w-full justify-start border-gray-300" style={{ color: '#000000' }}>
              <span className="mr-2">💬</span>
              Join Community Discussion
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
