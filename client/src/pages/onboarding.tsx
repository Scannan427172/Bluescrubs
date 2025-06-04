import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, BookOpen, Users, GraduationCap, Stethoscope } from "lucide-react";

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [selectedStage, setSelectedStage] = useState<string>("");

  const stages = [
    {
      id: "plab1",
      title: "PLAB 1 Preparation",
      description: "Master MCQs with 3,000+ questions across all medical specialties",
      features: [
        "Adaptive learning algorithm",
        "Timed mock examinations",
        "Detailed explanations",
        "Topic-wise practice",
        "Performance analytics"
      ],
      icon: BookOpen,
      gradient: "from-medical-blue to-purple-accent",
      recommended: false
    },
    {
      id: "plab2",
      title: "PLAB 2 OSCE Prep",
      description: "Interactive clinical scenarios with video-based patient interactions",
      features: [
        "18 OSCE stations",
        "Video scenarios",
        "Communication skills practice",
        "Marking rubrics",
        "Real-time feedback"
      ],
      icon: Stethoscope,
      gradient: "from-deep-rose to-purple-accent",
      recommended: true
    },
    {
      id: "nhs",
      title: "NHS Career Prep",
      description: "Complete guidance for starting your NHS career after PLAB success",
      features: [
        "Job application guidance",
        "Interview preparation",
        "Cultural integration",
        "CV templates",
        "Portfolio building"
      ],
      icon: GraduationCap,
      gradient: "from-mint-green to-purple-accent",
      recommended: false
    }
  ];

  const handleStageSelect = (stageId: string) => {
    setSelectedStage(stageId);
  };

  const handleContinue = () => {
    if (selectedStage) {
      // In a real app, we would save this preference to the user's profile
      setLocation("/");
    }
  };

  return (
    <div className="min-h-screen bg-light-bg">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-medical-blue rounded-lg flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-medical-blue">PLAB Master</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your PLAB Journey</h1>
            <p className="text-lg text-gray-600">Choose your current preparation stage to get personalized content and study plans</p>
          </div>
        </div>
      </div>

      {/* Stage Selection */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stages.map((stage) => {
            const Icon = stage.icon;
            const isSelected = selectedStage === stage.id;
            
            return (
              <Card
                key={stage.id}
                className={`relative overflow-hidden cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? "ring-2 ring-medical-blue shadow-lg transform scale-105" 
                    : "hover:shadow-md hover:transform hover:scale-102"
                }`}
                onClick={() => handleStageSelect(stage.id)}
              >
                {stage.recommended && (
                  <Badge className="absolute top-4 right-4 bg-amber-warning text-white">
                    Recommended
                  </Badge>
                )}
                
                <div className={`bg-gradient-to-br ${stage.gradient} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-8 h-8" />
                    {isSelected && <CheckCircle className="w-6 h-6" />}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{stage.title}</h3>
                  <p className="text-sm opacity-90">{stage.description}</p>
                </div>
                
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {stage.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-mint-green flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="text-center mt-12">
          <Button
            onClick={handleContinue}
            disabled={!selectedStage}
            className="btn-medical text-lg px-8 py-4"
          >
            Start My PLAB Journey
          </Button>
          
          {selectedStage && (
            <p className="text-sm text-gray-600 mt-4">
              You can change your focus area anytime from your dashboard
            </p>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white rounded-xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose PLAB Master?</h2>
            <p className="text-gray-600">Join thousands of international medical graduates who have successfully passed their PLAB exams</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-medical-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-medical-blue" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">15,000+ Success Stories</h3>
              <p className="text-gray-600 text-sm">Join our community of successful PLAB graduates</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-mint-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">98% Pass Rate</h3>
              <p className="text-gray-600 text-sm">Our students consistently outperform the average</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-purple-accent" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expert Content</h3>
              <p className="text-gray-600 text-sm">Created by UK-qualified doctors and PLAB experts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
