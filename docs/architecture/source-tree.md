# AARC Capital Platform - Source Tree Documentation

## Overview

This document describes the complete source tree structure for the AARC Capital Investor Confidence Platform. The structure is designed to support scalable development, clear separation of concerns, and maintainable code organization.

---

## 1. Root Directory Structure

```
aarc_webtools/
├── .cursor/                    # Cursor IDE configuration
│   ├── mcp.json               # Model Context Protocol configuration
│   └── rules/                 # Cursor-specific rules and configurations
├── .github/                   # GitHub workflows and templates
│   └── workflows/             # CI/CD pipeline definitions
├── .vscode/                   # VS Code workspace settings
├── docs/                      # Project documentation
│   ├── architecture/          # Architecture and technical documentation
│   ├── prd/                   # Product Requirements Documents
│   ├── stories/               # User stories and epics
│   └── qa/                    # Quality assurance documentation
├── src/                       # Source code
├── tests/                     # Test files
├── web-bundles/               # BMAD agent configurations
├── docker-compose.yml         # Docker development environment
├── Dockerfile                 # Production Docker configuration
├── package.json               # Node.js dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── next.config.js             # Next.js configuration
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── .cursorrules               # Cursor AI rules
└── README.md                  # Project overview and setup instructions
```

---

## 2. Source Code Structure (`src/`)

### 2.1 Application Structure
```
src/
├── app/                       # Next.js App Router pages and layouts
│   ├── (auth)/               # Auth route group
│   │   ├── login/            # Login page
│   │   ├── register/         # Registration page
│   │   └── layout.tsx        # Auth layout
│   ├── (dashboard)/          # Dashboard route group
│   │   ├── portfolio/        # Portfolio management
│   │   ├── simulator/        # Risk-return simulator
│   │   ├── optimizer/        # Portfolio optimizer
│   │   └── layout.tsx        # Dashboard layout
│   ├── (marketing)/          # Marketing pages
│   │   ├── about/            # About page
│   │   ├── pricing/          # Pricing page
│   │   └── layout.tsx        # Marketing layout
│   ├── api/                  # API routes
│   │   ├── auth/             # Authentication endpoints
│   │   ├── portfolios/       # Portfolio management APIs
│   │   ├── optimization/     # Optimization engine APIs
│   │   └── analytics/        # Analytics and tracking APIs
│   ├── globals.css           # Global styles and Tailwind imports
│   ├── layout.tsx            # Root layout
│   ├── loading.tsx           # Global loading component
│   ├── not-found.tsx         # 404 page
│   └── page.tsx              # Home page
├── components/               # React components
│   ├── ui/                   # UI component library abstraction
│   │   ├── shadcn/           # shadcn/ui components
│   │   ├── heroui/           # HeroUI component wrappers
│   │   ├── 21st/             # 21st.dev components
│   │   └── index.ts          # Component library abstraction layer
│   ├── features/             # Feature-specific components
│   │   ├── portfolio/        # Portfolio-related components
│   │   ├── optimization/     # Optimization components
│   │   ├── simulator/        # Simulator components
│   │   └── analytics/        # Analytics components
│   ├── sections/             # Page section components
│   │   ├── hero/             # Hero sections
│   │   ├── features/         # Feature showcase sections
│   │   ├── testimonials/     # Testimonial sections
│   │   └── pricing/          # Pricing sections
│   ├── layout/               # Layout components
│   │   ├── header/           # Header and navigation
│   │   ├── footer/           # Footer components
│   │   ├── sidebar/          # Sidebar navigation
│   │   └── navigation/       # Navigation components
│   └── shared/               # Shared utility components
│       ├── loading/          # Loading states
│       ├── error/            # Error boundaries and displays
│       ├── forms/            # Form components
│       └── charts/           # Chart and visualization components
├── lib/                      # Utility libraries and configurations
│   ├── auth/                 # Authentication utilities
│   ├── database/             # Database connection and utilities
│   ├── optimization/         # Optimization algorithms
│   ├── validation/           # Input validation schemas
│   ├── utils.ts              # General utility functions
│   ├── tokens.ts             # Design tokens
│   ├── constants.ts          # Application constants
│   └── config.ts             # Application configuration
├── hooks/                    # Custom React hooks
│   ├── useAuth.ts            # Authentication hook
│   ├── usePortfolio.ts       # Portfolio management hook
│   ├── useOptimization.ts    # Optimization hook
│   └── useAnalytics.ts       # Analytics tracking hook
├── services/                 # Business logic and API services
│   ├── api/                  # API client services
│   ├── optimization/         # Optimization services
│   ├── portfolio/            # Portfolio services
│   ├── analytics/            # Analytics services
│   └── auth/                 # Authentication services
├── types/                    # TypeScript type definitions
│   ├── api.ts                # API response types
│   ├── portfolio.ts          # Portfolio-related types
│   ├── optimization.ts       # Optimization types
│   ├── auth.ts               # Authentication types
│   └── common.ts             # Common shared types
├── styles/                   # Styling files
│   ├── globals.css           # Global styles
│   ├── components.css        # Component-specific styles
│   └── design-systems/       # Design system styles
│       ├── glassmorphism.css # Glassmorphism design system
│       ├── neumorphism.css   # Neumorphism design system
│       └── brutalism.css     # Brutalism design system
└── middleware/               # Next.js middleware
    ├── auth.ts               # Authentication middleware
    ├── analytics.ts          # Analytics middleware
    └── rate-limit.ts         # Rate limiting middleware
```

