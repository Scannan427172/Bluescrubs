import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Award, Globe, ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface LeaderboardUser {
  id: number;
  username: string;
  country: string;
  city: string;
  flagEmoji: string;
  totalScore: number;
  questionsAnswered: number;
  correctAnswers: number;
  accuracyRate: number;
  studyStreak: number;
  rank: number;
}

export function Top10Leaderboard() {
  const { data: leaderboard, isLoading } = useQuery({
    queryKey: ["/api/scoreboard/global", { limit: 10 }],
    queryFn: async () => {
      const response = await fetch("/api/scoreboard/global?limit=10");
      if (!response.ok) throw new Error("Failed to fetch leaderboard");
      return response.json() as LeaderboardUser[];
    }
  });

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Top 10 Global Leaders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gray-200 rounded"></div>
                  <div className="w-24 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 md:h-6 md:w-6 text-gray-500" />;
    if (rank === 3) return <Award className="h-5 w-5 md:h-6 md:w-6 text-amber-600" />;
    return <span className="text-sm md:text-base font-bold text-gray-800">#{rank}</span>;
  };

  return (
    <Card className="w-full max-w-full overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader className="pb-3 px-3 md:px-6 md:pb-4">
        <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
            <span className="text-sm md:text-base text-blue-900">Top 10 Global Leaders</span>
          </div>
          <Link href="/global-scoreboard">
            <Button variant="outline" size="sm" className="text-xs md:text-sm text-blue-600 border-blue-300 hover:bg-blue-100 w-full sm:w-auto">
              <span className="hidden sm:inline">View Full Leaderboard</span>
              <span className="sm:hidden">Full Leaderboard</span>
              <ArrowRight className="h-3 w-3 md:h-4 md:w-4 ml-1" />
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-3 md:px-6">
        <div className="space-y-1 md:space-y-2">
          {leaderboard?.map((user) => (
            <div
              key={user.id}
              className={`flex items-center justify-between p-2 md:p-3 rounded-lg transition-colors ${
                user.rank <= 3 
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' 
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                <div className="flex items-center justify-center w-6 md:w-8 flex-shrink-0">
                  {getRankIcon(user.rank)}
                </div>
                <div className="flex items-center gap-1 md:gap-2 min-w-0 flex-1">
                  <span className="text-base md:text-xl flex-shrink-0">{user.flagEmoji}</span>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-900 text-sm md:text-base truncate">{user.username}</div>
                    <div className="text-sm text-gray-700 truncate">{user.city}, {user.country}</div>
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-bold text-blue-600 text-sm md:text-base">{user.totalScore.toLocaleString()}</div>
                <div className="text-sm text-gray-700">{user.accuracyRate}% accuracy</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-blue-200">
          <Link href="/global-scoreboard">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Globe className="h-4 w-4 mr-2" />
              View Interactive Global Map
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}