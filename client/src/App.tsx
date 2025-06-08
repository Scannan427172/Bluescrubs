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
import StorageManagement from "@/pages/storage-management";
import SecurityCenter from "@/pages/security-center";
import SystemSettings from "@/pages/system-settings";
import Features from "@/pages/features";
import MedicalEducationPlatform from "@/pages/medical-education-platform";
import ProfessionalDevelopment from "@/pages/professional-development";
import CareerSupport from "@/pages/career-support";
import FeaturesList from "@/pages/features-list";
import PlabInfo from "@/pages/plab-info";
import GlobalExams from "@/pages/global-exams";
import USMLE from "@/pages/usmle";
import AMC from "@/pages/amc";
import MRCP from "@/pages/mrcp";
import IELTSMedical from "@/pages/ielts-medical";
import USMLETest from "@/pages/usmle-test";
import AMCTest from "@/pages/amc-test";
import MCCEETest from "@/pages/mccee-test";
import MRCPTest from "@/pages/mrcp-test";
import MiddleEastTest from "@/pages/middle-east-test";
import IELTSMedicalTest from "@/pages/ielts-medical-test";
import Disclaimer from "@/pages/disclaimer";
import WhoAreNHSprep from "@/pages/who-are-nhsprep";
import LanguageDemo from "@/pages/language-demo";
import Pricing from "@/pages/pricing";
import GMCPractice from "@/pages/gmc-practice";
import PLAB1New from "@/pages/plab1-new";
import ContentStrategy from "@/pages/content-strategy";
import GlobalPractice from "@/pages/global-practice";
import AdvancedAnalytics from "@/pages/advanced-analytics";
import AIStudyBuddy from "@/pages/ai-study-buddy";
import CulturalBridge from "@/pages/cultural-bridge";
import NeurodiverseSupport from "@/pages/neurodiverse-support";
import QuestionBankStatus from "@/pages/question-bank-status";
import AIGenerationDemo from "@/pages/ai-generation-demo";

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

        <Route path="/plab1-new">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <PLAB1New />
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
        <Route path="/ai-generation-demo">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <AIGenerationDemo />
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
        <Route path="/storage-management">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <StorageManagement />
            </div>
          </div>
        </Route>
        <Route path="/security-center">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <SecurityCenter />
            </div>
          </div>
        </Route>
        <Route path="/system-settings">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <SystemSettings />
            </div>
          </div>
        </Route>
        <Route path="/features">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <Features />
            </div>
          </div>
        </Route>
        <Route path="/medical-education-platform">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <MedicalEducationPlatform />
            </div>
          </div>
        </Route>
        <Route path="/professional-development">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <ProfessionalDevelopment />
            </div>
          </div>
        </Route>
        <Route path="/career-support">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <CareerSupport />
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
        <Route path="/features-list">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <FeaturesList />
            </div>
          </div>
        </Route>
        <Route path="/plab-info">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <PlabInfo />
            </div>
          </div>
        </Route>
        <Route path="/global-exams">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <GlobalExams />
            </div>
          </div>
        </Route>
        <Route path="/usmle">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <USMLE />
            </div>
          </div>
        </Route>
        <Route path="/amc">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <AMC />
            </div>
          </div>
        </Route>
        <Route path="/mrcp">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <MRCP />
            </div>
          </div>
        </Route>
        <Route path="/ielts-medical">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <IELTSMedical />
            </div>
          </div>
        </Route>
        
        {/* Test Routes */}
        <Route path="/usmle-test">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <USMLETest />
            </div>
          </div>
        </Route>
        <Route path="/amc-test">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <AMCTest />
            </div>
          </div>
        </Route>
        <Route path="/mccee-test">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <MCCEETest />
            </div>
          </div>
        </Route>
        <Route path="/mrcp-test">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <MRCPTest />
            </div>
          </div>
        </Route>
        <Route path="/middle-east-test">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <MiddleEastTest />
            </div>
          </div>
        </Route>
        <Route path="/ielts-medical-test">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <IELTSMedicalTest />
            </div>
          </div>
        </Route>
        
        {/* Language and Accessibility */}
        <Route path="/language-demo">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <LanguageDemo />
            </div>
          </div>
        </Route>

        {/* Pricing */}
        <Route path="/pricing">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <Pricing />
            </div>
          </div>
        </Route>

        {/* GMC Practice */}
        <Route path="/gmc-practice">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <GMCPractice />
            </div>
          </div>
        </Route>

        {/* Content Strategy */}
        <Route path="/content-strategy">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <ContentStrategy />
            </div>
          </div>
        </Route>

        {/* Global Practice */}
        <Route path="/global-practice">
          <div className="flex flex-col min-h-screen">
            <Navigation user={DEMO_USER} />
            <div className="flex-1 pb-16 md:pb-0">
              <GlobalPractice />
            </div>
          </div>
        </Route>

        {/* Legal and Disclaimer Pages */}
        <Route path="/disclaimer" component={Disclaimer} />
        <Route path="/who-are-nhsprep" component={WhoAreNHSprep} />
        
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;
