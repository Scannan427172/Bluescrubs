import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Brain, Clock, Award, Globe } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                  <h1>
                    <span className="block text-sm font-semibold uppercase tracking-wide text-blue-600 sm:text-base lg:text-sm xl:text-base">
                      Master Your Medical Career
                    </span>
                    <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                      <span className="block text-gray-900">PLAB Exam</span>
                      <span className="block text-blue-600">Success Platform</span>
                    </span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    The most comprehensive PLAB preparation platform with AI-powered learning, 
                    video OSCE simulations, and personalized study plans. Join thousands of 
                    international medical graduates who achieved their UK medical career dreams.
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center lg:justify-start">
                    <Link href="/auth">
                      <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg">
                        Login / Register
                      </Button>
                    </Link>
                    <Link href="/dashboard">
                      <Button 
                        variant="outline" 
                        className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold rounded-lg"
                      >
                        Bypass Login - Try Now
                      </Button>
                    </Link>
                  </div>

                  {/* Key Features */}
                  <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <div className="flex items-center space-x-2">
                      <Brain className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">AI Learning</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">Video OSCE</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">Mentors</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">Smart Planner</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">Gamification</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">UK Culture</span>
                    </div>
                  </div>
                </div>

                <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                  <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                    {/* Woman with Glasses Illustration */}
                    <div className="relative bg-white rounded-lg overflow-hidden">
                      <div className="px-6 py-8 sm:px-10 sm:py-12">
                        <div className="flex flex-col items-center text-center">
                          {/* Professional Woman Avatar */}
                          <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                            <svg
                              className="w-20 h-20 text-blue-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 3.5C14.8 3.4 14.4 3.4 14.2 3.5L9 7V9C9 9.6 9.4 10 10 10H11V16L8.5 19.5C8.1 19.9 8.1 20.5 8.5 20.9C8.9 21.3 9.5 21.3 9.9 20.9L12 18.8L14.1 20.9C14.5 21.3 15.1 21.3 15.5 20.9C15.9 20.5 15.9 19.9 15.5 19.5L13 16V10H14C14.6 10 15 9.6 15 9Z"/>
                            </svg>
                          </div>
                          
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Dr. Sarah Johnson
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            "I passed PLAB 1 & 2 on my first attempt using this platform. 
                            The AI-powered learning and video OSCE practice were game-changers!"
                          </p>
                          
                          {/* Books Stack */}
                          <div className="flex space-x-2 mb-4">
                            <div className="w-8 h-10 bg-blue-600 rounded"></div>
                            <div className="w-8 h-10 bg-purple-600 rounded"></div>
                            <div className="w-8 h-10 bg-green-600 rounded"></div>
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
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to succeed
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              12 unique features that make us different from every other PLAB preparation platform
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to start your journey?</span>
            <span className="block">Begin your PLAB preparation today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-200">
            Join thousands of international medical graduates who achieved their UK medical career dreams with our comprehensive platform.
          </p>
          <div className="mt-8 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
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