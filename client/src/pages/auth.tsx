import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Stethoscope, 
  Users, 
  Award, 
  CheckCircle, 
  Shield,
  ArrowRight,
  Mail,
  Lock,
  User,
  Phone
} from "lucide-react";

export default function Auth() {
  const [, setLocation] = useLocation();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", loginForm);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register:", registerForm);
  };

  const handleBypassLogin = () => {
    console.log("Bypass login activated");
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Main Content Container */}
      <div className="min-h-screen flex flex-col lg:flex-row">
        
        {/* Left Side - Branding (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-12 items-center justify-center">
          <div className="max-w-md text-center text-white space-y-8">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold">NHSprep</h1>
            </div>
            
            <h2 className="text-2xl font-semibold">
              Your Gateway to NHS Success
            </h2>
            
            <p className="text-lg text-white" style={{color: 'white !important'}}>
              Join thousands of international medical graduates who've successfully passed their PLAB examinations with our comprehensive preparation platform.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>AI-Powered Adaptive Learning</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>Real PLAB 1 & 2 Practice Questions</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>Expert Mentor Guidance</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>Cultural Context Training</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-md">
            
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">
                  NHSprep
                </h1>
              </div>
            </div>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-black">
                  Welcome to Your PLAB Journey
                </CardTitle>
                <p className="text-black">Start your path to NHS success today</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-400">
                    <TabsTrigger value="login" className="text-black data-[state=active]:text-black data-[state=active]:bg-white font-medium">Sign In</TabsTrigger>
                    <TabsTrigger value="register" className="text-black data-[state=active]:text-black data-[state=active]:bg-white font-medium">Create Account</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login" className="space-y-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-black font-medium">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-black/60" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={loginForm.email}
                            onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                            className="pl-10 text-black placeholder:text-gray-700 border-gray-300 bg-white"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-black font-medium">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-black/60" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                            className="pl-10 text-black placeholder:text-gray-700 border-gray-300 bg-white"
                            required
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Sign In to Dashboard
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="register" className="space-y-4">
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-black font-medium">First Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-black/60" />
                            <Input
                              id="firstName"
                              placeholder="First name"
                              value={registerForm.firstName}
                              onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})}
                              className="pl-10 text-black placeholder:text-black/60 border-gray-300 bg-white"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-black font-medium">Last Name</Label>
                          <Input
                            id="lastName"
                            placeholder="Last name"
                            value={registerForm.lastName}
                            onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})}
                            className="text-black placeholder:text-black/60 border-gray-300 bg-white"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="registerEmail" className="text-black font-medium">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-black/60" />
                          <Input
                            id="registerEmail"
                            type="email"
                            placeholder="Enter your email"
                            value={registerForm.email}
                            onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                            className="pl-10 text-black placeholder:text-black/60 border-gray-300 bg-white"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-black font-medium">Phone</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-black/60" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="Phone number"
                            value={registerForm.phone}
                            onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                            className="pl-10 text-black placeholder:text-black/60 border-gray-300 bg-white"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="registerPassword" className="text-black font-medium">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-black/60" />
                          <Input
                            id="registerPassword"
                            type="password"
                            placeholder="Create password"
                            value={registerForm.password}
                            onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                            className="pl-10 text-black placeholder:text-black/60 border-gray-300 bg-white"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-black font-medium">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-black/60" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm password"
                            value={registerForm.confirmPassword}
                            onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                            className="pl-10 text-black placeholder:text-black/60 border-gray-300 bg-white"
                            required
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Create Account
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
                
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-sm text-black mb-3" style={{color: 'black'}}>Want to explore first?</p>
                  <Button 
                    onClick={handleBypassLogin}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white border-0"
                  >
                    Quick Demo Access - Skip Registration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Bottom Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 sm:mb-6">
            Start Your NHS Journey Today
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-12">
            Join 15,000+ medical professionals who trust our platform
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Secure Platform</h3>
              <p className="text-sm sm:text-base text-white/80">Enterprise-grade security</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Global Community</h3>
              <p className="text-sm sm:text-base text-white/80">15,000+ active students</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Proven Results</h3>
              <p className="text-sm sm:text-base text-white/80">94% success rate</p>
            </div>
          </div>
          
          <Button className="bg-white text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold">
            Begin Your Preparation
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}