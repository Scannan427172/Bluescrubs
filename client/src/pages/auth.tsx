import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import medicalProfessionalImage from "@assets/image_1749067467219.png";

export default function Auth() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate login process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Login Successful",
        description: "Welcome back to PLAB Master!",
      });
      
      setLocation("/");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Registration Failed",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Simulate registration process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Registration Successful",
        description: "Welcome to PLAB Master! You can now start your medical exam preparation.",
      });
      
      setLocation("/");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBypass = () => {
    toast({
      title: "Demo Access",
      description: "Accessing PLAB Master in demo mode.",
    });
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Image and Branding */}
        <div className="flex flex-col items-center justify-center space-y-6 order-2 lg:order-1">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold" style={{ color: '#2E86AB' }}>
              PLAB Master
            </h1>
            <p className="text-lg" style={{ color: '#666666' }}>
              Your comprehensive platform for PLAB exam preparation
            </p>
          </div>
          
          <div className="relative">
            <img 
              src={medicalProfessionalImage} 
              alt="Medical Professional" 
              className="w-80 h-auto rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold" style={{ color: '#000000' }}>
              Join Thousands of Medical Professionals
            </h3>
            <p className="text-sm" style={{ color: '#666666' }}>
              Preparing for PLAB 1 & PLAB 2 with our comprehensive study platform
            </p>
          </div>
        </div>

        {/* Right Side - Authentication Forms */}
        <div className="order-1 lg:order-2">
          <Card className="w-full max-w-md mx-auto border-2" style={{ borderColor: '#2E86AB' }}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold" style={{ color: '#000000' }}>
                Welcome to PLAB Master
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login" style={{ color: '#000000' }}>Login</TabsTrigger>
                  <TabsTrigger value="register" style={{ color: '#000000' }}>Register</TabsTrigger>
                </TabsList>
                
                {/* Login Tab */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" style={{ color: '#000000' }}>Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        required
                        className="border-gray-300"
                        style={{ color: '#000000' }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password" style={{ color: '#000000' }}>Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        required
                        className="border-gray-300"
                        style={{ color: '#000000' }}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full mt-6 text-white" 
                      disabled={isLoading}
                      style={{ backgroundColor: '#2E86AB' }}
                    >
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>
                
                {/* Register Tab */}
                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-username" style={{ color: '#000000' }}>Full Name</Label>
                      <Input
                        id="register-username"
                        type="text"
                        placeholder="Dr. Your Name"
                        value={registerForm.username}
                        onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                        required
                        className="border-gray-300"
                        style={{ color: '#000000' }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email" style={{ color: '#000000' }}>Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="Enter your email"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        required
                        className="border-gray-300"
                        style={{ color: '#000000' }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password" style={{ color: '#000000' }}>Password</Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="Create a password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        required
                        className="border-gray-300"
                        style={{ color: '#000000' }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-confirm" style={{ color: '#000000' }}>Confirm Password</Label>
                      <Input
                        id="register-confirm"
                        type="password"
                        placeholder="Confirm your password"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        required
                        className="border-gray-300"
                        style={{ color: '#000000' }}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full mt-6 text-white" 
                      disabled={isLoading}
                      style={{ backgroundColor: '#2E86AB' }}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
              
              {/* Bypass Button */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button 
                  onClick={handleBypass}
                  variant="outline" 
                  className="w-full border-gray-300" 
                  style={{ color: '#000000' }}
                >
                  Continue as Guest (Demo Mode)
                </Button>
                <p className="text-xs text-center mt-2" style={{ color: '#666666' }}>
                  Try the platform without creating an account
                </p>
              </div>
              
              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-xs" style={{ color: '#666666' }}>
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}