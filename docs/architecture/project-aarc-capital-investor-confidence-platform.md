# Project: AARC Capital Investor Confidence Platform

### 1. Architectural Goals
- Deliver **scalable, secure, compliant** web platform.  
- Support **freemium access control** (free vs. subscription tiers).  
- Integrate **proprietary optimization algorithms** (risk parity + options-inclusive).  
- Enable **educational layering** across tools.  
- Funnel analytics → track potential high-net-worth leads for AARC Capital.  

---

### 2. High-Level System Components

1. **Frontend (Web Application)**
   - Built with **React/Next.js** for responsive, interactive UI.  
   - Progressive disclosure UX: simple defaults for beginners, expandable for advanced users.  
   - Integrates visualization libraries (e.g., **D3.js**, **Plotly**) for payoff diagrams, risk-return charts.  
   - Authentication + subscription management UI.  

2. **Backend (Application Layer)**
   - **Node.js / Python (FastAPI or Django)** backend.  
   - Hosts proprietary optimization engines:  
     - Hierarchical Risk Parity Optimizer  
     - Options-Inclusive Portfolio Optimizer  
   - Exposes APIs for frontend tools (risk-return, diversification, scenario simulation).  
   - Role-based access control (free vs. Basic Pro vs. Advanced Pro).  

3. **Data Layer**
   - Market Data Providers: delayed/historical feeds at MVP, scalable to real-time feeds later.  
   - PostgreSQL or MySQL for user data, subscriptions, progress tracking.  
   - Redis for caching frequently used datasets (e.g., historical prices).  

4. **Analytics & Funnel Tracking**
   - Event logging for tool usage, time-in-session, educational completions.  
   - Funnel analytics to identify potential HNW users.  
   - Integration with AARC CRM for lead capture.  

5. **Content/Education Layer**
   - CMS (e.g., **Strapi**, **Contentful**) to manage lessons, glossary, tutorials.  
   - Content tightly linked to outputs (explain-as-you-go).  

6. **Infrastructure**
   - Cloud-hosted (AWS or Azure).  
   - Containerized deployment (Docker + Kubernetes for scaling).  
   - CDN for global performance.  
   - OAuth2/SSO integration for authentication.  

---

### 3. Security & Compliance
- **Strict disclaimers**: All outputs framed as education/simulation.  
- **User data encryption** (AES-256 at rest, TLS in transit).  
- **Compliance checks** for financial content.  
- Access controls for proprietary algorithms.  

---

### 4. Scalability Considerations
- Start with delayed/historical data → upgrade to real-time as demand grows.  
- Modular architecture: add advanced optimizers as separate microservices.  
- Horizontal scaling for frontend and backend via Kubernetes.  

---

### 5. Roadmap Alignment
- **MVP**: Free simulators, education hub, basic optimizer.  
- **V1**: Add scenario simulator, tutorials, analytics tracking.  
- **V2**: Proprietary optimizers, sandbox, options builder, community features.  

