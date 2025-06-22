import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Award, TrendingUp, Users, Calendar, Flag, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LeaderboardEntry {
  userId: number;
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
  countryRank: number;
}

interface WeeklyLeaderboardEntry {
  userId: number;
  username: string;
  country: string;
  flagEmoji: string;
  questionsThisWeek: number;
  correctThisWeek: number;
  studyTimeThisWeek: number;
  weeklyRank: number;
  countryWeeklyRank: number;
}

export default function Leaderboard() {
  const [selectedTab, setSelectedTab] = useState('global');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const { data: globalLeaderboard, isLoading: globalLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ['/api/leaderboard/global'],
  });

  const { data: weeklyLeaderboard, isLoading: weeklyLoading } = useQuery<WeeklyLeaderboardEntry[]>({
    queryKey: ['/api/leaderboard/weekly'],
  });

  const { data: countryLeaderboard, isLoading: countryLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ['/api/leaderboard/country', selectedRegion],
    enabled: selectedRegion !== 'all',
  });

  const { data: blockLeaderboards, isLoading: blockLoading } = useQuery({
    queryKey: ['/api/leaderboard/blocks'],
  });

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />;
    return <span className="h-5 w-5 flex items-center justify-center text-sm font-bold">{rank}</span>;
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600';
    if (accuracy >= 80) return 'text-blue-600';
    if (accuracy >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (rank: number) => {
    if (rank <= 3) return 'default';
    if (rank <= 10) return 'secondary';
    return 'outline';
  };

  const regions = [
    { value: 'all', label: 'Global' },
    { value: 'UK', label: '🇬🇧 United Kingdom' },
    { value: 'IN', label: '🇮🇳 India' },
    { value: 'PK', label: '🇵🇰 Pakistan' },
    { value: 'BD', label: '🇧🇩 Bangladesh' },
    { value: 'NG', label: '🇳🇬 Nigeria' },
    { value: 'EG', label: '🇪🇬 Egypt' },
    { value: 'SA', label: '🇸🇦 Saudi Arabia' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            PLAB 1 Leaderboards
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Compete with medical students worldwide
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="global">Global Rankings</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Champions</TabsTrigger>
            <TabsTrigger value="blocks">Block Challenges</TabsTrigger>
            <TabsTrigger value="regional">Regional</TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  Global Leaderboard
                </CardTitle>
                <CardDescription>
                  Top performers based on overall score, accuracy, and consistency
                </CardDescription>
              </CardHeader>
              <CardContent>
                {globalLoading ? (
                  <div className="space-y-4">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="animate-pulse flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="w-8 h-8 bg-gray-200 rounded"></div>
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {globalLeaderboard?.map((entry, index) => (
                      <div
                        key={entry.userId}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                          entry.rank <= 3
                            ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
                            : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-8">
                            {getRankIcon(entry.rank)}
                          </div>
                          <Avatar>
                            <AvatarFallback>{entry.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {entry.username}
                              </p>
                              <span className="text-lg">{entry.flagEmoji}</span>
                              <Badge variant={getScoreBadgeVariant(entry.rank)}>
                                #{entry.countryRank} in {entry.country}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {entry.city}, {entry.country}
                              </span>
                              <span>{entry.questionsAnswered} questions</span>
                              <span className={getAccuracyColor(entry.accuracyRate)}>
                                {entry.accuracyRate.toFixed(1)}% accuracy
                              </span>
                              <span className="flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" />
                                {entry.studyStreak} day streak
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900 dark:text-white">
                            {entry.totalScore.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">points</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-blue-500" />
                  Weekly Champions
                </CardTitle>
                <CardDescription>
                  Top performers this week - fresh competition every Monday
                </CardDescription>
              </CardHeader>
              <CardContent>
                {weeklyLoading ? (
                  <div className="animate-pulse space-y-4">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="w-8 h-8 bg-gray-200 rounded"></div>
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {weeklyLeaderboard?.map((entry, index) => (
                      <div
                        key={entry.userId}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                          entry.weeklyRank <= 3
                            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
                            : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-8">
                            {getRankIcon(entry.weeklyRank)}
                          </div>
                          <Avatar>
                            <AvatarFallback>{entry.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {entry.username}
                              </p>
                              <span className="text-lg">{entry.flagEmoji}</span>
                              <Badge variant="secondary">
                                #{entry.countryWeeklyRank} in {entry.country}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                              <span>{entry.questionsThisWeek} questions this week</span>
                              <span className={getAccuracyColor((entry.correctThisWeek / entry.questionsThisWeek) * 100)}>
                                {((entry.correctThisWeek / entry.questionsThisWeek) * 100).toFixed(1)}% accuracy
                              </span>
                              <span>{Math.floor(entry.studyTimeThisWeek / 60)}h {entry.studyTimeThisWeek % 60}m studied</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                            {entry.correctThisWeek}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">correct answers</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blocks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Block 1: Speed Challenge</CardTitle>
                  <CardDescription>Fast-paced timed questions</CardDescription>
                </CardHeader>
                <CardContent>
                  {blockLoading ? (
                    <div className="animate-pulse space-y-3">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                          </div>
                          <div className="h-4 bg-gray-200 rounded w-12"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {blockLeaderboards?.block1?.slice(0, 5).map((entry: any, index: number) => (
                        <div key={entry.userId} className="flex items-center justify-between p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                          <div className="flex items-center space-x-2">
                            {getRankIcon(index + 1)}
                            <span className="font-medium text-sm">{entry.username}</span>
                          </div>
                          <Badge variant="outline">{entry.score}</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Block 2: Endurance Test</CardTitle>
                  <CardDescription>Extended practice sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  {blockLoading ? (
                    <div className="animate-pulse space-y-3">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                          </div>
                          <div className="h-4 bg-gray-200 rounded w-12"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {blockLeaderboards?.block2?.slice(0, 5).map((entry: any, index: number) => (
                        <div key={entry.userId} className="flex items-center justify-between p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                          <div className="flex items-center space-x-2">
                            {getRankIcon(index + 1)}
                            <span className="font-medium text-sm">{entry.username}</span>
                          </div>
                          <Badge variant="outline">{entry.score}</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Block 3: Consistency</CardTitle>
                  <CardDescription>Long-term performance</CardDescription>
                </CardHeader>
                <CardContent>
                  {blockLoading ? (
                    <div className="animate-pulse space-y-3">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                          </div>
                          <div className="h-4 bg-gray-200 rounded w-12"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {blockLeaderboards?.block3?.slice(0, 5).map((entry: any, index: number) => (
                        <div key={entry.userId} className="flex items-center justify-between p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                          <div className="flex items-center space-x-2">
                            {getRankIcon(index + 1)}
                            <span className="font-medium text-sm">{entry.username}</span>
                          </div>
                          <Badge variant="outline">{entry.score}</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="regional" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flag className="h-6 w-6 text-green-500" />
                  Regional Leaderboards
                </CardTitle>
                <CardDescription>
                  Compete with students from your region
                </CardDescription>
                <div className="flex flex-wrap gap-2 mt-4">
                  {regions.map((region) => (
                    <Button
                      key={region.value}
                      variant={selectedRegion === region.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedRegion(region.value)}
                    >
                      {region.label}
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                {selectedRegion === 'all' ? (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Select a Region
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Choose a country or region to view local leaderboards
                    </p>
                  </div>
                ) : countryLoading ? (
                  <div className="animate-pulse space-y-4">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="w-8 h-8 bg-gray-200 rounded"></div>
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {countryLeaderboard?.map((entry, index) => (
                      <div
                        key={entry.userId}
                        className="flex items-center justify-between p-4 rounded-lg border bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-8">
                            {getRankIcon(entry.countryRank)}
                          </div>
                          <Avatar>
                            <AvatarFallback>{entry.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {entry.username}
                              </p>
                              <Badge variant="secondary">
                                #{entry.rank} globally
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                              <span>{entry.questionsAnswered} questions</span>
                              <span className={getAccuracyColor(entry.accuracyRate)}>
                                {entry.accuracyRate.toFixed(1)}% accuracy
                              </span>
                              <span>{entry.studyStreak} day streak</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900 dark:text-white">
                            {entry.totalScore.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">points</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}