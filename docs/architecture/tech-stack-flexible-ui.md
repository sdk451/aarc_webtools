# Flexible Component Library Integration Guide

## Overview

This guide shows how to extend your Next.js tech stack to work with **any** component library (HeroUI, 21st.dev, Magic UI, Aceternity UI) and custom design systems (glassmorphism, neumorphism, brutalism, etc.).

The architecture is **library-agnostic** by design - you simply configure which components to use and define your design language.

---

## Part 1: Multi-Library Architecture

### Core Principle: Abstraction Layer

Instead of hardcoding one component library, create an abstraction layer that can swap between libraries.

```
Your App Components
        ↓
  Abstraction Layer (components/ui/)
        ↓
  Library A (shadcn) OR Library B (HeroUI) OR Library C (21st.dev)
```

---

## Part 2: Adding HeroUI (NextUI)

### Installation

```bash
npm install @nextui-org/react framer-motion
```

### Configuration

**tailwind.config.ts**
```typescript
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Your custom tokens
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
```

### Provider Setup

**src/app/providers.tsx**
```tsx
'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
```

**src/app/layout.tsx**
```tsx
import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### Component Mapping

Create a mapping layer in **src/components/ui/index.ts**:

```typescript
// Toggle between libraries by changing imports
export { 
  Button,
  Card,
  Input,
  Modal as Dialog,
  Dropdown as Select,
} from '@nextui-org/react';

// Or use shadcn
// export { Button } from './button';
// export { Card } from './card';
```

### Updated Cursor Rules

Add to `.cursorrules`:

```markdown
## Component Library: HeroUI (NextUI)

### Import Pattern
Use centralized imports from the abstraction layer:
```typescript
import { Button, Card, Input } from '@/components/ui';
```

### HeroUI-Specific Guidelines

**Component Props:**
- Use `color` prop: primary, secondary, success, warning, danger
- Use `variant` prop: solid, bordered, light, flat, faded, shadow, ghost
- Use `size` prop: sm, md, lg
- Use `radius` prop: none, sm, md, lg, full

**Example:**
```tsx
<Button 
  color="primary" 
  variant="shadow" 
  size="lg"
  className="cta-button"
>
  Get Started
</Button>
```

### Animation Support
HeroUI includes Framer Motion animations:
```tsx
<Card isHoverable isPressable>
  {/* Automatic hover/press animations */}
</Card>
```

### Theming
Use NextUI's theming system for colors:
```tsx
<Button color="primary"> {/* Uses theme colors */}
```
```

---

## Part 3: Adding 21st.dev Components

### Installation

```bash
# 21st.dev uses a similar approach to shadcn
npx 21st add button card
```

### Configuration

**components.json** (create if not exists)
```json
{
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/styles/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  },
  "libraries": {
    "shadcn": {
      "path": "src/components/ui/shadcn"
    },
    "21st": {
      "path": "src/components/ui/21st"
    },
    "heroui": {
      "path": "src/components/ui/heroui"
    }
  }
}
```

### Directory Structure

```
src/components/ui/
├── shadcn/          # shadcn components
│   ├── button.tsx
│   └── card.tsx
├── 21st/            # 21st.dev components
│   ├── button.tsx
│   └── card.tsx
├── heroui/          # HeroUI wrappers
│   ├── button.tsx
│   └── card.tsx
└── index.ts         # Abstraction layer (choose which to export)
```

### Abstraction Layer

**src/components/ui/index.ts**
```typescript
// Choose your component library here
const COMPONENT_LIBRARY = process.env.NEXT_PUBLIC_COMPONENT_LIBRARY || 'shadcn';

// Dynamic exports based on library choice
switch (COMPONENT_LIBRARY) {
  case 'heroui':
    export * from './heroui';
    break;
  case '21st':
    export * from './21st';
    break;
  case 'shadcn':
  default:
    export * from './shadcn';
}

// Or use per-component selection for best of each library
export { Button } from './heroui/button';        // Use HeroUI buttons
export { Card } from './21st/card';              // Use 21st.dev cards  
export { Input } from './shadcn/input';          // Use shadcn inputs
```

### Cursor Rules Update

```markdown
## Multi-Library Support

### Component Selection Strategy
1. Choose components based on design requirements:
   - **HeroUI**: Modern, animated, colorful designs
   - **21st.dev**: Trendy, startup-style components
   - **shadcn**: Clean, minimal, accessible designs

2. Import from abstraction layer:
```typescript
import { Button, Card } from '@/components/ui';
```

3. Component library is configured in src/components/ui/index.ts

