import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Clock, Target, TrendingUp, Zap, Award } from "lucide-react";
import { useState } from "react";

interface Block1Entry {
  id: number;
  userId: number;
  username: string;
  questionCount: number;
  correctAnswers: number;
  totalTime: number;
  accuracy: number;
  score: number;
  category: string;
  difficulty: string;
  completedAt: string;
}

interface Block2Entry {
  id: number;
  userId: number;
  username: string;
  timeLimit: number;
  questionsCompleted: number;
  correctAnswers: number;
  accuracy: number;
  questionsPerMinute: number;
  score: number;
  category: string;
  difficulty: string;
  completedAt: string;
}

interface Block3Entry {
  id: number;
  userId: number;
  username: string;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  overallAccuracy: number;
  studyStreak: number;
  sessionsCompleted: number;
  score: number;
  lastUpdated: string;
}

export function BlockLeaderboards() {
  const [block1Filter, setBlock1Filter] = useState({ questionCount: 180, category: 'all', difficulty: 'all' });
  const [block2Filter, setBlock2Filter] = useState({ timeLimit: 180, category: 'all', difficulty: 'all' });

  const { data: block1Data } = useQuery({
    queryKey: ['/api/leaderboard/block1', block1Filter.questionCount, { 
      category: block1Filter.category, 
      difficulty: block1Filter.difficulty, 
      limit: 10 
    }],
    enabled: true
  });

  const { data: block2Data } = useQuery({
    queryKey: ['/api/leaderboard/block2', block2Filter.timeLimit, { 
      category: block2Filter.category, 
      difficulty: block2Filter.difficulty, 
      limit: 10 
    }],
    enabled: true
  });

  const { data: block3Data } = useQuery({
    queryKey: ['/api/leaderboard/block3', { limit: 10 }],
    enabled: true
  });

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1: return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2: return <Award className="h-5 w-5 text-gray-400" />;
      case 3: return <Award className="h-5 w-5 text-amber-600" />;
      default: return <span className="h-5 w-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{position}</span>;
    }
  };

  const Block1Leaderboard = ({ entries }: { entries: Block1Entry[] }) => (
    <div className="space-y-4">
      <div className="flex gap-4 mb-4">
        <Select value={block1Filter.questionCount.toString()} onValueChange={(value) => 
          setBlock1Filter(prev => ({ ...prev, questionCount: parseInt(value) }))
        }>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 Questions</SelectItem>
            <SelectItem value="20">20 Questions</SelectItem>
            <SelectItem value="50">50 Questions</SelectItem>
            <SelectItem value="100">100 Questions</SelectItem>
            <SelectItem value="180">180 Questions</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={block1Filter.category} onValueChange={(value) => 
          setBlock1Filter(prev => ({ ...prev, category: value }))
        }>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="cardiology">Cardiology</SelectItem>
            <SelectItem value="respiratory">Respiratory</SelectItem>
            <SelectItem value="neurology">Neurology</SelectItem>
            <SelectItem value="endocrinology">Endocrinology</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {entries?.map((entry, index) => (
          <Card key={entry.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getRankIcon(index + 1)}
                <div>
                  <p className="font-semibold">{entry.username}</p>
                  <p className="text-sm text-muted-foreground">
                    {entry.correctAnswers}/{entry.questionCount} correct • {entry.accuracy.toFixed(1)}%
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{entry.score}</p>
                <p className="text-sm text-muted-foreground">
                  {formatTime(entry.totalTime)}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const Block2Leaderboard = ({ entries }: { entries: Block2Entry[] }) => (
    <div className="space-y-4">
      <div className="flex gap-4 mb-4">
        <Select value={block2Filter.timeLimit.toString()} onValueChange={(value) => 
          setBlock2Filter(prev => ({ ...prev, timeLimit: parseInt(value) }))
        }>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 minutes</SelectItem>
            <SelectItem value="30">30 minutes</SelectItem>
            <SelectItem value="60">1 hour</SelectItem>
            <SelectItem value="120">2 hours</SelectItem>
            <SelectItem value="180">3 hours</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={block2Filter.category} onValueChange={(value) => 
          setBlock2Filter(prev => ({ ...prev, category: value }))
        }>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="cardiology">Cardiology</SelectItem>
            <SelectItem value="respiratory">Respiratory</SelectItem>
            <SelectItem value="neurology">Neurology</SelectItem>
            <SelectItem value="endocrinology">Endocrinology</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {entries?.map((entry, index) => (
          <Card key={entry.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getRankIcon(index + 1)}
                <div>
                  <p className="font-semibold">{entry.username}</p>
                  <p className="text-sm text-muted-foreground">
                    {entry.questionsCompleted} questions • {entry.accuracy.toFixed(1)}% accuracy
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {entry.questionsPerMinute.toFixed(1)} q/min
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{entry.score}</p>
                <Badge variant="secondary">
                  <Zap className="h-3 w-3 mr-1" />
                  Speed Bonus
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const Block3Leaderboard = ({ entries }: { entries: Block3Entry[] }) => (
    <div className="space-y-2">
      {entries?.map((entry, index) => (
        <Card key={entry.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getRankIcon(index + 1)}
              <div>
                <p className="font-semibold">{entry.username}</p>
                <p className="text-sm text-muted-foreground">
                  {entry.totalCorrectAnswers} correct answers • {entry.overallAccuracy.toFixed(1)}% accuracy
                </p>
                <p className="text-xs text-muted-foreground">
                  {entry.studyStreak} day streak • {entry.sessionsCompleted} sessions
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">{entry.score}</p>
              <Badge variant="secondary">
                <TrendingUp className="h-3 w-3 mr-1" />
                Consistency
              </Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">PLAB 1 Leaderboards</h1>
        <p className="text-muted-foreground">
          Three different leaderboards measuring accuracy, speed, and consistency
        </p>
      </div>

      <Tabs defaultValue="block1" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="block1" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Fixed Sets
          </TabsTrigger>
          <TabsTrigger value="block2" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Timed Challenges
          </TabsTrigger>
          <TabsTrigger value="block3" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Study Marathon
          </TabsTrigger>
        </TabsList>

        <TabsContent value="block1" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Block 1: Fixed Sets
              </CardTitle>
              <CardDescription>
                Scoring: (Accuracy% × 100) + Speed Bonus. Perfect accuracy with fast completion wins.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Block1Leaderboard entries={block1Data?.leaderboard || []} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="block2" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Block 2: Timed Challenges
              </CardTitle>
              <CardDescription>
                Scoring: (Questions Completed × Accuracy%) + Speed Multiplier. Endurance and speed matter.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Block2Leaderboard entries={block2Data?.leaderboard || []} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="block3" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Block 3: Study Marathon
              </CardTitle>
              <CardDescription>
                Scoring: Total Correct Answers + Consistency Bonus (10 pts per day streak). Long-term dedication wins.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Block3Leaderboard entries={block3Data?.leaderboard || []} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}