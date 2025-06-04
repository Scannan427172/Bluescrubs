import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/navigation";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Plab1Practice from "@/pages/plab1-practice";
import Plab2Osce from "@/pages/plab2-osce";
import Community from "@/pages/community";
import NhsPrep from "@/pages/nhs-prep";
import Onboarding from "@/pages/onboarding";
import NotFound from "@/pages/not-found";
import AdaptiveLearning from "@/pages/adaptive-learning";
import SmartPlanner from "@/pages/smart-planner";
import Mentors from "@/pages/mentors";
import CulturalTraining from "@/pages/cultural-training";
import VideoOsce from "@/pages/video-osce";
import Analytics from "@/pages/analytics";
import Gamification from "@/pages/gamification";
import OfflineMode from "@/pages/offline-mode";
import PersonalizedPaths from "@/pages/personalized-paths";
import Auth from "@/pages/auth";

// Mock user for demo - in real app this would come from auth context
const DEMO_USER = {
  username: "Dr. Sarah Ahmed",
  studyStreak: 12
};

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Switch>
        {/* Landing page without navigation */}
        <Route path="/" component={Landing} />
        <Route path="/auth" component={Auth} />
        
        {/* App pages with navigation */}
        <Route path="/dashboard">
          <Navigation user={DEMO_USER} />
          <Dashboard />
        </Route>
        <Route path="/home">
          <Navigation user={DEMO_USER} />
          <Home />
        </Route>
        <Route path="/onboarding">
          <Navigation user={DEMO_USER} />
          <Onboarding />
        </Route>
        <Route path="/plab1">
          <Navigation user={DEMO_USER} />
          <Plab1Practice />
        </Route>
        <Route path="/plab2">
          <Navigation user={DEMO_USER} />
          <Plab2Osce />
        </Route>
        <Route path="/community">
          <Navigation user={DEMO_USER} />
          <Community />
        </Route>
        <Route path="/nhs-prep">
          <Navigation user={DEMO_USER} />
          <NhsPrep />
        </Route>
        <Route path="/adaptive-learning">
          <Navigation user={DEMO_USER} />
          <AdaptiveLearning />
        </Route>
        <Route path="/smart-planner">
          <Navigation user={DEMO_USER} />
          <SmartPlanner />
        </Route>
        <Route path="/mentors">
          <Navigation user={DEMO_USER} />
          <Mentors />
        </Route>
        <Route path="/cultural-training">
          <Navigation user={DEMO_USER} />
          <CulturalTraining />
        </Route>
        <Route path="/video-osce">
          <Navigation user={DEMO_USER} />
          <VideoOsce />
        </Route>
        <Route path="/analytics">
          <Navigation user={DEMO_USER} />
          <Analytics />
        </Route>
        <Route path="/gamification">
          <Navigation user={DEMO_USER} />
          <Gamification />
        </Route>
        <Route path="/offline-mode">
          <Navigation user={DEMO_USER} />
          <OfflineMode />
        </Route>
        <Route path="/personalized-paths">
          <Navigation user={DEMO_USER} />
          <PersonalizedPaths />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
