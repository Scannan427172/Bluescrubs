import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Brain, Clock, Award, Globe, Stethoscope } from "lucide-react";
import nhsPrepWomanImg from "@assets/image_1749071491789.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Main Hero Image */}
          <div className="mb-8">
            <img 
              src={nhsPrepWomanImg} 
              alt="Professional woman with glasses studying with NHS Prep books"
              className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl"
            />
          </div>
          
          {/* Hero Content */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-extrabold text-black">
              PLAB Master
            </h1>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              The most comprehensive PLAB preparation platform with AI-powered learning, 
              video OSCE simulations, and personalized study plans.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/auth">
                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-xl font-semibold rounded-lg">
                  Login / Register
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-12 py-4 text-xl font-semibold rounded-lg"
                >
                  Bypass Login - Try Now
                </Button>
              </Link>
            </div>
            
            {/* Success Stats */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10,000+</div>
                <div className="text-gray-600">Successful Candidates</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">95%</div>
                <div className="text-gray-600">Pass Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">12</div>
                <div className="text-gray-600">Unique Features</div>
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