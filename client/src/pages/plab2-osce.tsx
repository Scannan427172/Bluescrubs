import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OsceStationComponent } from "@/components/osce-station";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  Stethoscope, Play, Clock, Users, Video, Mic, 
  CheckCircle, Star, Calendar, Award 
} from "lucide-react";
import type { OsceStation, UserOsceAttempt, OsceAttemptData } from "@/lib/types";

// Mock user ID for demo
const DEMO_USER_ID = 1;

export default function Plab2Osce() {
  const [activeStation, setActiveStation] = useState<OsceStation | null>(null);

  // Fetch OSCE stations
  const { data: stations, isLoading: stationsLoading } = useQuery<OsceStation[]>({
    queryKey: ['/api/osce/stations'],
  });

  // Fetch user's OSCE attempts
  const { data: userAttempts } = useQuery<UserOsceAttempt[]>({
    queryKey: [`/api/users/${DEMO_USER_ID}/osce-attempts`],
  });

  // Submit OSCE attempt mutation
  const submitAttemptMutation = useMutation({
    mutationFn: async (attemptData: OsceAttemptData) => {
      return apiRequest('POST', `/api/users/${DEMO_USER_ID}/osce-attempts`, {
        stationId: attemptData.stationId,
        score: 75, // Would be calculated based on marking criteria
        feedback: attemptData.notes
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/users/${DEMO_USER_ID}/osce-attempts`] });
      setActiveStation(null);
    }
  });

  const handleStationComplete = (attemptData: OsceAttemptData) => {
    submitAttemptMutation.mutate(attemptData);
  };

  const getStationAttempt = (stationId: number) => {
    return userAttempts?.find(attempt => attempt.stationId === stationId);
  };

  const getStationIcon = (category: string) => {
    switch (category) {
      case 'history-taking': return '🗣️';
      case 'examination': return '🔍';
      case 'communication': return '💬';
      case 'emergency': return '🚨';
      case 'procedures': return '🔬';
      default: return '🩺';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return 'text-mint-green';
    if (score >= 70) return 'text-amber-warning';
    return 'text-deep-rose';
  };

  if (activeStation) {
    return (
      <div className="min-h-screen bg-light-bg py-8">
        <OsceStationComponent
          station={activeStation}
          onStationComplete={handleStationComplete}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white py-12 border-b" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#000000' }}>PLAB 2 OSCE Preparation</h1>
            <p className="text-xl" style={{ color: '#666666' }}>Master clinical skills through interactive simulations</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>
                {userAttempts?.filter(a => a.score >= 70).length || 0}
              </div>
              <div className="text-sm" style={{ color: '#666666' }}>Stations Passed</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>
                {userAttempts?.length ? Math.round(userAttempts.reduce((acc, a) => acc + a.score, 0) / userAttempts.length) : 0}%
              </div>
              <div className="text-sm" style={{ color: '#666666' }}>Average Score</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>
                {userAttempts?.length || 0}/{stations?.length || 0}
              </div>
              <div className="text-sm" style={{ color: '#666666' }}>Stations Attempted</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>
                8
              </div>
              <div className="text-sm" style={{ color: '#666666' }}>Avg. Time (min)</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* OSCE Stations */}
            <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center" style={{ color: '#000000' }}>
                  <Stethoscope className="w-6 h-6 mr-3 text-red-600" />
                  OSCE Stations
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stationsLoading ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                      <span style={{ color: '#000000' }}>Loading stations...</span>
                    </div>
                  </div>
                ) : stations && stations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {stations.map((station) => {
                      const attempt = getStationAttempt(station.id);
                      const isCompleted = !!attempt;
                      
                      return (
                        <div
                          key={station.id}
                          className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
                          style={{ backgroundColor: '#ffffff' }}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <span className="text-lg">{getStationIcon(station.category)}</span>
                              </div>
                              <div>
                                <h3 className="font-semibold" style={{ color: '#000000' }}>{station.title}</h3>
                                <p className="text-sm capitalize" style={{ color: '#666666' }}>{station.category.replace('-', ' ')}</p>
                              </div>
                            </div>
                            
                            {isCompleted && (
                              <Badge className="bg-green-600 text-white">
                                {attempt.score}%
                              </Badge>
                            )}
                          </div>

                          <p className="text-sm mb-4 line-clamp-2" style={{ color: '#000000' }}>
                            {station.description}
                          </p>

                          <div className="flex items-center justify-between text-sm mb-4" style={{ color: '#666666' }}>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" />
                              <span>{station.timeLimit} minutes</span>
                            </div>
                            {isCompleted && (
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span>Completed</span>
                              </div>
                            )}
                          </div>

                          <Button
                            id={`station-${station.id}-btn`}
                            onClick={() => setActiveStation(station)}
                            className={`w-full ${
                              isCompleted 
                                ? 'btn-secondary' 
                                : 'btn-medical'
                            }`}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            {isCompleted ? 'Practice Again' : 'Start Station'}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Stethoscope className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#000000' }}>No OSCE Stations Available</h3>
                    <p className="text-gray-600">OSCE stations will be available once you complete PLAB 1 preparation.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Attempts */}
            {userAttempts && userAttempts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Recent Attempts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userAttempts.slice(0, 5).map((attempt) => {
                      const station = stations?.find(s => s.id === attempt.stationId);
                      
                      return (
                        <div key={attempt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-deep-rose/10 rounded-lg flex items-center justify-center">
                              <span className="text-lg">{station ? getStationIcon(station.category) : '🩺'}</span>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{station?.title || 'Unknown Station'}</h4>
                              <p className="text-sm text-gray-600">
                                {new Date(attempt.completedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-lg font-semibold ${getPerformanceColor(attempt.score)}`}>
                              {attempt.score}%
                            </div>
                            <div className="text-sm text-gray-600">
                              {attempt.score >= 70 ? 'Pass' : 'Needs Work'}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* OSCE Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">OSCE Success Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-medical-blue">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Communication
                    </h4>
                    <p className="text-sm text-gray-700">
                      Introduce yourself, maintain eye contact, and show empathy throughout the interaction.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-mint-green">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Time Management
                    </h4>
                    <p className="text-sm text-gray-700">
                      Practice timing yourself. Most stations are 8-10 minutes with structured tasks.
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-accent">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Stethoscope className="w-4 h-4 mr-2" />
                      Clinical Skills
                    </h4>
                    <p className="text-sm text-gray-700">
                      Follow a systematic approach for examinations and clearly verbalize your findings.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Performance by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['history-taking', 'examination', 'communication', 'emergency'].map((category) => {
                    const categoryAttempts = userAttempts?.filter(a => {
                      const station = stations?.find(s => s.id === a.stationId);
                      return station?.category === category;
                    }) || [];
                    
                    const avgScore = categoryAttempts.length > 0 
                      ? categoryAttempts.reduce((acc, a) => acc + a.score, 0) / categoryAttempts.length 
                      : 0;

                    return (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-deep-rose/10 rounded-lg flex items-center justify-center">
                            <span className="text-sm">{getStationIcon(category)}</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 capitalize">
                              {category.replace('-', ' ')}
                            </h4>
                            <p className="text-xs text-gray-600">
                              {categoryAttempts.length} attempts
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-semibold ${getPerformanceColor(avgScore)}`}>
                            {Math.round(avgScore)}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Exam Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">PLAB 2 Exam Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Format:</span>
                    <span className="font-medium">18 OSCE Stations</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">3 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pass Mark:</span>
                    <span className="font-medium">~70%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost:</span>
                    <span className="font-medium">£890</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button variant="outline" className="w-full text-sm">
                    View OSCE Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