---

## 3. Component Organization

### 3.1 UI Component Library (`src/components/ui/`)

The UI directory contains the abstraction layer for multiple component libraries:

```
src/components/ui/
├── index.ts                  # Main export file - abstraction layer
├── shadcn/                   # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── dialog.tsx
│   └── ...
├── heroui/                   # HeroUI component wrappers
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
├── 21st/                     # 21st.dev components
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
└── shared/                   # Shared UI utilities
    ├── cn.ts                 # Class name utility
    └── variants.ts           # Component variants
```

### 3.2 Feature Components (`src/components/features/`)

Feature components are domain-specific and organized by business functionality:

```
src/components/features/
├── portfolio/
│   ├── portfolio-card.tsx
│   ├── portfolio-list.tsx
│   ├── portfolio-form.tsx
│   └── portfolio-metrics.tsx
├── optimization/
│   ├── optimizer-form.tsx
│   ├── optimization-results.tsx
│   ├── risk-return-chart.tsx
│   └── constraint-editor.tsx
├── simulator/
│   ├── risk-return-simulator.tsx
│   ├── scenario-builder.tsx
│   └── simulation-results.tsx
└── analytics/
    ├── usage-dashboard.tsx
    ├── funnel-chart.tsx
    └── lead-scoring.tsx
```

### 3.3 Section Components (`src/components/sections/`)

Section components represent major page sections:

```
src/components/sections/
├── hero/
│   ├── hero-section.tsx
│   ├── hero-with-video.tsx
│   └── hero-with-form.tsx
├── features/
│   ├── feature-grid.tsx
│   ├── feature-comparison.tsx
│   └── feature-showcase.tsx
├── testimonials/
│   ├── testimonial-carousel.tsx
│   └── testimonial-grid.tsx
└── pricing/
    ├── pricing-table.tsx
    ├── pricing-calculator.tsx
    └── pricing-comparison.tsx
```

---

## 4. API Structure (`src/app/api/`)

The API directory follows RESTful conventions:

```
src/app/api/
├── auth/
│   ├── login/route.ts
│   ├── register/route.ts
│   ├── logout/route.ts
│   └── refresh/route.ts
├── portfolios/
│   ├── route.ts              # GET (list), POST (create)
│   └── [id]/
│       ├── route.ts          # GET, PUT, DELETE by ID
│       ├── assets/route.ts   # Portfolio assets management
│       └── optimize/route.ts # Portfolio optimization
├── optimization/
│   ├── mpt/route.ts          # Modern Portfolio Theory
│   ├── risk-parity/route.ts  # Risk Parity optimization
│   └── options/route.ts      # Options-inclusive optimization
├── simulator/
│   ├── risk-return/route.ts  # Risk-return simulation
│   ├── scenario/route.ts     # Scenario simulation
│   └── monte-carlo/route.ts  # Monte Carlo simulation
├── analytics/
│   ├── events/route.ts       # Event tracking
│   ├── funnel/route.ts       # Funnel analysis
│   └── leads/route.ts        # Lead scoring
└── health/route.ts           # Health check endpoint
```

---

## 5. Services Layer (`src/services/`)

