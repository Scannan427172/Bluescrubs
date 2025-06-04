import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Stethoscope, Mail, Lock, User, GraduationCap, 
  MapPin, Calendar, Eye, EyeOff, CheckCircle, 
  ArrowRight, Globe, Shield, Users, Award
} from "lucide-react";
import { Link } from "wouter";

export default function Auth() {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [bypassRegistration, setBypassRegistration] = useState(false);

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    medicalBackground: "",
    country: "",
    examDate: "",
    agreeToTerms: false,
    agreeToNewsletter: false
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic
    console.log("Login:", loginForm);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic
    console.log("Register:", registerForm);
  };

  const handleBypassLogin = () => {
    // Bypass registration and login directly
    console.log("Bypass login activated");
    // Redirect to dashboard
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  PLAB Master
                </h1>
                <p className="text-black text-lg">AI-Powered PLAB Preparation</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="text-left">
                <h2 className="text-2xl font-bold text-black mb-4">
                  The Complete PLAB Success Platform
                </h2>
                <p className="text-black text-lg leading-relaxed">
                  Join thousands of international medical graduates who've successfully passed 
                  PLAB and secured their NHS careers with our comprehensive AI-powered platform.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black">94% Success Rate</h4>
                    <p className="text-black text-sm">PLAB pass guarantee</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black">50+ Countries</h4>
                    <p className="text-black text-sm">Global community</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black">Expert Mentors</h4>
                    <p className="text-black text-sm">NHS doctors guide you</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black">AI-Powered</h4>
                    <p className="text-black text-sm">Adaptive learning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PLAB Master
              </h1>
            </div>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-black">
                Welcome to Your PLAB Journey
              </CardTitle>
              <p className="text-black">Start your path to NHS success today</p>
            </CardHeader>
            
            <CardContent>
              {/* Bypass Registration Button */}
              {!bypassRegistration && (
                <div className="mb-6">
                  <Button 
                    onClick={handleBypassLogin}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Quick Demo Access - Skip Registration
                  </Button>
                  <p className="text-center text-sm text-black mt-2">
                    Try all features instantly, no signup required
                  </p>
                  
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-black">Or continue with account</span>
                    </div>
                  </div>
                </div>
              )}

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login" className="text-sm">Sign In</TabsTrigger>
                  <TabsTrigger value="register" className="text-sm">Create Account</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-black">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="doctor@example.com"
                          className="pl-10 auth-input text-black"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-black">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10 auth-input text-black"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="remember"
                          checked={loginForm.rememberMe}
                          onCheckedChange={(checked) => setLoginForm({...loginForm, rememberMe: checked as boolean})}
                        />
                        <Label htmlFor="remember" className="text-sm text-black">
                          Remember me
                        </Label>
                      </div>
                      <Button variant="link" className="text-sm text-blue-600 hover:text-blue-800 p-0">
                        Forgot password?
                      </Button>
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-black py-3">
                      Sign In to Your Account
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register" className="space-y-4">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-black">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          className="auth-input text-black"
                          value={registerForm.firstName}
                          onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-black">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          className="auth-input text-black"
                          value={registerForm.lastName}
                          onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="text-black">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="doctor@example.com"
                          className="pl-10 auth-input text-black"
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="medicalBackground" className="text-black">Medical Background</Label>
                      <Select value={registerForm.medicalBackground} onValueChange={(value) => setRegisterForm({...registerForm, medicalBackground: value})}>
                        <SelectTrigger className="auth-select text-black">
                          <SelectValue placeholder="Select your background" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="medical-student">Medical Student</SelectItem>
                          <SelectItem value="recent-graduate">Recent Graduate</SelectItem>
                          <SelectItem value="practicing-doctor">Practicing Doctor</SelectItem>
                          <SelectItem value="specialist">Specialist/Consultant</SelectItem>
                          <SelectItem value="other">Other Healthcare Professional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-black">Country</Label>
                        <Select value={registerForm.country} onValueChange={(value) => setRegisterForm({...registerForm, country: value})}>
                          <SelectTrigger className="auth-select text-black">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="india">India</SelectItem>
                            <SelectItem value="pakistan">Pakistan</SelectItem>
                            <SelectItem value="bangladesh">Bangladesh</SelectItem>
                            <SelectItem value="nigeria">Nigeria</SelectItem>
                            <SelectItem value="egypt">Egypt</SelectItem>
                            <SelectItem value="sudan">Sudan</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="examDate" className="text-black">Target Exam Date</Label>
                        <Input
                          id="examDate"
                          type="date"
                          className="auth-input text-black"
                          value={registerForm.examDate}
                          onChange={(e) => setRegisterForm({...registerForm, examDate: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="text-black">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          className="pl-10 pr-10 auth-input text-black"
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          className="pl-10 pr-10"
                          value={registerForm.confirmPassword}
                          onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="terms"
                          checked={registerForm.agreeToTerms}
                          onCheckedChange={(checked) => setRegisterForm({...registerForm, agreeToTerms: checked as boolean})}
                          required
                        />
                        <Label htmlFor="terms" className="text-sm text-gray-600">
                          I agree to the <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0 h-auto">Terms of Service</Button> and <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0 h-auto">Privacy Policy</Button>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="newsletter"
                          checked={registerForm.agreeToNewsletter}
                          onCheckedChange={(checked) => setRegisterForm({...registerForm, agreeToNewsletter: checked as boolean})}
                        />
                        <Label htmlFor="newsletter" className="text-sm text-gray-600">
                          Subscribe to study tips and PLAB updates
                        </Label>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3">
                      Create Your Account
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {activeTab === "login" ? "Don't have an account? " : "Already have an account? "}
                  <Button 
                    variant="link" 
                    className="text-blue-600 hover:text-blue-800 p-0 h-auto font-semibold"
                    onClick={() => setActiveTab(activeTab === "login" ? "register" : "login")}
                  >
                    {activeTab === "login" ? "Create one now" : "Sign in instead"}
                  </Button>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center text-xs text-gray-500">
                  <p>🔒 Your data is secure and encrypted</p>
                  <p className="mt-1">Trusted by 15,000+ medical professionals worldwide</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Bottom Block with Background Image and 50% Transparency */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-cover bg-center p-6"
        style={{
          backgroundImage: `url('@assets/image_1749076175862.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            <div className="flex items-center justify-center space-x-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Secure & Private</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">15,000+ Students</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Award className="w-5 h-5" />
              <span className="text-sm font-medium">94% Success Rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}