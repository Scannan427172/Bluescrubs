# Overview

This repository contains a comprehensive PLAB (Professional and Linguistic Assessments Board) exam preparation platform designed for international medical graduates seeking to practice medicine in the UK. The application integrates PLAB 1 knowledge testing with PLAB 2 clinical skills training, incorporating UK medical guidelines (NICE, CKS, GMC) and neurodiversity accommodations.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript and Vite
- **UI Library**: Radix UI components with Tailwind CSS styling
- **Component Architecture**: Modern React patterns with custom hooks
- **State Management**: React Query for server state, local state with hooks
- **Accessibility**: Comprehensive neurodiversity accommodations with 8 accommodation types
- **Responsive Design**: Mobile-first approach with responsive breakpoints

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript for type safety
- **API Design**: RESTful endpoints with proper error handling
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Authentication**: Replit Auth integration with session management

# Key Components

## Medical Education System
- **Question Banks**: 5000+ GMC-aligned PLAB questions across all medical specialties
- **OSCE Stations**: 200+ PLAB 2 clinical stations with BNF medication integration
- **AI-Powered Generation**: OpenAI and Anthropic integration for dynamic content creation
- **UK Guidelines Integration**: NICE, CKS, GMC standards embedded throughout

## Neurodiversity Support
- **Accommodation Types**: ADHD, Dyslexia, Autism, Dyspraxia, Processing Differences, Memory Support, Sensory Sensitivity, Executive Function
- **Visual Adaptations**: Font sizing, contrast adjustment, line spacing, color schemes
- **Interaction Enhancements**: Extended time, larger buttons, reduced clutter, audio support
- **Persistence**: LocalStorage-based settings with React hooks

## AI Integration
- **Question Generation**: Dynamic medical question creation with specialty-specific templates
- **Interactive Tutoring**: Personalized learning assistance with performance analysis
- **Video Analysis**: OSCE performance evaluation with detailed feedback
- **Content Summarization**: Study material optimization and flashcard generation

## Internationalization
- **Multi-language Support**: 35+ languages with medical terminology translations
- **Regional Adaptations**: Country-specific medical guidelines and cultural considerations
- **Exam Compatibility**: USMLE, AMC, MCCQE, and other international medical exams

# Data Flow

## User Journey
1. **Authentication**: Replit Auth handles user registration and login
2. **Onboarding**: Profile setup with location, timezone, and accessibility preferences
3. **Assessment**: Diagnostic tests determine current knowledge level
4. **Learning Path**: Personalized study plans based on PLAB 1/2 requirements
5. **Practice**: Interactive questions, OSCE stations, and AI tutoring
6. **Progress Tracking**: Analytics dashboard with specialty-specific performance metrics

## Database Operations
1. **User Management**: Profile data, progress tracking, session storage
2. **Content Delivery**: Question banks, OSCE stations, study materials
3. **Analytics Storage**: Performance metrics, learning analytics, recommendation data
4. **Accommodation Settings**: Neurodiversity preferences and visual customizations

# External Dependencies

## AI Services
- **OpenAI API**: GPT-4o for question generation, tutoring, and content analysis
- **Anthropic Claude**: Specialized medical content generation and explanation
- **Perplexity API**: Medical knowledge queries with citation support

## Database & Storage
- **Neon Postgres**: Primary database with connection pooling
- **Drizzle ORM**: Type-safe database operations with migration support
- **Session Storage**: PostgreSQL-based session management

## Communication Services
- **SendGrid**: Email notifications for study reminders and achievements
- **Stripe**: Payment processing for premium features
- **File Upload**: Multer for document and image handling

## Medical Content Integration
- **BNF (British National Formulary)**: Comprehensive medication database
- **NICE Guidelines**: Clinical decision support and evidence-based recommendations
- **GMC Standards**: Professional development and examination alignment

# Deployment Strategy

## Replit Deployment
- **Autoscale**: Automatic scaling based on demand
- **Build Process**: Vite frontend build with ESBuild server compilation
- **Environment**: Node.js 20 with PostgreSQL 16 integration
- **Port Configuration**: External port 80 mapping to internal port 5000

## Development Workflow
- **Dev Command**: `npm run dev` for development server with hot reload
- **Build Command**: `npm run build` for production compilation
- **Database Migration**: `npm run db:push` for schema updates
- **Type Checking**: `npm run check` for TypeScript validation

## Production Considerations
- **Database URL**: Environment-based PostgreSQL connection
- **API Keys**: Secure storage of OpenAI, Anthropic, SendGrid credentials
- **Session Security**: Encrypted session storage with proper TTL
- **Error Handling**: Comprehensive error boundaries and logging

# Changelog
- June 23, 2025: Initial setup
- June 23, 2025: Updated clinical guidelines with corrected NICE, CKS, BNF, and GMC URLs for UTI management
- June 23, 2025: Suspended all OpenAI activity per user request
- June 23, 2025: Synchronized frontend test interface with corrected UK medical guidance links
- June 23, 2025: Fixed broken CKS, BNF, and GMC links with verified working alternatives
- June 23, 2025: Updated CKS link to Patient.info UTI guidance due to CKS access restrictions
- June 23, 2025: Implemented authentic guideline-based question creation by working backwards from verified UK medical sources
- June 23, 2025: Updated questions to use realistic clinical scenarios instead of naming guidelines directly

# User Preferences

Preferred communication style: Simple, everyday language.