Services contain business logic and external API integrations:

```
src/services/
├── api/
│   ├── client.ts             # Base API client
│   ├── portfolio.ts          # Portfolio API client
│   ├── optimization.ts       # Optimization API client
│   └── analytics.ts          # Analytics API client
├── optimization/
│   ├── mpt-optimizer.ts      # Modern Portfolio Theory
│   ├── risk-parity.ts        # Risk Parity algorithm
│   ├── options-optimizer.ts  # Options-inclusive optimization
│   └── monte-carlo.ts        # Monte Carlo simulation
├── portfolio/
│   ├── portfolio-service.ts  # Portfolio management
│   ├── asset-service.ts      # Asset management
│   └── metrics-service.ts    # Portfolio metrics calculation
├── analytics/
│   ├── event-tracker.ts      # Event tracking service
│   ├── funnel-analyzer.ts    # Funnel analysis
│   └── lead-scorer.ts        # Lead scoring algorithm
└── auth/
    ├── auth-service.ts       # Authentication service
    ├── token-service.ts      # Token management
    └── permission-service.ts # Permission checking
```

---

## 6. Database Structure

### 6.1 Database Schema Organization
```
database/
├── migrations/               # Database migrations
│   ├── 001_initial_schema.sql
│   ├── 002_add_portfolios.sql
│   ├── 003_add_optimization.sql
│   └── ...
├── seeds/                    # Database seed data
│   ├── 001_users.sql
│   ├── 002_sample_portfolios.sql
│   └── ...
├── schema.sql                # Current schema definition
└── init/                     # Initialization scripts
    └── 01-init.sql
```

### 6.2 Key Database Tables
```sql
-- Users and Authentication
users
user_sessions
user_preferences

-- Portfolio Management
portfolios
portfolio_assets
portfolio_metrics
portfolio_optimizations

-- Optimization Results
optimization_results
optimization_constraints
optimization_parameters

-- Analytics and Tracking
user_events
session_analytics
funnel_events
lead_scores

-- Content Management
educational_content
tutorials
glossary_terms
```

---

## 7. Configuration Files

### 7.1 Environment Configuration
```
.env.example                  # Environment variables template
.env.local                    # Local development (gitignored)
.env.development              # Development environment
.env.staging                  # Staging environment
.env.production               # Production environment
```

### 7.2 Build and Development Configuration
```
package.json                  # Dependencies and scripts
tsconfig.json                 # TypeScript configuration
next.config.js                # Next.js configuration
tailwind.config.ts            # Tailwind CSS configuration
postcss.config.js             # PostCSS configuration
eslint.config.js              # ESLint configuration
prettier.config.js            # Prettier configuration
jest.config.js                # Jest testing configuration
```

---

## 8. Testing Structure

### 8.1 Test Organization
```
tests/
├── unit/                     # Unit tests
│   ├── components/           # Component unit tests
│   ├── services/             # Service unit tests
│   ├── utils/                # Utility function tests
│   └── hooks/                # Custom hook tests
├── integration/              # Integration tests
│   ├── api/                  # API integration tests
│   ├── database/             # Database integration tests
│   └── optimization/         # Optimization algorithm tests
├── e2e/                      # End-to-end tests
│   ├── auth.spec.ts          # Authentication flow
│   ├── portfolio.spec.ts     # Portfolio management flow
│   └── optimization.spec.ts  # Optimization workflow
├── fixtures/                 # Test data and fixtures
│   ├── portfolios.json
│   ├── users.json
│   └── market-data.json
└── setup/                    # Test setup and utilities
    ├── test-utils.tsx
    ├── mock-data.ts
    └── test-db.ts
```

---

## 9. Documentation Structure

### 9.1 Architecture Documentation
```
docs/architecture/
├── index.md                  # Architecture overview
├── tech-stack-ui.md          # UI technology stack
├── tech-stack-flexible-ui.md # Flexible UI system
├── figma_integration_guide.md # Figma integration
├── coding-standards.md       # Coding standards
├── source-tree.md            # This file
└── api-design.md             # API design guidelines
```

### 9.2 Product Documentation
```
docs/prd/
├── index.md                  # PRD overview
├── project-aarc-capital-investor-confidence-platform.md
└── epic-*.md                 # Epic-specific PRDs
```

