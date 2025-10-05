# AARC Capital Investor Confidence Platform - Architecture

## 1. Architectural Goals
- Deliver **scalable, secure, compliant** web platform
- Support **freemium access control** (free vs. subscription tiers)
- Integrate **proprietary optimization algorithms** (risk parity + options-inclusive)
- Enable **educational layering** across tools
- Funnel analytics → track potential high-net-worth leads for AARC Capital
- **Design-to-code workflow** with Figma integration for rapid UI development

---

## 2. High-Level System Components

### 2.1 Frontend (Web Application)
- **Framework**: Next.js 14+ (App Router) with TypeScript
- **UI Architecture**: Flexible component library system supporting multiple design systems
  - **Component Libraries**: shadcn/ui, HeroUI (NextUI), 21st.dev components
  - **Design Systems**: Default, Glassmorphism, Neumorphism, Brutalism, Custom
  - **Styling**: Tailwind CSS with design tokens and combo classes
- **Design Integration**: Figma MCP (Model Context Protocol) for design-to-code workflow
- **Visualization**: D3.js, Plotly.js for payoff diagrams, risk-return charts
- **UX Strategy**: Progressive disclosure - simple defaults for beginners, expandable for advanced users
- **Authentication**: OAuth2/SSO integration with subscription management UI

### 2.2 Backend (Application Layer)
- **Runtime**: Node.js with Express.js framework
- **Proprietary Optimization Engines**:
     - Hierarchical Risk Parity Optimizer  
     - Options-Inclusive Portfolio Optimizer  
  - Trade Optimizer with Payoff Diagrams
- **API Design**: RESTful APIs with OpenAPI/Swagger documentation
- **Access Control**: Role-based permissions (free vs. Basic Pro vs. Advanced Pro)
- **Caching**: Redis for frequently used datasets and session management

### 2.3 Data Layer
- **Primary Database**: PostgreSQL for user data, subscriptions, progress tracking
- **Market Data**: 
  - MVP: Delayed/historical feeds from financial data providers
  - Future: Real-time feeds as demand grows
- **Caching Layer**: Redis for historical prices, calculation results, session data
- **File Storage**: Cloud storage for user uploads, generated reports

### 2.4 Analytics & Funnel Tracking
- **Event Logging**: Tool usage, time-in-session, educational completions
- **Funnel Analytics**: Identify potential HNW users through behavior patterns
- **CRM Integration**: Lead capture and scoring for AARC Capital sales team
- **Performance Monitoring**: Application metrics and user experience tracking

### 2.5 Content/Education Layer
- **CMS**: Strapi (self-hosted) for educational content management
- **Content Strategy**: Low-churn educational pathways with freemium paywall
- **Content Model**: Pathway → Module → Lesson hierarchy with tier-based access
- **Rendering Strategy**: ISR (Incremental Static Regeneration) with webhook revalidation
- **Educational Progression**: Guided tutorials and skill-based unlocking
- **Multimedia Support**: Rich text content, assets, and downloadable resources

### 2.6 Infrastructure
- **Frontend Hosting**: Vercel for Next.js deployment with ISR
- **CMS Hosting**: Self-hosted Strapi on Fly.io/Render/Railway
- **Database**: PostgreSQL for Strapi and user data
- **AARC Tools**: Containerized microservice for proprietary optimization algorithms
- **Caching**: Redis for session management and optimization results
- **Security**: AES-256 encryption at rest, TLS in transit
- **Monitoring**: Application performance monitoring and alerting

---

## 3. UI/UX Architecture

### 3.1 Design System Strategy
- **Multi-Library Support**: Abstraction layer allowing seamless switching between component libraries
- **Design System Flexibility**: Support for multiple design aesthetics (glassmorphism, neumorphism, brutalism)
- **Semantic Naming**: Component names based on purpose, not visual properties
- **Design Tokens**: Centralized color, spacing, typography, and component tokens

### 3.2 Figma Integration
- **MCP Server**: Official Figma MCP for design-to-code workflow
- **Automated Generation**: Convert Figma designs to semantic React components
- **Design Token Extraction**: Automatic extraction of colors, spacing, typography from Figma
- **Component Mapping**: Intelligent mapping of Figma components to shadcn/ui primitives

### 3.3 Component Architecture
```
src/components/
├── ui/                    # Component library abstraction layer
├── features/              # Domain-specific components (ProductCard, UserProfile)
├── sections/              # Page sections (HeroSection, Footer)
├── layout/                # Layout components (Header, Sidebar)
└── shared/                # Utility components (LoadingSpinner, ErrorBoundary)
```

---

## 4. Security & Compliance

### 4.1 Data Protection
- **Encryption**: AES-256 at rest, TLS 1.3 in transit
- **Authentication**: OAuth2/OpenID Connect with MFA support
- **Authorization**: Role-based access control with fine-grained permissions
- **Data Privacy**: GDPR/CCPA compliance with user consent management

### 4.2 Financial Compliance
- **Disclaimers**: All outputs framed as education/simulation only
- **Regulatory Compliance**: Financial content review and approval process
- **Audit Trail**: Complete logging of user actions and data access
- **Proprietary Algorithm Protection**: Secure access controls for AARC intellectual property

