import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import StatsCards from "@/components/dashboard/stats-cards";
import StudyPlan from "@/components/dashboard/study-plan";
import ProgressChart from "@/components/dashboard/progress-chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function Dashboard() {
  const { user } = useAuth();

  const { data: topics = [] } = useQuery({
    queryKey: ["/api/topics"],
  });

  const { data: userProgress = [] } = useQuery({
    queryKey: ["/api/users", user?.id, "progress"],
    enabled: !!user?.id,
  });

  if (!user) return null;

  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      
      {/* Welcome Section */}
      <div className="medical-gradient rounded-2xl p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user.firstName}! 👋
            </h1>
            <p className="text-lg opacity-90 mb-4">
              {currentDate} • Ready to continue your PLAB journey?
            </p>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{user.studyStreak}</div>
                <div className="text-sm opacity-80">Day Streak 🔥</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{user.totalPoints}</div>
                <div className="text-sm opacity-80">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {userProgress.reduce((total, p) => total + p.questionsCorrect, 0)}
                </div>
                <div className="text-sm opacity-80">Questions Correct</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/plab1">
              <Button className="bg-white text-primary hover:bg-white/90">
                Continue PLAB 1
              </Button>
            </Link>
            {user.currentStage !== "plab1" && (
              <Link href="/plab2">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Start PLAB 2
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Progress Chart */}
          <ProgressChart />
          
          {/* Study Modules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Study Modules
                <Badge variant="secondary">{user.currentStage.toUpperCase()}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* PLAB 1 Module */}
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="topic-icon bg-primary/10 text-primary">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <Badge 
                        variant={user.currentStage === "plab1" ? "default" : "secondary"}
                      >
                        {user.currentStage === "plab1" ? "ACTIVE" : "COMPLETED"}
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2">PLAB 1 Practice</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Master MCQs with 3,000+ questions across all medical specialties
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">
                          {Math.round((userProgress.length / topics.length) * 100)}%
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill bg-primary"
                          style={{ 
                            width: `${Math.round((userProgress.length / topics.length) * 100)}%` 
                          }}
                        />
                      </div>
                    </div>
                    
                    <Link href="/plab1">
                      <Button className="w-full">
                        {user.currentStage === "plab1" ? "Continue Practice" : "Review"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* PLAB 2 Module */}
                <Card className={`hover:shadow-md transition-shadow ${user.currentStage === "plab1" ? "opacity-60" : ""}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="topic-icon bg-secondary/10 text-secondary">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <Badge 
                        variant={user.currentStage === "plab2" ? "default" : "outline"}
                      >
                        {user.currentStage === "plab1" ? "LOCKED" : "ACTIVE"}
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2">PLAB 2 OSCE</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Practice clinical stations with video scenarios and communication skills
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Stations Completed</span>
                        <span className="font-medium">
                          {user.currentStage === "plab1" ? "0/18" : "12/18"}
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill bg-secondary"
                          style={{ 
                            width: user.currentStage === "plab1" ? "0%" : "67%" 
                          }}
                        />
                      </div>
                    </div>
                    
                    <Link href="/plab2">
                      <Button 
                        className="w-full" 
                        variant={user.currentStage === "plab1" ? "outline" : "default"}
                        disabled={user.currentStage === "plab1"}
                      >
                        {user.currentStage === "plab1" ? "Unlock After PLAB 1" : "Continue OSCE"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Topic Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Topic Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topics.slice(0, 6).map((topic: any) => {
                  const progress = userProgress.find((p: any) => p.topicId === topic.id);
                  const accuracy = progress 
                    ? Math.round((progress.questionsCorrect / progress.questionsAttempted) * 100) 
                    : 0;
                  
                  return (
                    <div key={topic.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center space-x-3">
                        <div className={`topic-icon ${topic.colorClass}`}>
                          <i className={topic.iconClass}></i>
                        </div>
                        <div>
                          <div className="font-medium">{topic.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {progress?.questionsAttempted || 0} questions attempted
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-20 progress-bar">
                          <div 
                            className={`progress-fill ${
                              accuracy >= 80 ? "bg-success" : 
                              accuracy >= 60 ? "bg-warning" : "bg-destructive"
                            }`}
                            style={{ width: `${accuracy}%` }}
                          />
                        </div>
                        <div className="text-sm font-medium w-12 text-right">
                          {accuracy}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <StudyPlan />
          
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/plab1">
                <Button variant="outline" className="w-full justify-start">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Random MCQ Challenge
                </Button>
              </Link>
              
              <Link href="/plab2">
                <Button variant="outline" className="w-full justify-start">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Practice OSCE Station
                </Button>
              </Link>
              
              <Link href="/community">
                <Button variant="outline" className="w-full justify-start">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.5 8H16c-.8 0-1.5.7-1.5 1.5v7c0 1.1.9 2 2 2h2v5h2z"/>
                  </svg>
                  Join Community Discussion
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                  🔥
                </div>
                <div>
                  <div className="font-medium">Study Streak Master</div>
                  <div className="text-sm text-muted-foreground">{user.studyStreak}-day streak!</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                  🏆
                </div>
                <div>
                  <div className="font-medium">Quiz Champion</div>
                  <div className="text-sm text-muted-foreground">100+ questions completed</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  ⭐
                </div>
                <div>
                  <div className="font-medium">Knowledge Seeker</div>
                  <div className="text-sm text-muted-foreground">High accuracy rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