### Per-Component Library Selection
When user specifies design style:
- "animated button" → Use HeroUI Button
- "glassmorphism card" → Use 21st.dev or custom
- "minimal form" → Use shadcn Input/Form
```

---

## Part 4: Glassmorphism & Custom Design Systems

### Glassmorphism Setup

**src/styles/design-systems/glassmorphism.css**
```css
/* Glassmorphism Design System */

@layer components {
  /* Core Glass Effect */
  .glass {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  }
  
  .glass-dark {
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  }
  
  /* Glass Variants */
  .glass-light {
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(4px);
  }
  
  .glass-heavy {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
  }
  
  /* Glass Components */
  .glass-card {
    @apply glass rounded-2xl p-6 transition-all duration-300;
  }
  
  .glass-card:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
  
  .glass-button {
    @apply glass rounded-lg px-6 py-3 font-medium transition-all duration-300;
  }
  
  .glass-button:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }
  
  .glass-input {
    @apply glass rounded-lg px-4 py-2 placeholder:text-white/50;
  }
  
  .glass-navbar {
    @apply glass-dark fixed top-0 w-full z-50 px-6 py-4;
  }
  
  /* Gradient Glass */
  .glass-gradient {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.05)
    );
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  /* Glass with Glow */
  .glass-glow {
    @apply glass;
    box-shadow: 
      0 8px 32px 0 rgba(31, 38, 135, 0.37),
      inset 0 0 20px rgba(255, 255, 255, 0.1);
  }
}
```

### Other Design Systems

**src/styles/design-systems/neumorphism.css**
```css
@layer components {
  .neumorphic {
    background: #e0e5ec;
    box-shadow: 
      9px 9px 16px rgba(163, 177, 198, 0.6),
      -9px -9px 16px rgba(255, 255, 255, 0.5);
    border-radius: 16px;
  }
  
  .neumorphic-inset {
    background: #e0e5ec;
    box-shadow: 
      inset 9px 9px 16px rgba(163, 177, 198, 0.6),
      inset -9px -9px 16px rgba(255, 255, 255, 0.5);
    border-radius: 16px;
  }
  
  .neumorphic-button {
    @apply neumorphic px-8 py-4 font-medium transition-all duration-300;
  }
  
  .neumorphic-button:active {
    @apply neumorphic-inset;
  }
}
```

**src/styles/design-systems/brutalism.css**
```css
@layer components {
  .brutal-card {
    @apply bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)];
  }
  
  .brutal-button {
    @apply bg-yellow-400 border-4 border-black px-8 py-4 font-black uppercase 
           transition-all duration-100 active:translate-x-1 active:translate-y-1
           active:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)];
  }
  
  .brutal-input {
    @apply border-4 border-black bg-white px-4 py-3 font-bold
           focus:outline-none focus:ring-4 focus:ring-black;
  }
}
```

### Import Design System

**src/styles/globals.css**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import your chosen design system */
@import './design-systems/glassmorphism.css';
/* @import './design-systems/neumorphism.css'; */
/* @import './design-systems/brutalism.css'; */

/* Your combo classes */
@layer components {
  .page-container {
    @apply container mx-auto px-4 py-8 max-w-7xl;
  }
  /* ... other combo classes */
}
```

---

## Part 5: Design System Configuration

### Create Design System Config

**src/lib/design-system.config.ts**
```typescript
export type DesignSystem = 'default' | 'glassmorphism' | 'neumorphism' | 'brutalism' | 'custom';

export type ComponentLibrary = 'shadcn' | 'heroui' | '21st' | 'mixed';

export interface DesignSystemConfig {
  system: DesignSystem;
  library: ComponentLibrary;
  theme: {
    colorScheme: 'light' | 'dark' | 'auto';
    primaryColor: string;
    accentColor: string;
    borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
    animations: boolean;
  };
}

export const designSystemConfig: DesignSystemConfig = {
  system: 'glassmorphism',
  library: 'heroui',
  theme: {
    colorScheme: 'dark',
    primaryColor: 'hsl(222 47% 11%)',
    accentColor: 'hsl(347 77% 50%)',
    borderRadius: 'lg',
    animations: true,
  },
};

// Design system class mappings
export const designSystemClasses = {
  default: {
    card: 'bg-card border rounded-lg shadow',
    button: 'bg-primary text-primary-foreground rounded-md',
    input: 'border rounded-md bg-background',
  },
  glassmorphism: {
    card: 'glass-card',
    button: 'glass-button',
    input: 'glass-input',
  },
  neumorphism: {
    card: 'neumorphic p-6',
    button: 'neumorphic-button',
    input: 'neumorphic-inset px-4 py-2',
  },
  brutalism: {
    card: 'brutal-card p-6',
    button: 'brutal-button',
    input: 'brutal-input',
  },
  custom: {
    card: 'custom-card',
    button: 'custom-button',
    input: 'custom-input',
  },
};

// Get classes for current design system
export function getDesignClasses(component: keyof typeof designSystemClasses.default) {
  const system = designSystemConfig.system;
  return designSystemClasses[system][component];
}
```