---

## 5. Scalability & Performance

### 5.1 Horizontal Scaling
- **Microservices Architecture**: Modular services for different optimization engines
- **Load Balancing**: Application-level load balancing with health checks
- **Database Scaling**: Read replicas and connection pooling
- **Caching Strategy**: Multi-layer caching (Redis, CDN, browser)

### 5.2 Performance Optimization
- **Code Splitting**: Dynamic imports for optimization engines
- **Image Optimization**: Next.js Image component with WebP support
- **Bundle Optimization**: Tree shaking and dead code elimination
- **API Optimization**: GraphQL for complex data fetching, REST for simple operations

---

## 6. Strapi CMS Integration

### 6.1 Content Architecture
- **Content Model**: Pathway → Module → Lesson hierarchy
- **Tier-Based Access**: Free vs Premium content gating
- **SEO Optimization**: Built-in SEO fields (title, description, ogImage)
- **Draft/Publish**: Content preview and staged publishing

### 6.2 ISR Strategy
- **Static Generation**: All public pages pre-generated at build time
- **Incremental Regeneration**: Pages regenerate on-demand with caching
- **Webhook Revalidation**: Strapi webhooks trigger targeted cache invalidation
- **Tag-Based Caching**: Granular cache control for specific content types

### 6.3 Content Workflow
1. **Content Creation**: Editors create content in Strapi admin
2. **Preview**: Draft content available for review
3. **Publish**: Content published triggers webhook to Vercel
4. **Revalidation**: Specific pages revalidated based on content type
5. **Deployment**: Updated content live without full rebuild

### 6.4 AARC Tools Separation
- **CMS Scope**: Educational content only (pathways, lessons, announcements)
- **Proprietary Tools**: Separate microservice for optimization algorithms
- **Paywall Logic**: Subscription management outside CMS
- **Integration**: Frontend calls AARC tools API based on user tier

---

## 7. Development Workflow

### 7.1 Design-to-Code Process
1. **Design in Figma**: Create components with semantic naming
2. **Extract Tokens**: Use MCP to extract design tokens
3. **Generate Components**: Automated component generation with semantic naming
4. **Review & Refine**: Manual review for accessibility and responsive design
5. **Integration**: Seamless integration into existing component system

### 7.2 Code Standards
- **TypeScript**: Strict typing for all components and APIs
- **Semantic Naming**: Purpose-based component and class naming
- **Design Tokens**: Centralized design system management
- **Accessibility**: WCAG 2.1 AA compliance
- **Testing**: Unit, integration, and visual regression testing

---

## 8. Technology Stack Summary

### 8.1 Frontend
- **Framework**: Next.js 14+ (App Router)
- **Hosting**: Vercel with ISR and webhook revalidation
- **Language**: TypeScript
- **Styling**: Tailwind CSS with design tokens and combo classes
- **Component Libraries**: shadcn/ui (primary), HeroUI (alternative), 21st.dev
- **Design Integration**: Figma MCP for design-to-code workflow
- **Visualization**: D3.js, Plotly.js for financial charts
- **State Management**: React Context + Zustand

### 8.2 Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (Strapi + user data)
- **Caching**: Redis for sessions and optimization results
- **API**: RESTful with OpenAPI documentation
- **CMS**: Strapi (self-hosted) for educational content

### 8.3 Infrastructure
- **Frontend**: Vercel (Next.js deployment)
- **CMS**: Self-hosted Strapi on Fly.io/Render/Railway
- **AARC Tools**: Containerized microservice (Node.js/Python)
- **Database**: PostgreSQL with connection pooling
- **Monitoring**: Application Performance Monitoring
- **CI/CD**: GitHub Actions or Azure DevOps

---

## 9. Roadmap Alignment

### 9.1 MVP (Epic 1)
- Free risk-return simulator
- Educational content system
- Basic diversification checker
- Lite what-if simulator
- Platform infrastructure setup

### 9.2 V1 Pro Features (Epic 2)
- Subscription management system
- MPT portfolio optimizer
- Scenario simulator
- Guided tutorial system
- Analytics and lead funnel

### 9.3 V2 Proprietary Tools (Epic 3)
- Hierarchical risk parity engine
- Options-integrated optimizer
- Trade optimizer with payoff diagrams
- Sandbox learning environment
- Community advanced analytics

### 9.4 Compliance & Security (Epic 4)
- Security and data protection
- Regulatory compliance framework
- Performance and scalability
- Audit and reporting systems

---

## 10. Related Documentation

- [UI Tech Stack Guide](./tech-stack-ui.md) - Detailed frontend architecture
- [Flexible UI Integration](./tech-stack-flexible-ui.md) - Multi-library component system
- [Figma Integration Guide](./figma_integration_guide.md) - Design-to-code workflow
- [Strapi Integration](./strapi-integration.md) - CMS integration and ISR strategy
- [Coding Standards](./coding-standards.md) - Development guidelines
- [Source Tree](./source-tree.md) - Project structure documentation

