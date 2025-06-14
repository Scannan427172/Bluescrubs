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