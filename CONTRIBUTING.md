# Contributing to BlueScrubsPrep

Thank you for your interest in contributing to BlueScrubsPrep! This document provides guidelines for contributing to our Professional PLAB Preparation platform.

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of background or experience level. Please be respectful and professional in all interactions.

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL 16+
- Basic knowledge of React, TypeScript, and medical education concepts
- Understanding of PLAB examination requirements

### Development Setup
1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Set up environment variables (see `.env.example`)
5. Run database migrations: `npm run db:push`
6. Start development server: `npm run dev`

## Project Structure

```
├── client/               # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components and routing
│   │   └── lib/          # Utility functions and hooks
├── server/               # Express.js backend
│   ├── routes.ts         # API endpoint definitions
│   └── storage.ts        # Database operations
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schema definitions
└── docs/                 # Documentation files
```

## Contributing Guidelines

### Medical Content Contributions

#### Question Bank Content
- All medical questions must be based on authentic UK medical guidelines
- Questions should reference verified sources (NICE, CKS, GMC, BNF)
- Include comprehensive explanations with clinical reasoning
- Follow the established question format with 5 options (A-E)
- Add relevant mnemonics and memory aids where applicable

#### OSCE Station Content
- Clinical scenarios must reflect realistic PLAB 2 exam conditions
- Include detailed marking criteria and learning objectives
- Provide clear candidate and patient instructions
- Ensure scenarios cover diverse medical specialties
- Include appropriate neurodiversity accommodations

### Code Contributions

#### Frontend Development
- Use TypeScript for all new components
- Follow React best practices with functional components and hooks
- Implement responsive design with mobile-first approach
- Ensure accessibility compliance (WCAG 2.1 AA)
- Use Tailwind CSS for styling with design system consistency

#### Backend Development
- Maintain RESTful API design principles
- Use Drizzle ORM for all database operations
- Implement proper error handling and validation
- Follow security best practices for authentication
- Write comprehensive tests for new features

#### Database Schema Changes
- Use Drizzle migrations for schema updates
- Update type definitions in `shared/schema.ts`
- Ensure backward compatibility where possible
- Document schema changes in commit messages

### UI/UX Guidelines

#### Design Principles
- Prioritize neurodiversity accommodations in all interfaces
- Maintain consistent BlueScrubsPrep branding and color scheme
- Implement clear visual hierarchy with proper contrast ratios
- Design for multi-language support and internationalization
- Ensure mobile responsiveness across all screen sizes

#### Accessibility Requirements
- Support keyboard navigation throughout the application
- Provide alternative text for all images and media
- Implement proper ARIA labels and semantic HTML
- Test with screen readers and assistive technologies
- Offer multiple accommodation options for different learning needs

### Internationalization

#### Language Support
- Use the established translation system for new text content
- Maintain medical terminology accuracy across all languages
- Consider cultural context in medical scenarios
- Test UI layout with longer text strings in various languages

## Submission Process

### Pull Request Guidelines
1. **Create a feature branch** from `main` with descriptive naming
2. **Write clear commit messages** following conventional commit format
3. **Include comprehensive tests** for new functionality
4. **Update documentation** including README.md and CHANGELOG.md
5. **Ensure all checks pass** including linting, type checking, and tests

### Commit Message Format
```
type(scope): brief description

Detailed explanation of changes if needed

- List specific changes made
- Include any breaking changes
- Reference issue numbers if applicable
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Review Process
- All pull requests require review from at least one maintainer
- Medical content requires additional review from qualified medical professionals
- Large changes should be discussed in issues before implementation
- Feedback should be addressed promptly and professionally

## Quality Standards

### Medical Accuracy
- All medical content must be reviewed for clinical accuracy
- References should be current and from authoritative sources
- Scenarios should reflect current UK medical practice standards
- Content should align with current PLAB examination requirements

### Code Quality
- Follow TypeScript strict mode requirements
- Maintain test coverage above 80% for new features
- Use ESLint and Prettier for code formatting
- Write self-documenting code with clear variable names

### Performance Standards
- Optimize for fast loading times and responsive interactions
- Implement efficient database queries and caching where appropriate
- Ensure mobile performance on slower devices and connections
- Monitor and optimize bundle sizes for frontend code

## Documentation Requirements

### Code Documentation
- Include JSDoc comments for all public functions and components
- Document complex algorithms and business logic
- Provide examples in documentation for reusable components
- Keep documentation up-to-date with code changes

### User Documentation
- Update user guides for new features
- Include screenshots and examples in documentation
- Maintain accuracy of setup and installation instructions
- Document configuration options and environment variables

## Getting Help

### Resources
- Review existing documentation in `/docs` directory
- Check the [replit.md](./replit.md) file for project context and decisions
- Look through closed issues and pull requests for similar problems
- Join our community discussions for questions and collaboration

### Support Channels
- Create GitHub issues for bugs and feature requests
- Use discussions for questions and community collaboration
- Contact maintainers for urgent security issues
- Reference medical education experts for content validation

## Recognition

Contributors will be recognized in:
- Project documentation and acknowledgments
- Release notes for significant contributions
- Community showcases for innovative features
- Special recognition for medical content expertise

Thank you for helping us improve BlueScrubsPrep and supporting international medical graduates in their PLAB preparation journey!