### 9.3 User Stories
```
docs/stories/
├── epic-1-mvp-foundation.md
├── epic-2-v1-pro-features.md
├── epic-3-v2-proprietary-optimizers.md
├── epic-4-compliance-security.md
└── 1.*.md                    # Individual user stories
```

---

## 10. Deployment and Infrastructure

### 10.1 Docker Configuration
```
Dockerfile                    # Production container
docker-compose.yml            # Development environment
docker-compose.prod.yml       # Production environment
.dockerignore                 # Docker ignore rules
```

### 10.2 CI/CD Configuration
```
.github/workflows/
├── ci.yml                    # Continuous integration
├── deploy-staging.yml        # Staging deployment
├── deploy-production.yml     # Production deployment
└── security-scan.yml         # Security scanning
```

---

## 11. Development Tools Configuration

### 11.1 IDE Configuration
```
.vscode/
├── settings.json             # VS Code workspace settings
├── extensions.json           # Recommended extensions
└── launch.json               # Debug configurations

.cursor/
├── mcp.json                  # Model Context Protocol config
└── rules/                    # Cursor-specific rules
    ├── ui-design-figma-rules.mdc
    └── research.mdc
```

### 11.2 Code Quality Tools
```
.cursorrules                  # Cursor AI rules
.eslintrc.js                  # ESLint configuration
.prettierrc                   # Prettier configuration
.husky/                       # Git hooks
├── pre-commit
└── commit-msg
```

---

## 12. File Naming Conventions

### 12.1 Component Files
- **React Components**: `kebab-case.tsx` (e.g., `portfolio-card.tsx`)
- **Page Components**: `page.tsx` (Next.js App Router convention)
- **Layout Components**: `layout.tsx`
- **API Routes**: `route.ts`

### 12.2 Utility Files
- **Services**: `kebab-case.ts` (e.g., `portfolio-service.ts`)
- **Hooks**: `use-kebab-case.ts` (e.g., `use-portfolio.ts`)
- **Types**: `kebab-case.ts` (e.g., `portfolio-types.ts`)
- **Utils**: `kebab-case.ts` (e.g., `date-utils.ts`)

### 12.3 Configuration Files
- **Config Files**: `kebab-case.config.js` (e.g., `tailwind.config.ts`)
- **Environment Files**: `.env.environment` (e.g., `.env.local`)

---

## 13. Import/Export Patterns

### 13.1 Component Exports
```typescript
// ✅ DO: Use named exports for components
export function PortfolioCard({ portfolio }: PortfolioCardProps) {
  // Component implementation
}

// ✅ DO: Export types separately
export type { PortfolioCardProps };

// ✅ DO: Use index files for clean imports
// src/components/features/portfolio/index.ts
export { PortfolioCard } from './portfolio-card';
export { PortfolioList } from './portfolio-list';
export type { PortfolioCardProps } from './portfolio-card';
```

### 13.2 Service Exports
```typescript
// ✅ DO: Use class-based services with clear interfaces
export class PortfolioService {
  async getPortfolio(id: string): Promise<Portfolio> {
    // Implementation
  }
}

// ✅ DO: Export service instances
export const portfolioService = new PortfolioService();
```

---

## 14. Asset Organization

### 14.1 Static Assets
```
public/
├── images/                   # Static images
│   ├── logos/                # Company logos
│   ├── icons/                # Icon files
│   ├── illustrations/        # Illustrations
│   └── screenshots/          # Screenshots
├── fonts/                    # Custom fonts
├── favicon.ico               # Favicon
└── robots.txt                # SEO robots file
```

### 14.2 Generated Assets
```
src/assets/                   # Processed assets
├── icons/                    # Generated icon components
├── images/                   # Optimized images
└── styles/                   # Generated stylesheets
```

---

## 15. Monitoring and Logging

### 15.1 Logging Structure
```
logs/
├── application.log           # Application logs
├── error.log                 # Error logs
├── access.log                # Access logs
└── audit.log                 # Audit trail logs
```

### 15.2 Monitoring Configuration
```
monitoring/
├── prometheus.yml            # Prometheus configuration
├── grafana/                  # Grafana dashboards
└── alerts/                   # Alert rules
```

---

This source tree structure provides a solid foundation for the AARC Capital platform, ensuring scalability, maintainability, and clear separation of concerns. The structure should evolve with the project's needs while maintaining these core organizational principles.
