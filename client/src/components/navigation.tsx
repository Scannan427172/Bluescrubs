import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Menu, Stethoscope, Home, BookOpen, Users, GraduationCap, User, Brain, Calendar, UserCheck, Flag, Video, BarChart3, Trophy, Wifi, Route, MoreHorizontal, Accessibility, Globe, FileText } from "lucide-react";
import { Logo } from "@/components/logo";
import { LanguageToggle } from "@/components/LanguageToggle";

interface NavigationProps {
  user?: { username: string; studyStreak: number } | null;
}

export function Navigation({ user }: NavigationProps) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home, current: location === "/dashboard" },
    { name: "PLAB 1", href: "/plab1-new", icon: BookOpen, current: location === "/plab1-new" },
    { name: "PLAB 2", href: "/plab2-osce", icon: Video, current: location === "/plab2-osce" },
    { name: "Clinical Guides", href: "/clinical-guides", icon: FileText, current: location === "/clinical-guides" },
    { name: "Learning Path", href: "/personalized-paths", icon: Route, current: location === "/personalized-paths" },
    { name: "Global Exams", href: "/global-practice", icon: Flag, current: location === "/global-practice" },
    { name: "Languages", href: "/language-demo", icon: Accessibility, current: location === "/language-demo" },
    { name: "AI Learning", href: "/adaptive-learning", icon: Brain, current: location === "/adaptive-learning" },
    { name: "Smart Planner", href: "/smart-planner", icon: Calendar, current: location === "/smart-planner" },
    { name: "UK Culture", href: "/cultural-training", icon: Flag, current: location === "/cultural-training" },
    { name: "Mentors", href: "/mentors", icon: UserCheck, current: location === "/mentors" },
    { name: "Achievements", href: "/gamification", icon: Trophy, current: location === "/gamification" },
    { name: "Analytics", href: "/analytics", icon: BarChart3, current: location === "/analytics" },
    { name: "Offline Mode", href: "/offline-mode", icon: Wifi, current: location === "/offline-mode" },
    { name: "Pricing", href: "/pricing", icon: Trophy, current: location === "/pricing" },
    { name: "Community", href: "/community", icon: Users, current: location === "/community" },
    { name: "NHS Prep", href: "/nhs-prep", icon: GraduationCap, current: location === "/nhs-prep" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <Logo size="lg" />
              </Link>
            </div>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-3 xl:space-x-4 2xl:space-x-6 overflow-x-auto">
              {navigation.slice(0, 8).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-medium transition-colors text-sm whitespace-nowrap px-3 py-2 rounded-md ${
                    item.current
                      ? "text-blue-600 bg-blue-50 border border-blue-200"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Language Toggle */}
              <LanguageToggle variant="ghost" size="sm" />
              
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5 text-gray-600 hover:text-medical-blue" />
                <Badge className="absolute -top-1 -right-1 w-3 h-3 p-0 bg-deep-rose" />
              </Button>

              {/* User Profile */}
              {user && (
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="" alt={user.username} />
                    <AvatarFallback className="bg-medical-blue text-white text-sm">
                      {user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block">
                    <div className="text-sm font-medium text-gray-900">{user.username}</div>
                    <div className="text-xs text-gray-500">{user.studyStreak} day streak 🔥</div>
                  </div>
                </div>
              )}

              {/* Mobile Menu Trigger */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[320px] h-full overflow-hidden">
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center space-x-3 pb-6 border-b">
                      <div className="w-8 h-8 bg-medical-blue rounded-lg flex items-center justify-center">
                        <Stethoscope className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-lg font-bold text-medical-blue">PLAB Master</span>
                    </div>
                    
                    {/* Scrollable Navigation */}
                    <div className="flex-1 overflow-y-auto py-6 space-y-2">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                            item.current
                              ? "bg-medical-blue text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium text-sm">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                    
                    {/* Footer */}
                    <div className="pt-4 border-t">
                      <div className="text-center text-xs text-gray-500">
                        <p>All 12 unique features available</p>
                        <p className="mt-1">Comprehensive PLAB preparation</p>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40">
        <div className="grid grid-cols-5 gap-1">
          {/* Essential Navigation Items */}
          <Link
            href="/dashboard"
            className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
              location === "/dashboard"
                ? "text-medical-blue bg-blue-50"
                : "text-gray-400"
            }`}
          >
            <Home className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Dashboard</span>
          </Link>

          <Link
            href="/plab1-new"
            className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
              location === "/plab1-new"
                ? "text-medical-blue bg-blue-50"
                : "text-gray-400"
            }`}
          >
            <BookOpen className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">PLAB 1</span>
          </Link>

          <Link
            href="/plab2-osce"
            className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
              location === "/plab2-osce"
                ? "text-medical-blue bg-blue-50"
                : "text-gray-400"
            }`}
          >
            <GraduationCap className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">PLAB 2</span>
          </Link>

          <Link
            href="/video-osce"
            className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
              location === "/video-osce"
                ? "text-medical-blue bg-blue-50"
                : "text-gray-400"
            }`}
          >
            <Video className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Video OSCE</span>
          </Link>

          <Link
            href="/more"
            className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
              location === "/more"
                ? "text-medical-blue bg-blue-50"
                : "text-gray-400"
            }`}
          >
            <MoreHorizontal className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">More</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
