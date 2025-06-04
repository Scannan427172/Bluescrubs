import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Brain, Clock, Award, Globe, Stethoscope } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                Master Your Medical Career
              </span>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-black mb-6">
                PLAB Exam<br/>
                <span className="text-blue-600">Success Platform</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                The most comprehensive PLAB preparation platform with AI-powered learning, 
                video OSCE simulations, and personalized study plans.
              </p>

              {/* Action Buttons */}
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center lg:justify-start mb-8">
                <Link href="/auth">
                  <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg">
                    Login / Register
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-lg"
                  >
                    Bypass Login - Try Now
                  </Button>
                </Link>
              </div>

              {/* Key Features Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-black">AI Learning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-black">Video OSCE</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-black">Mentors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-black">Smart Planner</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-black">Gamification</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-black">UK Culture</span>
                </div>
              </div>
            </div>

            {/* Right Side - Woman with Glasses */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
                <div className="text-center">
                  {/* Professional Woman with Glasses */}
                  <div className="w-48 h-48 mx-auto mb-6 relative">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Hair */}
                      <ellipse cx="100" cy="85" rx="55" ry="45" fill="#8B4513" />
                      <ellipse cx="100" cy="70" rx="45" ry="35" fill="#A0522D" />
                      
                      {/* Face */}
                      <ellipse cx="100" cy="100" rx="40" ry="50" fill="#FDBCB4" />
                      
                      {/* Eyes */}
                      <circle cx="88" cy="90" r="3" fill="#000" />
                      <circle cx="112" cy="90" r="3" fill="#000" />
                      
                      {/* Eyebrows */}
                      <ellipse cx="88" cy="85" rx="6" ry="2" fill="#654321" />
                      <ellipse cx="112" cy="85" rx="6" ry="2" fill="#654321" />
                      
                      {/* Glasses Frame */}
                      <g stroke="#000" strokeWidth="3" fill="none">
                        {/* Left lens */}
                        <circle cx="88" cy="90" r="12" />
                        {/* Right lens */}
                        <circle cx="112" cy="90" r="12" />
                        {/* Bridge */}
                        <line x1="100" y1="90" x2="100" y2="90" strokeWidth="2" />
                        {/* Temple arms */}
                        <line x1="76" y1="85" x2="65" y2="82" strokeWidth="2" />
                        <line x1="124" y1="85" x2="135" y2="82" strokeWidth="2" />
                      </g>
                      
                      {/* Lens reflection */}
                      <circle cx="85" cy="87" r="3" fill="#E6F3FF" opacity="0.7" />
                      <circle cx="109" cy="87" r="3" fill="#E6F3FF" opacity="0.7" />
                      
                      {/* Nose */}
                      <ellipse cx="100" cy="98" rx="2" ry="4" fill="#F4A9A8" />
                      
                      {/* Smile */}
                      <path d="M 90 108 Q 100 115 110 108" stroke="#000" strokeWidth="2" fill="none" />
                      
                      {/* Lab coat collar */}
                      <path d="M 70 140 L 80 125 L 120 125 L 130 140 L 130 160 L 70 160 Z" fill="#FFF" stroke="#DDD" strokeWidth="1" />
                      
                      {/* Stethoscope */}
                      <circle cx="85" cy="145" r="4" fill="#4A90E2" />
                      <path d="M 85 145 Q 100 135 115 145" stroke="#4A90E2" strokeWidth="3" fill="none" />
                      <circle cx="115" cy="145" r="4" fill="#4A90E2" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-black mb-2">
                    Dr. Sarah Johnson
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    "I passed PLAB 1 & 2 on my first attempt using this platform. 
                    The AI-powered learning and video OSCE practice were game-changers!"
                  </p>
                  
                  {/* Books Stack */}
                  <div className="flex justify-center space-x-2 mb-6">
                    <div className="w-8 h-10 bg-blue-600 rounded shadow-md transform rotate-2"></div>
                    <div className="w-8 h-10 bg-purple-600 rounded shadow-md"></div>
                    <div className="w-8 h-10 bg-green-600 rounded shadow-md transform -rotate-2"></div>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Join 10,000+ successful candidates
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase mb-2">Features</h2>
            <h3 className="text-3xl font-extrabold text-black mb-4">
              Everything you need to succeed
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              12 unique features that make us different from every other PLAB preparation platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Adaptive Learning",
                description: "Personalized question difficulty based on your performance"
              },
              {
                icon: BookOpen,
                title: "Video-Based OSCE Simulations",
                description: "Practice with real clinical scenarios and patient interactions"
              },
              {
                icon: Users,
                title: "Mentor Matching System",
                description: "Connect with successful PLAB graduates for guidance"
              },
              {
                icon: Clock,
                title: "Smart Study Planner",
                description: "AI-optimized study schedules based on your exam date"
              },
              {
                icon: Award,
                title: "Gamification & Achievements",
                description: "Stay motivated with progress tracking and rewards"
              },
              {
                icon: Globe,
                title: "UK Cultural Context Training",
                description: "Learn NHS protocols and UK healthcare system"
              }
            ].map((feature, index) => (
              <Card key={index} className="border shadow-md hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-medium text-black mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Ready to start your journey?
          </h2>
          <h3 className="text-3xl font-extrabold text-white mb-4">
            Begin your PLAB preparation today.
          </h3>
          <p className="text-lg text-blue-200 mb-8">
            Join thousands of international medical graduates who achieved their UK medical career dreams.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link href="/auth">
              <Button className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-50 px-8 py-3 text-lg font-semibold rounded-lg">
                Create Account
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-blue-700 px-8 py-3 text-lg font-semibold rounded-lg"
              >
                Try Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}