### Usage in Components

**src/components/features/product-card.tsx**
```tsx
import { Card } from '@/components/ui';
import { getDesignClasses } from '@/lib/design-system.config';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  title: string;
  price: number;
  imageUrl: string;
}

export function ProductCard({ title, price, imageUrl }: ProductCardProps) {
  // Automatically uses configured design system
  const cardClasses = getDesignClasses('card');
  
  return (
    <Card className={cn('product-card', cardClasses)}>
      <div className="product-image-wrapper relative aspect-square">
        <img src={imageUrl} alt={title} className="object-cover" />
      </div>
      <div className="product-content p-4">
        <h3 className="product-title text-xl font-semibold">{title}</h3>
        <p className="product-price text-2xl font-bold">${price}</p>
      </div>
    </Card>
  );
}
```

---

## Part 6: Updated Cursor Rules

**Add to .cursorrules:**

```markdown
## Design System Configuration

### Current Design System
Check `src/lib/design-system.config.ts` for active design system and component library.

### Design System Selection

**Glassmorphism:**
- Use glass-* classes from design-systems/glassmorphism.css
- Transparent backgrounds with backdrop-filter
- Subtle borders and shadows
- Best with dark backgrounds or gradient backgrounds

**Neumorphism:**
- Use neumorphic-* classes
- Soft shadows (inner and outer)
- Monochromatic color schemes
- Minimal contrast

**Brutalism:**
- Use brutal-* classes
- Heavy borders (4px black)
- Bold shadows (offset box shadows)
- High contrast colors
- Uppercase, bold typography

**Default:**
- Use standard Tailwind classes
- shadcn/ui styling
- Clean, minimal aesthetic

### Component Library Selection

**shadcn/ui:**
- Best for: Accessible, minimal designs
- Import: `import { Button } from '@/components/ui'`
- Props: variant, size, asChild

**HeroUI (NextUI):**
- Best for: Animated, modern designs
- Import: `import { Button } from '@/components/ui'`
- Props: color, variant, size, radius
- Includes Framer Motion animations

**21st.dev:**
- Best for: Trendy, startup aesthetics
- Import: `import { Button } from '@/components/ui'`
- Components have modern, eye-catching designs

### Code Generation Rules

When generating components:

1. **Check design system config** first
   ```typescript
   import { getDesignClasses } from '@/lib/design-system.config';
   const cardClasses = getDesignClasses('card');
   ```

2. **Apply system-specific classes**
   ```tsx
   <Card className={cn('product-card', cardClasses)}>
   ```

3. **Use appropriate component library**
   - Import from abstraction layer: `@/components/ui`
   - Library is configured in `components/ui/index.ts`

4. **Match design aesthetic**
   - Glassmorphism: Add glow effects, transparency
   - Neumorphism: Soft, embossed look
   - Brutalism: Bold, high contrast
   - Default: Clean and minimal

### Example: Glassmorphism Component

```tsx
import { Button } from '@/components/ui';
import { getDesignClasses } from '@/lib/design-system.config';

export function GlassHeroSection() {
  const buttonClasses = getDesignClasses('button');
  
  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" />
      
      {/* Glass Content */}
      <div className="glass-card relative z-10 max-w-2xl mx-4 text-center">
        <h1 className="heading-primary text-white mb-4">
          Welcome to the Future
        </h1>
        <p className="body-large text-white/80 mb-8">
          Experience design like never before
        </p>
        <Button className={cn('cta-button', buttonClasses)}>
          Get Started
        </Button>
      </div>
    </section>
  );
}
```

### Figma to Design System Mapping

When converting Figma designs, detect design style:

**Indicators:**
- **Glassmorphism**: Transparent fills, blur effects, subtle borders
- **Neumorphism**: Soft shadows, monochrome, embossed look
- **Brutalism**: Heavy borders, offset shadows, bold colors
- **Default**: Clean, minimal, standard shadows

**Auto-apply appropriate classes:**
```typescript
// Detect from Figma properties
if (figmaNode.effects.includes('BACKGROUND_BLUR')) {
  return 'glass-card';
} else if (figmaNode.effects.includes('INNER_SHADOW')) {
  return 'neumorphic';
} else if (figmaNode.borderWeight >= 4) {
  return 'brutal-card';
}
```

### Switching Design Systems

To switch design systems:
1. Update `src/lib/design-system.config.ts`
2. Change `system` field to desired system
3. Optionally change `library` field
4. Components automatically use new styles

### Mixed Library Approach

For best results from multiple libraries:
```typescript
// src/components/ui/index.ts
export { Button } from './heroui/button';      // HeroUI animations
export { Card } from './21st/card';            // 21st.dev trendy cards
export { Input, Form } from './shadcn/form';   // shadcn accessibility
```

This gives you the best components from each library!
```

