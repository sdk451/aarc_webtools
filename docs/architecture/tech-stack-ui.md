# Next.js Figma-to-Code Tech Stack

## Tech Stack Overview

### Core Technologies
- **Framework**: Next.js 14+ (App Router)
- **Deployment**: Vercel
- **UI Primitives**: Radix UI (via shadcn/ui)
- **Styling**: Tailwind CSS
- **Component Library**: shadcn/ui or heroui, with 21st.dev components
- **Design Integration**: Figma MCP (Model Context Protocol)

---

## Project Structure

```
project-root/
├── src/
│   ├── app/                    # Next.js app router pages
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── layout/            # Layout components (Header, Footer, Sidebar)
│   │   ├── sections/          # Page sections (Hero, Features, Testimonials)
│   │   ├── features/          # Feature-specific components (UserProfile, ProductCard)
│   │   └── shared/            # Shared utility components (LoadingSpinner, ErrorBoundary)
│   ├── lib/
│   │   ├── utils.ts           # Utility functions
│   │   └── tokens.ts          # Design tokens
│   ├── styles/
│   │   └── globals.css        # Global styles and Tailwind imports
│   └── types/                 # TypeScript type definitions
├── public/                     # Static assets
├── .cursorrules               # Cursor AI rules
└── figma.config.json          # Figma MCP configuration
```

---

## Coding Standards

### 1. Component Naming (Semantic, Not Property-Based)

**DO** ✅
```tsx
// Semantic names that describe purpose
<HeroSection />
<ProductCard />
<PricingTable />
<UserAvatar />
<NavigationMenu />
<CallToActionButton />
```

**DON'T** ❌
```tsx
// Property-based names (what most tools generate)
<FlexColumn />
<BlueButton />
<LargeText />
<Grid3x3 />
<Container80 />
```

### 2. File Naming Convention

```
kebab-case for files:
- hero-section.tsx
- product-card.tsx
- user-profile-form.tsx

PascalCase for component names:
- HeroSection
- ProductCard
- UserProfileForm
```

### 3. TypeScript Standards

```typescript
// Always define prop types
interface ProductCardProps {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  onAddToCart: () => void;
}

export function ProductCard({ 
  title, 
  description, 
  price, 
  imageUrl, 
  onAddToCart 
}: ProductCardProps) {
  // Component implementation
}
```

### 4. Design Token System

**src/lib/tokens.ts**
```typescript
export const tokens = {
  colors: {
    brand: {
      primary: 'hsl(222.2 47.4% 11.2%)',
      secondary: 'hsl(210 40% 96.1%)',
      accent: 'hsl(346.8 77.2% 49.8%)',
    },
    semantic: {
      success: 'hsl(142.1 76.2% 36.3%)',
      warning: 'hsl(38 92% 50%)',
      error: 'hsl(0 84.2% 60.2%)',
      info: 'hsl(221.2 83.2% 53.3%)',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  typography: {
    heading: {
      h1: 'text-4xl font-bold tracking-tight lg:text-5xl',
      h2: 'text-3xl font-semibold tracking-tight',
      h3: 'text-2xl font-semibold tracking-tight',
    },
    body: {
      large: 'text-lg',
      base: 'text-base',
      small: 'text-sm',
    },
  },
  radius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    full: '9999px',
  },
} as const;
```

### 5. Tailwind Configuration

