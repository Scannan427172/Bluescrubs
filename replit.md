# Overview

BlueScrubsPrep is a comprehensive platform designed for international medical graduates preparing for the PLAB (Professional and Linguistic Assessments Board) exam to practice medicine in the UK. It offers "Professional PLAB Preparation" through an integrated ecosystem for PLAB 1 knowledge testing and PLAB 2 clinical skills training. The platform incorporates UK medical guidelines (NICE, CKS, GMC) and provides neurodiversity accommodations. It has evolved into a robust medical education system with a focus on comprehensive, authentic content and advanced learning features.

# User Preferences

Preferred communication style: Simple, everyday language.

## Image Licensing Requirements
When using Creative Commons or Public Domain images:
• Always verify the license of each image individually
• For CC BY licenses, include:
  - Creator name
  - License type
  - Source link
  - Indicate if modified
• Ensure all medical images meet educational use standards
• Document attribution in code comments and user-facing displays

## Trusted Medical Image Sources
**Wikimedia Commons**
• Content: Large repository of medical and dermatological images
• License: Mostly Creative Commons (CC BY, CC BY-SA) or Public Domain
• Use: ✅ Allowed in commercial apps with proper attribution
• Link: https://commons.wikimedia.org
• Requirements: Check each image license, attribute author and license

**Open-i (U.S. National Library of Medicine)**
• Content: Clinical and research images including radiology, dermatology
• License: Mostly public domain (verify per image)
• Use: ✅ Free for educational and commercial use
• Link: https://openi.nlm.nih.gov
• Requirements: Verify per image, especially journal sources

**Unsplash**
• Content: High-quality medical and health-related photography
• License: Unsplash License (free for commercial and educational use)
• Use: ✅ Free for educational and commercial use without attribution required
• Link: https://unsplash.com
• Requirements: No attribution required but recommended for courtesy

## Image Attribution Template
For CC BY licensed images, use this format:
```
"Image Title" by Author Name is licensed under CC BY 4.0
Source: [original URL]
Modified: [describe any changes made]
```

For Public Domain images:
```
"Image Title" - Public Domain
Source: [original URL]
Repository: [Wikimedia Commons/Open-i]
```

# System Architecture

## Frontend
- **Framework**: React with TypeScript and Vite
- **UI Library**: Radix UI components with Tailwind CSS
- **Design**: Mobile-first, responsive, with neurodiversity accommodations (8 types including visual and interaction enhancements)
- **State Management**: React Query for server state, local state with hooks
- **UI/UX Decisions**: Blue gradients with purple accents, video hero banners, clean professional fonts, glassmorphism effects for mobile navigation, standardized 3-level difficulty (Basic, Intermediate, Advanced).

## Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **API Design**: RESTful
- **Database ORM**: Drizzle ORM
- **Authentication**: Replit Auth

## Key Features
- **Medical Education System**: 5000+ GMC-aligned PLAB questions and 200+ PLAB 2 clinical OSCE stations integrated with BNF, NICE, CKS, and GMC guidelines. Includes AI-powered dynamic content generation.
- **Neurodiversity Support**: Accommodations for ADHD, Dyslexia, Autism, Dyspraxia, Processing Differences, Memory Support, Sensory Sensitivity, and Executive Function, with visual and interaction adaptations.
- **AI Integration**: OpenAI (GPT-4o) for question generation, interactive tutoring, video analysis, and content summarization. Features an adaptive learning algorithm, real-time weakness detection, performance prediction, and smart question generation.
- **Internationalization**: Support for 35+ languages with medical terminology and regional adaptations for various international medical exams (USMLE, AMC, MCCQE).
- **Data Flow**: User authentication via Replit Auth, personalized onboarding, diagnostic assessments, adaptive learning paths, practice modules, and progress tracking with analytics.
- **Brand Identity**: BlueScrubsPrep, "Professional PLAB Preparation", targeting international medical graduates.

# External Dependencies

## AI Services
- **OpenAI API**: GPT-4o for various AI functionalities.
- **Perplexity API**: Medical knowledge queries.

## Database & Storage
- **Neon Postgres**: Primary database.
- **Drizzle ORM**: For type-safe database operations.
- **PostgreSQL**: For session management.

## Communication Services
- **SendGrid**: Email notifications.
- **Stripe**: Payment processing.

## Medical Content Integration
- **BNF (British National Formulary)**: Medication database.
- **NICE Guidelines**: Clinical decision support.
- **GMC Standards**: Professional development and exam alignment.