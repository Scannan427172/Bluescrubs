# BlueScrubsPrep

**Professional PLAB Preparation** - Comprehensive medical exam training platform for international medical graduates seeking to practice medicine in the UK.

## Platform Overview

BlueScrubsPrep (formerly NHSprep) is a cutting-edge medical education platform designed to provide personalized, adaptive learning experiences for PLAB (Professional and Linguistic Assessments Board) exam preparation. The platform combines authentic medical content with advanced learning technologies to ensure comprehensive preparation for both PLAB 1 and PLAB 2 examinations.

## Key Features

### 📚 Comprehensive Content Library
- **5,528 authentic medical questions** across 11 major specialties
- **3,898 clinical OSCE stations** with realistic scenarios
- **Verified UK medical guidelines** integration (NICE, CKS, GMC, BNF)
- **Multi-format content** supporting MCQs, clinical scenarios, and practical assessments

### 🤖 Intelligent Learning System
- **Adaptive AI algorithm** with automatic difficulty adjustment
- **Real-time weakness detection** and targeted content delivery
- **Performance prediction model** for exam readiness assessment
- **Hybrid AI system** with independent fallbacks for reliability

### 🌍 Global Accessibility
- **39-language support** with medical terminology translations
- **International exam compatibility** (USMLE, AMC, MCCQE, SCHS, DHA, HAAD)
- **Cultural adaptation training** for diverse medical contexts
- **Multi-timezone support** for global learners

### ♿ Neurodiversity & Accessibility
- **8 accommodation types** (ADHD, Dyslexia, Autism, Dyspraxia, etc.)
- **Visual adaptations** (font sizing, contrast, color schemes)
- **Interaction enhancements** (extended time, larger buttons, audio support)
- **Persistent settings** with user preference memory

## Technical Architecture

### Frontend
- **React 18** with TypeScript and Vite
- **Radix UI components** with Tailwind CSS styling
- **Responsive design** with mobile-first approach
- **Progressive Web App** capabilities

### Backend
- **Node.js** with Express.js server
- **PostgreSQL database** with Drizzle ORM
- **Session management** with secure authentication
- **RESTful API design** with comprehensive error handling

### AI & Machine Learning
- **OpenAI GPT-4o integration** for intelligent tutoring
- **Independent content generation** using template-based systems
- **Performance analytics** with ML-driven insights
- **Adaptive learning algorithms** for personalized study paths

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL 16+
- Environment variables configured (see `.env.example`)

### Installation
```bash
# Install dependencies
npm install

# Set up database
npm run db:push

# Start development server
npm run dev
```

### Environment Setup
Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `OPENAI_API_KEY` - For AI tutoring features
- `SENDGRID_API_KEY` - For email notifications
- `STRIPE_SECRET_KEY` - For payment processing

## Platform Statistics

- **Question Bank**: 5,528 authentic medical questions
- **OSCE Stations**: 3,898 clinical scenarios
- **Language Support**: 39 languages
- **Medical Specialties**: 11 major areas
- **International Exams**: 6 supported systems
- **User Accommodations**: 8 neurodiversity types

## Recent Major Updates

### June 2025 - Version 2.0
- **Complete brand update** from NHSprep to BlueScrubsPrep
- **Professional PLAB Preparation** positioning and messaging
- **Enhanced hero banner** with video background and improved typography
- **Adaptive learning improvements** with better text contrast and usability
- **Desktop navigation enhancements** with comprehensive "More" dropdown
- **Mobile optimization** with iPhone-style design elements

### Content Improvements
- **5,000+ question generation** across all medical specialties
- **3,000+ OSCE station creation** with streamlined user format
- **UK medical guideline integration** with verified working links
- **Comprehensive mnemonics** including GET SMASHED, CHADS-VASc, CURB-65
- **Visual explanation formatting** with professional icons and color coding

### Technical Enhancements
- **Hybrid AI system** combining authentic content with AI enhancement
- **Independent translation system** with built-in medical dictionary
- **Complete database optimization** with efficient question storage
- **Enhanced mobile navigation** with sticky bottom controls
- **Improved accessibility** with proper contrast and text sizing

## Support & Documentation

### User Support
- Comprehensive onboarding process
- Interactive AI tutor for personalized assistance
- Community features for peer learning
- Performance tracking and analytics dashboard

### Developer Documentation
- Full API documentation available
- Component library with Storybook integration
- Database schema documentation
- Deployment guides for Replit platform

## License

MIT License - see LICENSE file for details

## Contributing

We welcome contributions from the medical education community. Please read our contribution guidelines and code of conduct before submitting pull requests.

## Contact

For support, feature requests, or partnership inquiries, please contact our team through the platform's built-in messaging system.

---

**BlueScrubsPrep** - Empowering international medical graduates to achieve their UK medical licensing goals through professional, comprehensive, and accessible PLAB preparation.