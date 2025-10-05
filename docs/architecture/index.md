# AARC Capital Platform - Architecture Documentation

## Overview

This directory contains comprehensive architecture documentation for the AARC Capital Investor Confidence Platform. The architecture is designed to support scalable, secure, and maintainable development with a focus on flexible UI systems and design-to-code workflows.

## Table of Contents

### Core Architecture
- [Main Architecture](./architecture.md) - Complete system architecture and technology stack
- [Coding Standards](./coding-standards.md) - Development guidelines and best practices
- [Source Tree](./source-tree.md) - Project structure and organization
- [Strapi Integration](./strapi-integration.md) - CMS integration and ISR strategy

### UI/UX Architecture
- [UI Tech Stack](./tech-stack-ui.md) - Next.js Figma-to-Code tech stack guide
- [Flexible UI Integration](./tech-stack-flexible-ui.md) - Multi-library component system
- [Figma Integration Guide](./figma_integration_guide.md) - Design-to-code workflow setup

## Architecture Principles

### 1. Flexible Component System
- **Multi-Library Support**: Abstraction layer supporting shadcn/ui, HeroUI, 21st.dev
- **Design System Flexibility**: Support for multiple aesthetics (glassmorphism, neumorphism, brutalism)
- **Semantic Naming**: Purpose-based component naming over property-based naming

### 2. Design-to-Code Workflow
- **Figma MCP Integration**: Official Figma Model Context Protocol for automated component generation
- **Design Token Extraction**: Automatic extraction of colors, spacing, typography from Figma
- **Component Mapping**: Intelligent mapping to existing component libraries

### 3. Scalable Architecture
- **Microservices Ready**: Modular services for optimization engines
- **Progressive Enhancement**: Simple defaults with advanced features for power users
- **Performance First**: Code splitting, caching, and optimization strategies

### 4. Security & Compliance
- **Financial Compliance**: Education/simulation disclaimers and regulatory compliance
- **Data Protection**: AES-256 encryption, GDPR/CCPA compliance
- **Access Control**: Role-based permissions for freemium model

## Technology Stack Summary

### Frontend
- **Framework**: Next.js 14+ (App Router) with TypeScript
- **Styling**: Tailwind CSS with design tokens
- **Component Libraries**: shadcn/ui, HeroUI, 21st.dev (flexible switching)
- **Design Integration**: Figma MCP for design-to-code workflow
- **Visualization**: D3.js, Plotly.js for financial charts

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Redis caching
- **APIs**: RESTful with OpenAPI documentation
- **Authentication**: OAuth2/OpenID Connect

### Infrastructure
- **Cloud**: AWS/Azure with Docker + Kubernetes
- **CI/CD**: GitHub Actions or Azure DevOps
- **Monitoring**: Application Performance Monitoring

## Development Workflow

1. **Design in Figma** with semantic naming conventions
2. **Extract Design Tokens** using Figma MCP
3. **Generate Components** with automated semantic naming
4. **Review & Refine** for accessibility and responsive design
5. **Integrate** into existing component system

## Related Documentation

- [Product Requirements](../prd/) - Business requirements and user stories
- [User Stories](../stories/) - Detailed user stories and epics
- [Quality Assurance](../qa/) - Testing and quality standards
