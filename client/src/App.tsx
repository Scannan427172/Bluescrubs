import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/navigation";
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

// Mock user for demo - in real app this would come from auth context
const DEMO_USER = {
  username: "Dr. Sarah Ahmed",
  studyStreak: 12
};

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation user={DEMO_USER} />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/onboarding" component={Onboarding} />
        <Route path="/plab1" component={Plab1Practice} />
        <Route path="/plab2" component={Plab2Osce} />
        <Route path="/community" component={Community} />
        <Route path="/nhs-prep" component={NhsPrep} />
        <Route path="/adaptive-learning" component={AdaptiveLearning} />
        <Route path="/smart-planner" component={SmartPlanner} />
        <Route path="/mentors" component={Mentors} />
        <Route path="/cultural-training" component={CulturalTraining} />
        <Route path="/video-osce" component={VideoOsce} />
        <Route path="/analytics" component={Analytics} />
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
