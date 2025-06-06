import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  ChevronLeft,
  Accessibility,
  Timer,
  Palette,
  Brain,
  BookOpen,
  UserCheck,
  MessageCircle,
  Settings2,
  Headphones,
  Heart,
  Shield,
  Users,
  FileText,
  Play,
  Pause,
  Volume2,
  Eye,
  Lightbulb,
  Focus
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function NeurodiverseSupport() {
  const [settings, setSettings] = useState({
    extendedTime: false,
    highContrast: false,
    reducedMotion: false,
    focusMode: false,
    audioNarration: false,
    fontSize: [16],
    breakReminders: true
  });

  const supportCategories = [
    {
      icon: Brain,
      title: "ADHD Support",
      description: "Tools and accommodations for attention and focus challenges",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
      features: [
        { name: "Focus Timer", description: "Pomodoro-style study sessions with breaks", enabled: settings.focusMode },
        { name: "Distraction-Free Mode", description: "Simplified interface with minimal visual clutter", enabled: false },
        { name: "Break Reminders", description: "Automatic reminders to take regular breaks", enabled: settings.breakReminders },
        { name: "Task Chunking", description: "Break large tasks into manageable segments", enabled: true }
      ]
    },
    {
      icon: BookOpen,
      title: "Dyslexia Support",
      description: "Reading and text processing accommodations",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
      features: [
        { name: "Dyslexia-Friendly Fonts", description: "OpenDyslexic and other accessible fonts", enabled: true },
        { name: "Text Spacing", description: "Adjustable line and character spacing", enabled: false },
        { name: "Reading Ruler", description: "Highlight current line while reading", enabled: false },
        { name: "Audio Narration", description: "Text-to-speech for all content", enabled: settings.audioNarration }
      ]
    },
    {
      icon: Heart,
      title: "Autism Spectrum Support",
      description: "Structured learning environment and communication tools",
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600",
      features: [
        { name: "Structured Routines", description: "Consistent layout and navigation patterns", enabled: true },
        { name: "Clear Instructions", description: "Step-by-step guidance and explicit directions", enabled: true },
        { name: "Sensory Preferences", description: "Adjustable colors, sounds, and animations", enabled: false },
        { name: "Social Scripts", description: "Communication templates for peer interaction", enabled: false }
      ]
    },
    {
      icon: Eye,
      title: "Visual Processing Support",
      description: "Visual accessibility and processing accommodations",
      color: "bg-orange-50 border-orange-200",
      iconColor: "text-orange-600",
      features: [
        { name: "High Contrast Mode", description: "Enhanced contrast for better readability", enabled: settings.highContrast },
        { name: "Color Blind Support", description: "Alternative color schemes and patterns", enabled: false },
        { name: "Reduced Motion", description: "Minimize animations and transitions", enabled: settings.reducedMotion },
        { name: "Font Size Control", description: "Adjustable text size throughout platform", enabled: true }
      ]
    }
  ];

  const examAccommodations = [
    {
      icon: Timer,
      title: "Extended Time",
      description: "25% to 100% additional time for assessments",
      status: "Available"
    },
    {
      icon: Pause,
      title: "Breaks During Exams",
      description: "Scheduled or on-demand break periods",
      status: "Configured"
    },
    {
      icon: Headphones,
      title: "Noise Reduction",
      description: "Quiet environment or noise-cancelling options",
      status: "Available"
    },
    {
      icon: FileText,
      title: "Alternative Formats",
      description: "Large print, audio, or digital formats",
      status: "Ready"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/more" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Neurodiverse Support</h1>
            <p className="text-gray-600">Comprehensive accessibility tools for diverse learning needs</p>
          </div>
        </div>

        {/* Quick Settings */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Settings</h2>
          <Card className="bg-white border-purple-200 shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">Extended Time</div>
                    <div className="text-sm text-gray-700">25% extra time for assessments</div>
                  </div>
                  <Switch 
                    checked={settings.extendedTime}
                    onCheckedChange={(checked) => setSettings({...settings, extendedTime: checked})}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">High Contrast</div>
                    <div className="text-sm text-gray-700">Enhanced visual contrast</div>
                  </div>
                  <Switch 
                    checked={settings.highContrast}
                    onCheckedChange={(checked) => setSettings({...settings, highContrast: checked})}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">Focus Mode</div>
                    <div className="text-sm text-gray-700">Distraction-free interface</div>
                  </div>
                  <Switch 
                    checked={settings.focusMode}
                    onCheckedChange={(checked) => setSettings({...settings, focusMode: checked})}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">Reduced Motion</div>
                    <div className="text-sm text-gray-700">Minimize animations</div>
                  </div>
                  <Switch 
                    checked={settings.reducedMotion}
                    onCheckedChange={(checked) => setSettings({...settings, reducedMotion: checked})}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">Audio Narration</div>
                    <div className="text-sm text-gray-700">Text-to-speech reading</div>
                  </div>
                  <Switch 
                    checked={settings.audioNarration}
                    onCheckedChange={(checked) => setSettings({...settings, audioNarration: checked})}
                  />
                </div>
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">Font Size</div>
                    <div className="text-sm text-gray-700 font-medium">{settings.fontSize[0]}px</div>
                  </div>
                  <Slider
                    value={settings.fontSize}
                    onValueChange={(value) => setSettings({...settings, fontSize: value})}
                    max={24}
                    min={12}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Support Categories</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {supportCategories.map((category, index) => (
              <Card key={index} className={`${category.color} hover:shadow-lg transition-shadow`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white rounded-lg">
                      <category.icon className={`h-6 w-6 ${category.iconColor}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{feature.name}</div>
                          <div className="text-xs text-gray-600">{feature.description}</div>
                        </div>
                        <Badge variant={feature.enabled ? "default" : "secondary"}>
                          {feature.enabled ? "Active" : "Available"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Configure {category.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* PLAB Exam Accommodations */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">PLAB Exam Accommodations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {examAccommodations.map((accommodation, index) => (
              <Card key={index} className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 text-center">
                  <accommodation.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-medium text-gray-900 mb-2">{accommodation.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{accommodation.description}</p>
                  <Badge className="bg-green-100 text-green-800">
                    {accommodation.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Apply for PLAB Adjustments
            </Button>
          </div>
        </div>

        {/* Resources & Support */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Peer Support Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Connect with other neurodiverse medical students and share experiences.</p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Join Discussion Groups
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  Find Study Partners
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Share Success Stories
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Professional Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Access professional guidance and documentation support.</p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Book Consultation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Documentation Help
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Focus className="h-4 w-4 mr-2" />
                  Study Strategies
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}