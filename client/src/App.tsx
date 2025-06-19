import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/hooks/useI18n";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Plab2Osce from "@/pages/plab2-osce";
import PLAB1New from "@/pages/plab1-new";
import InteractiveFlashcards from "@/pages/interactive-flashcards";
import ClinicalGuides from "@/pages/clinical-guides";
import GlobalScoreboard from "@/pages/global-scoreboard";
import Premium from "@/pages/premium";
import AskAI from "@/pages/ask-ai";
import AIStudyTools from "@/pages/ai-study-tools";
import Community from "@/pages/community";
import Pricing from "@/pages/pricing";
import AskNHSPrep from "@/pages/ask-nhs-prep";
import PLABAIDashboard from "@/pages/plab-ai-dashboard";
import InteractivePatientPage from "@/pages/interactive-patient-page";
import PersonalizedPaths from "@/pages/personalized-paths";
import VideoOSCE from "@/pages/video-osce";
import More from "@/pages/more";
import LanguageDemo from "@/pages/language-demo";
import GlobalPractice from "@/pages/global-practice";
import AdaptiveLearning from "@/pages/adaptive-learning";
import SmartPlanner from "@/pages/smart-planner";
import CulturalTraining from "@/pages/cultural-training";
import Mentors from "@/pages/mentors";
import Gamification from "@/pages/gamification";
import AdvancedDashboard from "@/pages/advanced-dashboard";
import NotFound from "@/pages/not-found";

// Mock user for demo - in real app this would come from auth context
const DEMO_USER = {
  username: "Dr. Sarah Ahmed",
  studyStreak: 12
};

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/home">
        <div className="flex flex-col min-h-screen">
          <Navigation user={DEMO_USER} />
          <div className="flex-1 pb-16 md:pb-0">
            <Home />
          </div>
        </div>
      </Route>
      <Route path="/dashboard">
        <div className="flex flex-col min-h-screen">
          <Navigation user={DEMO_USER} />
          <div className="flex-1 pb-16 md:pb-0">
            <Dashboard />
          </div>
        </div>
      </Route>
      <Route path="/advanced-dashboard">
        <div className="flex flex-col min-h-screen">
          <Navigation user={DEMO_USER} />
          <div className="flex-1 pb-16 md:pb-0">
            <AdvancedDashboard />
          </div>
        </div>
      </Route>

      <Route path="/plab1-new">
        <div className="flex flex-col min-h-screen">
          <Navigation user={DEMO_USER} />
          <div className="flex-1 pb-16 md:pb-0">
            <PLAB1New />
          </div>
        </div>
      </Route>
      <Route path="/plab1">
        <div className="flex flex-col min-h-screen">
          <Navigation user={DEMO_USER} />
          <div className="flex-1 pb-16 md:pb-0">
            <PLAB1New />
          </div>
        </div>
      </Route>
      <Route path="/flashcards">
        <div className="flex flex-col min-h-screen">
          <Navigation user={DEMO_USER} />
          <div className="flex-1 pb-16 md:pb-0">
            <InteractiveFlashcards />
          </div>
        </div>
      </Route>
      <Route path="/clinical-guides">
        <div className="flex flex-col min-h-screen">
          <Navigation user={DEMO_USER} />
          <div className="flex-1 pb-16 md:pb-0">
            <ClinicalGuides />
          </div>
        </div>
      </Route>
      <Route path="/global-scoreboard">
        <div className="flex flex-col min-h-screen">
          <Navigation user={DEMO_USER} />
          <div className="flex-1 pb-16 md:pb-0">
            <GlobalScoreboard />
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
      <Route path="/premium">
        <div className="flex flex-col min-h-screen">
          <Navigation user={DEMO_USER} />
          <div className="flex-1 pb-16 md:pb-0">
            <Premium />
          </div>
        </div>
      </Route>

      <Route path="/ask-ai">
        <div className="flex flex-col min-h-screen">
          <Navigation user={DEMO_USER} />
          <div className="flex-1 pb-16 md:pb-0">
            <AskAI />
          </div>
          <Footer />
        </div>
      </Route>

      <Route path="/ai-study-tools">
        <div className="flex flex-col min-h-screen">
          <Navigation user={DEMO_USER} />
          <div className="flex-1 pb-16 md:pb-0">
            <AIStudyTools />
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

      <Route path="/pricing">
        <div className="flex flex-col min-h-screen">
          <Navigation user={DEMO_USER} />
          <div className="flex-1 pb-16 md:pb-0">
            <Pricing />
          </div>
        </div>
      </Route>

      <Route path="/ask-nhs-prep">
        <div className="flex flex-col min-h-screen">
          <Navigation user={DEMO_USER} />
          <div className="flex-1 pb-16 md:pb-0">
            <AskNHSPrep />
          </div>
        </div>
      </Route>

      <Route path="/plab-ai-dashboard">
        <div className="flex flex-col min-h-screen">
          <Navigation user={DEMO_USER} />
          <div className="flex-1 pb-16 md:pb-0">
            <PLABAIDashboard />
          </div>
        </div>
      </Route>

      <Route path="/interactive-patient">
        <div className="flex flex-col min-h-screen">
          <Navigation user={DEMO_USER} />
          <div className="flex-1 pb-16 md:pb-0">
            <InteractivePatientPage />
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

      <Route path="/video-osce">
        <div className="flex flex-col min-h-screen">
          <Navigation user={DEMO_USER} />
          <div className="flex-1 pb-16 md:pb-0">
            <VideoOSCE />
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

      <Route path="/language-demo">
        <div className="flex flex-col min-h-screen">
          <Navigation user={DEMO_USER} />
          <div className="flex-1 pb-16 md:pb-0">
            <LanguageDemo />
          </div>
        </div>
      </Route>

      <Route path="/global-practice">
        <div className="flex flex-col min-h-screen">
          <Navigation user={DEMO_USER} />
          <div className="flex-1 pb-16 md:pb-0">
            <GlobalPractice />
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

      <Route path="/cultural-training">
        <div className="flex flex-col min-h-screen">
          <Navigation user={DEMO_USER} />
          <div className="flex-1 pb-16 md:pb-0">
            <CulturalTraining />
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

      <Route path="/gamification">
        <div className="flex flex-col min-h-screen">
          <Navigation user={DEMO_USER} />
          <div className="flex-1 pb-16 md:pb-0">
            <Gamification />
          </div>
        </div>
      </Route>

      <Route path="/analytics">
        <div className="flex flex-col min-h-screen">
          <Navigation user={DEMO_USER} />
          <div className="flex-1 pb-16 md:pb-0">
            <PLABAIDashboard />
          </div>
        </div>
      </Route>

      <Route path="/offline-mode">
        <div className="flex flex-col min-h-screen">
          <Navigation user={DEMO_USER} />
          <div className="flex-1 pb-16 md:pb-0">
            <Dashboard />
          </div>
        </div>
      </Route>

      <Route path="/nhs-prep">
        <div className="flex flex-col min-h-screen">
          <Navigation user={DEMO_USER} />
          <div className="flex-1 pb-16 md:pb-0">
            <AskNHSPrep />
          </div>
        </div>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;