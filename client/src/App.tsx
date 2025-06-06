import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
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
import More from "@/pages/more";
import Auth from "@/pages/auth";
import International from "@/pages/international";
import Premium from "@/pages/premium";
import StudyScheduler from "@/pages/study-scheduler";
import AdminTools from "@/pages/admin-tools";
import LegalCompliance from "@/pages/legal-compliance";
import NeurodiverseSupport from "@/pages/neurodiverse-support";

// Mock user for demo - in real app this would come from auth context
const DEMO_USER = {
  username: "Dr. Sarah Ahmed",
  studyStreak: 12
};

function Router() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Switch>
        {/* Landing page without navigation */}
        <Route path="/" component={Landing} />
        <Route path="/auth" component={Auth} />
        
        {/* App pages with navigation */}
        <Route path="/dashboard">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <Dashboard />
            </div>
          </div>
        </Route>
        <Route path="/home">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <Home />
            </div>
          </div>
        </Route>
        <Route path="/onboarding">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <Onboarding />
            </div>
          </div>
        </Route>
        <Route path="/plab1">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <Plab1Practice />
            </div>
          </div>
        </Route>
        <Route path="/plab2-osce">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <Plab2Osce />
            </div>
          </div>
        </Route>
        <Route path="/community">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <Community />
            </div>
          </div>
        </Route>
        <Route path="/nhs-prep">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <NhsPrep />
            </div>
          </div>
        </Route>
        <Route path="/adaptive-learning">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <AdaptiveLearning />
            </div>
          </div>
        </Route>
        <Route path="/smart-planner">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <SmartPlanner />
            </div>
          </div>
        </Route>
        <Route path="/mentors">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <Mentors />
            </div>
          </div>
        </Route>
        <Route path="/cultural-training">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <CulturalTraining />
            </div>
          </div>
        </Route>
        <Route path="/video-osce">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <VideoOsce />
            </div>
          </div>
        </Route>
        <Route path="/neurodiverse-support">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <NeurodiverseSupport />
            </div>
          </div>
        </Route>
        <Route path="/admin-tools">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <AdminTools />
            </div>
          </div>
        </Route>
        <Route path="/legal-compliance">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <LegalCompliance />
            </div>
          </div>
        </Route>
        <Route path="/analytics">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <Analytics />
            </div>
          </div>
        </Route>
        <Route path="/gamification">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <Gamification />
            </div>
          </div>
        </Route>
        <Route path="/offline-mode">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <OfflineMode />
            </div>
          </div>
        </Route>
        <Route path="/personalized-paths">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <PersonalizedPaths />
            </div>
          </div>
        </Route>
        <Route path="/more">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <More />
            </div>
          </div>
        </Route>
        <Route path="/international">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <International />
            </div>
          </div>
        </Route>
        <Route path="/premium">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <Premium />
            </div>
          </div>
        </Route>
        <Route path="/study-scheduler">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <StudyScheduler />
            </div>
          </div>
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