**tailwind.config.ts**
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'hsl(var(--brand-primary))',
          secondary: 'hsl(var(--brand-secondary))',
          accent: 'hsl(var(--brand-accent))',
        },
        semantic: {
          success: 'hsl(var(--semantic-success))',
          warning: 'hsl(var(--semantic-warning))',
          error: 'hsl(var(--semantic-error))',
          info: 'hsl(var(--semantic-info))',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

### 6. Component Standards

**Example: Feature Component**
```tsx
// src/components/features/product-card.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Image from 'next/image';

interface ProductCardProps {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  onAddToCart: () => void;
}

export function ProductCard({
  title,
  description,
  price,
  imageUrl,
  category,
  onAddToCart,
}: ProductCardProps) {
  return (
    <Card className="product-card overflow-hidden">
      <CardHeader className="product-card-header p-0">
        <div className="product-image-wrapper relative aspect-square">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="product-image object-cover"
          />
          <span className="product-category absolute top-2 right-2 bg-brand-accent text-white px-3 py-1 rounded-full text-sm">
            {category}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="product-card-content p-4">
        <h3 className="product-title text-xl font-semibold mb-2">{title}</h3>
        <p className="product-description text-muted-foreground line-clamp-2">
          {description}
        </p>
        <p className="product-price text-2xl font-bold mt-4">
          ${price.toFixed(2)}
        </p>
      </CardContent>
      
      <CardFooter className="product-card-footer p-4 pt-0">
        <Button 
          onClick={onAddToCart}
          className="add-to-cart-button w-full"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### 7. Combo Classes Pattern

Create reusable combo classes for common patterns:

**src/styles/globals.css**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  /* Layout Combos */
  .page-container {
    @apply container mx-auto px-4 py-8 max-w-7xl;
  }
  
  .section-wrapper {
    @apply py-16 md:py-24;
  }
  
  .content-grid {
    @apply grid gap-6 md:grid-cols-2 lg:grid-cols-3;
  }
  
  /* Typography Combos */
  .heading-primary {
    @apply text-4xl font-bold tracking-tight lg:text-5xl;
  }
  
  .heading-secondary {
    @apply text-3xl font-semibold tracking-tight;
  }
  
  .body-large {
    @apply text-lg leading-relaxed text-muted-foreground;
  }
  
  /* Button Combos */
  .button-primary {
    @apply bg-brand-primary text-white hover:bg-brand-primary/90 px-6 py-3 rounded-lg font-medium transition-colors;
  }
  
  .button-secondary {
    @apply bg-brand-secondary text-brand-primary hover:bg-brand-secondary/80 px-6 py-3 rounded-lg font-medium transition-colors;
  }
  
  /* Card Combos */
  .card-elevated {
    @apply bg-card rounded-lg border shadow-lg hover:shadow-xl transition-shadow;
  }
  
  .card-interactive {
    @apply card-elevated cursor-pointer hover:border-brand-accent;
  }
  
  /* Form Combos */
  .form-group {
    @apply space-y-2;
  }
  
  .form-label {
    @apply text-sm font-medium leading-none;
  }
  
  .form-input {
    @apply flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm;
  }
}
```

---

## Cursor Rules (.cursorrules)

```markdown
# Project: Next.js Figma-to-Code Application

## Core Principles
1. Use semantic naming over property-based naming
2. Follow the component hierarchy: ui -> shared -> features -> sections -> layout
3. Always use TypeScript with explicit types
4. Leverage design tokens from src/lib/tokens.ts
5. Use combo classes from globals.css for consistency

## Component Creation Rules

### Naming Convention
- Component files: kebab-case (hero-section.tsx)
- Component names: PascalCase (HeroSection)
- CSS classes: semantic names (product-card, not flex-col-center)

### Component Structure
```typescript
// 1. Imports (grouped: React, Next.js, UI components, utilities, types)
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// 2. Type definitions
interface ComponentProps {
  // props
}

// 3. Component
export function ComponentName({ props }: ComponentProps) {
  // hooks
  // handlers
  // render
}
```

### CSS Class Naming
When adding className attributes:
- Use semantic names that describe the element's purpose
- Prefix with parent component name for scoping
- Example: `className="product-card-header"` not `className="flex justify-between"`

### Figma to Code Translation
When converting Figma designs:
1. Identify the semantic purpose of each frame/component
2. Name components based on purpose (not visual properties)
3. Extract design tokens (colors, spacing, typography) to tokens.ts
4. Use existing shadcn/ui components where possible
5. Create custom components in appropriate directory (features/ or sections/)

### Import Aliases
- @/components/* for components
- @/lib/* for utilities and tokens
- @/app/* for pages
- @/types/* for type definitions

### Styling Guidelines
1. Use Tailwind utility classes for one-off styling
2. Use combo classes for repeated patterns
3. Extract to combo class if used 3+ times
4. Keep color values in design tokens
5. Use CSS variables for theme support

### State Management
- Use React hooks (useState, useReducer) for component state
- Use Server Components by default
- Add 'use client' only when needed (interactivity, browser APIs)

### Performance
- Use Next.js Image component for all images
- Implement loading states for async operations
- Use dynamic imports for heavy components
- Optimize bundle size with tree shaking

## File Creation Checklist
- [ ] File in correct directory (ui/shared/features/sections/layout)
- [ ] Semantic naming (not property-based)
- [ ] TypeScript interface for props
- [ ] Proper import organization
- [ ] Design tokens used for colors/spacing
- [ ] Combo classes used where applicable
- [ ] Responsive design classes included
- [ ] Accessibility attributes (aria-labels, semantic HTML)

## Code Review Checklist
- [ ] No hardcoded colors (use tokens)
- [ ] No property-based naming (FlexColumn, BlueButton)
- [ ] Types defined for all props
- [ ] Semantic HTML elements used
- [ ] Responsive breakpoints considered
- [ ] Error states handled
- [ ] Loading states included
```

---

## Figma MCP Configuration

**figma.config.json**
```json
{
  "version": "1.0",
  "tokenMapping": {
    "colors": {
      "prefix": "brand-",
      "semantic": true,
      "generateCSSVariables": true
    },
    "spacing": {
      "useRem": true,
      "baseSize": 16
    },
    "typography": {
      "extractFontSizes": true,
      "extractLineHeights": true,
      "extractFontWeights": true
    }
  },
  "componentMapping": {
    "namingConvention": "semantic",
    "ignorePatterns": ["Frame", "Rectangle", "Group"],
    "componentPrefixes": {
      "Button": "button-",
      "Card": "card-",
      "Input": "form-"
    }
  },
  "exportSettings": {
    "framework": "nextjs",
    "componentLibrary": "shadcn",
    "useTypeScript": true,
    "outputDirectory": "src/components/figma-exports"
  }
}
```

---

## Quick Start Commands

```bash
# Initialize Next.js project
npx create-next-app@latest my-app --typescript --tailwind --app

# Install shadcn/ui
npx shadcn-ui@latest init

# Add commonly used components
npx shadcn-ui@latest add button card input

# Install additional dependencies
npm install class-variance-authority clsx tailwind-merge
npm install -D @types/node
```

---

## Development Workflow

1. **Design Review**: Review Figma design and identify semantic components
2. **Token Extraction**: Extract colors, spacing, typography to tokens.ts
3. **Component Planning**: Map Figma frames to semantic component names
4. **Scaffolding**: Create component files with proper structure
5. **Implementation**: Build components using shadcn/ui + custom code
6. **Combo Classes**: Extract repeated patterns to globals.css
7. **Testing**: Test responsive behavior and interactions
8. **Review**: Check naming conventions and code standards

---

## Best Practices Summary

✅ **DO**
- Use semantic names (ProductCard, HeroSection)
- Extract design tokens
- Use combo classes for patterns
- Type all components
- Use existing shadcn components
- Follow directory structure

❌ **DON'T**
- Use property-based names (BlueButton, FlexColumn)
- Hardcode colors or spacing
- Repeat utility class combinations
- Skip TypeScript types
- Reinvent existing components
- Mix component types in directories

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Vercel Deployment](https://vercel.com/docs)