import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Trophy, Users, Clock, TrendingUp, MapPin, Crown, Medal, Award, List } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";


interface ScoreboardUser {
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
  totalStudyTime: number;
  rank: number;
  countryRank: number;
  lastActive: string;
  plabCategory: string;
}

interface CountryStats {
  country: string;
  flagEmoji: string;
  totalUsers: number;
  activeUsers: number;
  averageScore: number;
  topUserScore: number;
  totalQuestionsAnswered: number;
}

interface WeeklyLeader {
  id: number;
  username: string;
  country: string;
  flagEmoji: string;
  questionsThisWeek: number;
  correctThisWeek: number;
  studyTimeThisWeek: number;
  weeklyRank: number;
}

export default function GlobalScoreboard() {
  const [viewMode, setViewMode] = useState<'list' | 'globe'>('list');
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [locationPermission, setLocationPermission] = useState<string>("pending");
  const [userLocation, setUserLocation] = useState<{ country: string; city: string; flag: string } | null>(null);
  const [displayCount, setDisplayCount] = useState(20);
  
  const queryClient = useQueryClient();

  // Auto-scroll to globe when reaching end of leaderboard
  useEffect(() => {
    const handleScroll = () => {
      const leaderboardElement = document.getElementById('global-leaderboard');
      const globeElement = document.getElementById('interactive-globe');
      
      if (!leaderboardElement || !globeElement) return;
      
      const leaderboardRect = leaderboardElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // If user has scrolled past the bottom of the leaderboard
      if (leaderboardRect.bottom < windowHeight * 0.3) {
        globeElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayCount]);

  // Get user's location
  useEffect(() => {
    const getUserLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              
              // Use reverse geocoding to get country and city
              try {
                const response = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                );
                const data = await response.json();
                
                const locationData = {
                  country: data.countryName || "Unknown",
                  city: data.city || data.locality || "Unknown",
                  flag: getCountryFlag(data.countryCode || "")
                };
                
                setUserLocation(locationData);
                setLocationPermission("granted");
                
                // Update user's location in database
                await apiRequest("/api/users/location", {
                  method: "POST",
                  body: JSON.stringify(locationData)
                });
                
              } catch (error) {
                console.error("Geocoding error:", error);
                setLocationPermission("denied");
              }
            },
            (error) => {
              console.error("Geolocation error:", error);
              setLocationPermission("denied");
            }
          );
        } else {
          setLocationPermission("unavailable");
        }
      } catch (error) {
        console.error("Location error:", error);
        setLocationPermission("denied");
      }
    };

    getUserLocation();
  }, []);

  // Fetch global scoreboard data
  const { data: globalScoreboard, isLoading: scoreboardLoading } = useQuery({
    queryKey: ["/api/scoreboard/global", selectedCategory, selectedCountry],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Fetch weekly leaderboard
  const { data: weeklyLeaderboard, isLoading: weeklyLoading } = useQuery({
    queryKey: ["/api/scoreboard/weekly", selectedCountry],
    refetchInterval: 30000,
  });

  // Fetch country statistics
  const { data: countryStats, isLoading: countryLoading } = useQuery({
    queryKey: ["/api/scoreboard/countries"],
    refetchInterval: 60000, // Refresh every minute
  });

  // Update location mutation
  const updateLocationMutation = useMutation({
    mutationFn: async (location: { country: string; city: string; flag: string }) => {
      return apiRequest("/api/users/location", {
        method: "POST",
        body: JSON.stringify(location)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/scoreboard/global"] });
      queryClient.invalidateQueries({ queryKey: ["/api/scoreboard/countries"] });
    }
  });

  const getCountryFlag = (countryCode: string): string => {
    const flags: Record<string, string> = {
      'US': '🇺🇸', 'GB': '🇬🇧', 'CA': '🇨🇦', 'AU': '🇦🇺', 'DE': '🇩🇪', 'FR': '🇫🇷', 'IT': '🇮🇹', 'ES': '🇪🇸',
      'IN': '🇮🇳', 'PK': '🇵🇰', 'BD': '🇧🇩', 'NG': '🇳🇬', 'EG': '🇪🇬', 'ZA': '🇿🇦', 'KE': '🇰🇪', 'GH': '🇬🇭',
      'JP': '🇯🇵', 'CN': '🇨🇳', 'KR': '🇰🇷', 'TH': '🇹🇭', 'MY': '🇲🇾', 'SG': '🇸🇬', 'PH': '🇵🇭', 'ID': '🇮🇩',
      'BR': '🇧🇷', 'MX': '🇲🇽', 'AR': '🇦🇷', 'CL': '🇨🇱', 'PE': '🇵🇪', 'CO': '🇨🇴', 'RU': '🇷🇺', 'TR': '🇹🇷',
      'IR': '🇮🇷', 'SA': '🇸🇦', 'AE': '🇦🇪', 'JO': '🇯🇴', 'LB': '🇱🇧', 'IQ': '🇮🇶', 'SY': '🇸🇾', 'YE': '🇾🇪',
      'NL': '🇳🇱', 'BE': '🇧🇪', 'CH': '🇨🇭', 'AT': '🇦🇹', 'SE': '🇸🇪', 'NO': '🇳🇴', 'DK': '🇩🇰', 'FI': '🇫🇮'
    };
    return flags[countryCode] || '🌍';
  };

  const getRankDisplay = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />;
    return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Active now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return `${Math.floor(diffInDays / 7)}w ago`;
  };

  if (scoreboardLoading || weeklyLoading || countryLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded-md w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Globe className="w-8 h-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">Global PLAB Scoreboard</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Connect with PLAB candidates worldwide. See how you rank globally and in your country.
        </p>
      </div>

      {/* Location Status */}
      <div className="space-y-4">
        {locationPermission === "pending" && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 text-blue-700">
                <MapPin className="w-5 h-5" />
                <span>Detecting your location to show you on the global map...</span>
              </div>
            </CardContent>
          </Card>
        )}

        {locationPermission === "granted" && userLocation && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 text-green-700">
                <MapPin className="w-5 h-5" />
                <span>
                  {userLocation.flag} You're studying from {userLocation.city}, {userLocation.country}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {locationPermission === "denied" && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 text-yellow-700">
                <MapPin className="w-5 h-5" />
                <span>Enable location to appear on the global scoreboard</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>



      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Global Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {countryStats?.reduce((sum: number, country: CountryStats) => sum + country.totalUsers, 0) || 0}
            </div>
            <p className="text-sm text-gray-500">Active candidates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Countries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {countryStats?.length || 0}
            </div>
            <p className="text-sm text-gray-500">Represented globally</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Questions Solved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {countryStats?.reduce((sum: number, country: CountryStats) => sum + country.totalQuestionsAnswered, 0).toLocaleString() || 0}
            </div>
            <p className="text-sm text-gray-500">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Study Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {Math.round((globalScoreboard?.reduce((sum: number, user: ScoreboardUser) => sum + user.totalStudyTime, 0) || 0) / 60).toLocaleString()}h
            </div>
            <p className="text-sm text-gray-500">Combined effort</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <div className="flex gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            size="sm"
          >
            All Categories
          </Button>
          <Button
            variant={selectedCategory === "plab1" ? "default" : "outline"}
            onClick={() => setSelectedCategory("plab1")}
            size="sm"
          >
            PLAB 1
          </Button>
          <Button
            variant={selectedCategory === "plab2" ? "default" : "outline"}
            onClick={() => setSelectedCategory("plab2")}
            size="sm"
          >
            PLAB 2
          </Button>
        </div>

        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="all">All Countries</option>
          {countryStats?.map((country: CountryStats) => (
            <option key={country.country} value={country.country}>
              {country.flagEmoji} {country.country}
            </option>
          ))}
        </select>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Leaderboard Tabs */}
        <Tabs defaultValue="global" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="global">Global Leaderboard</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Champions</TabsTrigger>
            <TabsTrigger value="countries">Country Rankings</TabsTrigger>
          </TabsList>

        <TabsContent value="global" className="space-y-6">
          <Card id="global-leaderboard">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Global Rankings
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Show top:</span>
                  <Select value={displayCount.toString()} onValueChange={(value) => setDisplayCount(parseInt(value))}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="40">40</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {globalScoreboard?.slice(0, displayCount).map((user: ScoreboardUser, index: number) => (
                  <div
                    key={user.id}
                    className={`p-4 rounded-lg border ${
                      index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="flex items-center justify-center w-10 h-10 flex-shrink-0">
                          {getRankDisplay(user.rank)}
                        </div>
                        
                        <div className="flex flex-col min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900 truncate">{user.username}</span>
                            <Badge variant="outline" className="text-xs flex-shrink-0">
                              {user.plabCategory.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <span>{user.flagEmoji}</span>
                            <span className="truncate">{user.city}, {user.country}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-3">
                        <div className="text-xl font-bold text-blue-600">{user.totalScore.toLocaleString()}</div>
                        <div className="text-sm font-semibold text-green-600">{user.accuracyRate}%</div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Show indicator if there are more users beyond display count */}
                {globalScoreboard && globalScoreboard.length > displayCount && (
                  <div className="text-center p-4 border-t border-gray-200 bg-gradient-to-b from-transparent to-blue-50">
                    <p className="text-sm text-gray-600 mb-2">
                      Showing top {displayCount} of {globalScoreboard.length} users
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        document.getElementById('interactive-globe')?.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }}
                      className="flex items-center gap-2"
                    >
                      <Globe className="w-4 h-4" />
                      View All on Globe
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                This Week's Champions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyLeaderboard?.map((user: WeeklyLeader, index: number) => (
                  <div
                    key={user.id}
                    className={`p-4 rounded-lg border ${
                      index < 3 ? 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="flex items-center justify-center w-10 h-10 flex-shrink-0">
                          {getRankDisplay(user.weeklyRank)}
                        </div>
                        
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="font-semibold text-gray-900 truncate">{user.username}</span>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <span>{user.flagEmoji}</span>
                            <span className="truncate">{user.country}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-3">
                        <div className="text-lg font-bold text-blue-600">{user.questionsThisWeek}</div>
                        <div className="text-sm font-semibold text-green-600">
                          {Math.round((user.correctThisWeek / user.questionsThisWeek) * 100) || 0}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="countries" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-500" />
                Country Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {countryStats?.map((country: CountryStats) => (
                  <Card key={country.country} className="border border-gray-200">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{country.flagEmoji}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{country.country}</h3>
                          <p className="text-sm text-gray-600">{country.totalUsers} users</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Average Score</span>
                          <span className="font-medium">{Math.round(country.averageScore)}</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Top Score</span>
                          <span className="font-medium text-green-600">{country.topUserScore}</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Active Users</span>
                          <span className="font-medium">{country.activeUsers}</span>
                        </div>
                        
                        <Progress 
                          value={(country.activeUsers / country.totalUsers) * 100} 
                          className="h-2"
                        />
                        
                        <div className="text-xs text-gray-500">
                          {country.totalQuestionsAnswered.toLocaleString()} questions solved
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}