---

## Part 7: Quick Switch Examples

### Switch to HeroUI + Glassmorphism

**1. Update design-system.config.ts:**
```typescript
export const designSystemConfig: DesignSystemConfig = {
  system: 'glassmorphism',
  library: 'heroui',
  theme: {
    colorScheme: 'dark',
    primaryColor: 'hsl(222 47% 11%)',
    accentColor: 'hsl(347 77% 50%)',
    borderRadius: 'lg',
    animations: true,
  },
};
```

**2. Update components/ui/index.ts:**
```typescript
export * from '@nextui-org/react';
```

**3. Import glassmorphism.css in globals.css**

**4. Generate component:**
```
Generate a ProductCard with glassmorphism design and HeroUI components
```

### Switch to 21st.dev + Brutalism

**1. Update design-system.config.ts:**
```typescript
export const designSystemConfig: DesignSystemConfig = {
  system: 'brutalism',
  library: '21st',
  theme: {
    colorScheme: 'light',
    primaryColor: 'hsl(45 100% 51%)',
    accentColor: 'hsl(0 0% 0%)',
    borderRadius: 'none',
    animations: false,
  },
};
```

**2. Import brutalism.css in globals.css**

**3. Generate component:**
```
Generate a HeroSection with brutalist design using 21st.dev components
```

---

## Part 8: Environment-Based Configuration

For multiple design variants per project:

**.env.local**
```bash
NEXT_PUBLIC_DESIGN_SYSTEM=glassmorphism
NEXT_PUBLIC_COMPONENT_LIBRARY=heroui
NEXT_PUBLIC_COLOR_SCHEME=dark
```

**src/lib/design-system.config.ts**
```typescript
export const designSystemConfig: DesignSystemConfig = {
  system: (process.env.NEXT_PUBLIC_DESIGN_SYSTEM as DesignSystem) || 'default',
  library: (process.env.NEXT_PUBLIC_COMPONENT_LIBRARY as ComponentLibrary) || 'shadcn',
  theme: {
    colorScheme: (process.env.NEXT_PUBLIC_COLOR_SCHEME as 'light' | 'dark') || 'light',
    // ... rest of config
  },
};
```

Now you can switch designs by changing environment variables!

---

## Part 9: Component Showcase Page

Create a page to preview all design systems:

**src/app/showcase/page.tsx**
```tsx
import { ProductCard } from '@/components/features/product-card';

export default function ShowcasePage() {
  return (
    <div className="page-container">
      <h1 className="heading-primary mb-8">Design System Showcase</h1>
      
      <section className="section-wrapper">
        <h2 className="heading-secondary mb-4">Glassmorphism</h2>
        <div className="glass-card p-8 mb-4">
          <ProductCard 
            title="Premium Product"
            price={99.99}
            imageUrl="/product.jpg"
          />
        </div>
      </section>
      
      <section className="section-wrapper">
        <h2 className="heading-secondary mb-4">Neumorphism</h2>
        <div className="neumorphic p-8 mb-4">
          <ProductCard 
            title="Premium Product"
            price={99.99}
            imageUrl="/product.jpg"
          />
        </div>
      </section>
      
      <section className="section-wrapper">
        <h2 className="heading-secondary mb-4">Brutalism</h2>
        <div className="brutal-card p-8 mb-4">
          <ProductCard 
            title="Premium Product"
            price={99.99}
            imageUrl="/product.jpg"
          />
        </div>
      </section>
    </div>
  );
}
```

---

## Summary

Your tech stack is now **completely flexible**:

✅ **Multiple Component Libraries**
- Switch between shadcn, HeroUI, 21st.dev
- Mix and match best components from each
- Single import point: `@/components/ui`

✅ **Multiple Design Systems**
- Glassmorphism, neumorphism, brutalism, custom
- Simple CSS class changes
- Environment-based configuration

✅ **Semantic Naming Preserved**
- Works with any library or design system
- Components remain semantically named
- Design tokens still centralized

✅ **Figma Integration**
- Auto-detect design style from Figma
- Apply appropriate system classes
- Generate with correct component library

**To switch:** Just update `design-system.config.ts` and your entire app transforms! 🎨