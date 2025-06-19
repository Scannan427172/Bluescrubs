import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Stethoscope, Brain, Heart, Wind, Users, Activity, Zap, Shield } from "lucide-react";

interface Specialty {
  code: string;
  name: string;
  specialist: string;
  expertise_areas: string[];
}

interface SpecialtySelectorProps {
  onSpecialtySelect: (specialty: string) => void;
  onGenerateQuestions: (specialty: string, count: number, difficulty: string) => void;
  selectedSpecialty?: string;
  loading?: boolean;
}

const specialtyIcons: Record<string, any> = {
  cardiology: Heart,
  respiratory: Wind,
  gastroenterology: Activity,
  neurology: Brain,
  endocrinology: Zap,
  psychiatry: Users,
  surgery: Shield,
  emergency: Stethoscope
};

export function SpecialtySelector({ 
  onSpecialtySelect, 
  onGenerateQuestions, 
  selectedSpecialty,
  loading = false 
}: SpecialtySelectorProps) {
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState("specialist");

  const { data: specialtiesData, isLoading } = useQuery({
    queryKey: ["/api/plab-ai/specialties"],
  });

  const specialties: Specialty[] = specialtiesData?.specialties || [];

  const handleGenerateClick = () => {
    if (selectedSpecialty) {
      onGenerateQuestions(selectedSpecialty, questionCount, difficulty);
    }
  };

  const selectedSpecialtyData = specialties.find(s => s.code === selectedSpecialty);
  const SpecialtyIcon = selectedSpecialtyData ? specialtyIcons[selectedSpecialtyData.code] || Stethoscope : null;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Medical Specialties...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Select Medical Specialty
          </CardTitle>
          <CardDescription>
            Choose a medical specialty to generate expert-level questions from that field's consultant specialist
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {specialties.map((specialty) => {
              const Icon = specialtyIcons[specialty.code] || Stethoscope;
              const isSelected = selectedSpecialty === specialty.code;
              
              return (
                <Card 
                  key={specialty.code}
                  className={`cursor-pointer transition-colors hover:bg-accent/50 ${
                    isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => onSpecialtySelect(specialty.code)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div className="space-y-2 flex-1 min-w-0">
                        <h3 className="font-semibold text-sm leading-tight">{specialty.name}</h3>
                        <p className="text-xs text-muted-foreground">{specialty.specialist}</p>
                        <div className="flex flex-wrap gap-1">
                          {specialty.expertise_areas.slice(0, 2).map((area, index) => (
                            <Badge key={index} variant="secondary" className="text-xs px-2 py-0">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {selectedSpecialtyData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {SpecialtyIcon && <SpecialtyIcon className="h-5 w-5" />}
              {selectedSpecialtyData.name} Questions
            </CardTitle>
            <CardDescription>
              Generate questions from {selectedSpecialtyData.specialist}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Number of Questions</label>
                <Select value={questionCount.toString()} onValueChange={(value) => setQuestionCount(parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Questions</SelectItem>
                    <SelectItem value="10">10 Questions</SelectItem>
                    <SelectItem value="15">15 Questions</SelectItem>
                    <SelectItem value="20">20 Questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty Level</label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="foundation">Foundation Level</SelectItem>
                    <SelectItem value="specialist">Specialist Level</SelectItem>
                    <SelectItem value="consultant">Consultant Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Generate</label>
                <Button 
                  onClick={handleGenerateClick}
                  disabled={loading || !selectedSpecialty}
                  className="w-full"
                >
                  {loading ? "Generating..." : "Create Questions"}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Expertise Areas:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedSpecialtyData.expertise_areas.map((area, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}