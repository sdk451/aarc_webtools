# Figma MCP Integration for Next.js Tech Stack

## Overview

This guide sets up Figma's official MCP server with Cursor, configured specifically for your Next.js + shadcn/ui + semantic naming tech stack.

---

## Prerequisites

1. **Figma Account** with access to your design files
2. **Cursor IDE** installed
3. **Node.js 18+** and npm/pnpm installed
4. **Figma Personal Access Token**

---

## Part 1: Get Figma Access Token

### Step 1: Generate Figma Token

1. Go to [Figma Account Settings](https://www.figma.com/settings)
2. Scroll to "Personal access tokens"
3. Click "Generate new token"
4. Name it: `cursor-mcp-token`
5. Copy and save the token securely

### Step 2: Get Figma File Key

From your Figma file URL:
```
https://www.figma.com/design/ABC123DEF456/My-Design-File
                                ^^^^^^^^^^^^
                                This is your file key
```

---

## Part 2: Install Official Figma MCP Server

### Installation

```bash
# Using npx (recommended)
npx @figma/mcp-server-figma

# Or install globally
npm install -g @figma/mcp-server-figma
```

---

## Part 3: Configure Cursor

### Step 1: Create MCP Configuration

Create or edit: `~/.cursor/config.json` (Mac/Linux) or `%APPDATA%\Cursor\config.json` (Windows)

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": [
        "-y",
        "@figma/mcp-server-figma"
      ],
      "env": {
        "FIGMA_PERSONAL_ACCESS_TOKEN": "YOUR_FIGMA_TOKEN_HERE"
      }
    }
  }
}
```

### Step 2: Restart Cursor

Close and reopen Cursor for changes to take effect.

---

## Part 4: Custom Cursor Rules for Figma Integration

Create: `.cursorrules` in your project root

```markdown
# Figma to Next.js Code Generation Rules

## MCP Integration
- This project uses Figma MCP server for design-to-code
- Always fetch latest design data before generating components
- Reference Figma file: [YOUR_FILE_KEY]

## Figma to Code Translation Workflow

### Step 1: Fetch Design Data
When user provides a Figma URL or mentions a component:
1. Use MCP to fetch the component/frame data
2. Analyze the design structure and hierarchy
3. Identify reusable patterns and design tokens

### Step 2: Semantic Naming
Transform Figma frame names to semantic component names:

**Figma Frame Name → Component Name**
- "Frame 123" → Analyze purpose → "HeroSection"
- "Button/Primary" → "PrimaryButton" 
- "Card - Product" → "ProductCard"
- "Navigation Bar" → "NavigationMenu"

**Rules:**
- Ignore generic names (Frame, Group, Rectangle)
- Use context to infer purpose
- Follow pattern: [Feature][ComponentType]
- Examples: UserProfileCard, CheckoutButton, PricingTable

### Step 3: Extract Design Tokens
From Figma styles, create tokens.ts entries:

```typescript
// Extract colors from Figma color styles
colors: {
  brand: {
    primary: 'hsl(...)' // from "Primary/500" style
  }
}

// Extract spacing from consistent padding/gaps
spacing: {
  md: '1rem' // from recurring 16px spacing
}
```

### Step 4: Component Structure
Generate components following this structure:

```typescript
// 1. Determine correct directory
// UI primitives → components/ui/
// Reusable features → components/features/
// Page sections → components/sections/

// 2. Import appropriate shadcn components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// 3. Define semantic props interface
interface ProductCardProps {
  title: string;
  price: number;
  // ... inferred from Figma structure
}

// 4. Build component using shadcn + Tailwind
export function ProductCard({ title, price }: ProductCardProps) {
  return (
    <Card className="product-card">
      {/* semantic class names */}
    </Card>
  );
}
```

### Step 5: Style Application
Apply styles using this priority:

1. **Design Tokens** (from tokens.ts)
   - Use for colors, spacing, typography
   
2. **Combo Classes** (from globals.css)
   - Use for common patterns
   - Create new combo if pattern repeats 3+ times
   
3. **Tailwind Utilities** (inline)
   - Use for one-off adjustments
   - Prefer semantic values (text-lg vs text-[17px])

4. **shadcn/ui Props**
   - Use built-in variants (variant="outline")
   - Leverage size props (size="lg")

### Step 6: Responsive Design
Analyze Figma frames at different breakpoints:
- Mobile frame → base classes
- Tablet frame → md: prefix
- Desktop frame → lg: prefix

```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

## Figma-Specific Extraction Rules

### Auto Layout → Flexbox/Grid
- **Figma Horizontal Auto Layout** → `flex flex-row`
- **Figma Vertical Auto Layout** → `flex flex-col`
- **Figma Grid Layout** → `grid grid-cols-X`

### Spacing
- **Figma Padding** → Tailwind `p-` classes
- **Figma Gap** → Tailwind `gap-` classes
- **Use design tokens** for consistent spacing

### Typography
- **Figma Text Styles** → Extract to typography tokens
- **Font Size** → `text-` classes
- **Font Weight** → `font-` classes
- **Line Height** → `leading-` classes

### Colors
- **Figma Fill** → `bg-` or `text-` classes
- **Always use design tokens** for brand colors
- **Convert to HSL** format for CSS variables

### Border Radius
- **Figma Corner Radius** → `rounded-` classes
- Map to token values (sm, md, lg, full)

### Shadows
- **Figma Effects** → `shadow-` classes
- Extract custom shadows to Tailwind config if unique

## Component Matching Strategy

### Match to shadcn/ui Components
Before creating custom components, check if shadcn has equivalent:

- **Figma Button** → `<Button>`
- **Figma Input Field** → `<Input>`
- **Figma Card** → `<Card>`
- **Figma Dropdown** → `<Select>` or `<DropdownMenu>`
- **Figma Modal** → `<Dialog>`
- **Figma Tabs** → `<Tabs>`
- **Figma Toast** → `<Toast>`

### When to Create Custom Components
Create custom when:
- No shadcn component matches
- Significant custom logic needed
- Domain-specific component (ProductCard, UserProfile)

## Accessibility Requirements

When generating from Figma:
1. Add semantic HTML elements (nav, main, article, section)
2. Include ARIA labels for icon buttons
3. Ensure keyboard navigation works
4. Add alt text for images
5. Maintain proper heading hierarchy

## Image Handling

- **Figma Images** → Use Next.js `<Image>` component
- **Icons** → Use lucide-react when possible
- **Logos** → Extract as SVG or use Next.js Image

```tsx
<Image
  src="/images/product.jpg"
  alt="Product name"
  width={400}
  height={300}
  className="product-image"
/>
```

## Example Prompt Patterns

### Good Prompts for Figma MCP:
```
"Generate a ProductCard component from the 'Product Card' frame in Figma"
"Create a HeroSection using the homepage hero design"
"Extract all color tokens from the Figma design system"
"Build the checkout form based on frame 'Checkout - Step 2'"
```

### What Gets Auto-Generated:
1. Component file with semantic naming
2. TypeScript interface for props
3. Design token references
4. Responsive Tailwind classes
5. Appropriate shadcn/ui components
6. Semantic CSS class names

## Quality Checklist

Before finalizing generated code:
- [ ] Component has semantic name (not Frame123)
- [ ] Uses design tokens (not hardcoded colors)
- [ ] Leverages shadcn/ui components
- [ ] Has TypeScript types
- [ ] Includes responsive classes
- [ ] Uses semantic CSS classes
- [ ] Follows combo class patterns
- [ ] Includes accessibility attributes
- [ ] Optimizes images with Next.js Image
- [ ] No property-based naming

## Iteration Pattern

When refining Figma-generated components:
1. "Update ProductCard to use combo classes for the card styling"
2. "Extract these repeated colors to design tokens"
3. "Make this component responsive for mobile and tablet"
4. "Add loading and error states to this component"

## File Organization

Generated components should go to:
- **UI Primitives**: `components/ui/` (if extending shadcn)
- **Feature Components**: `components/features/` (ProductCard, UserProfile)
- **Page Sections**: `components/sections/` (HeroSection, Footer)
- **Layout Components**: `components/layout/` (Header, Sidebar)
```

---

## Part 5: Usage Examples

### Example 1: Generate Component from Figma

In Cursor chat:

```
@figma Fetch the "Product Card" component from file ABC123DEF456

Now generate a Next.js component for this design following our tech stack:
- Use semantic naming (ProductCard)
- Use shadcn/ui Card component
- Extract colors to design tokens
- Add TypeScript types
- Include responsive design
```

### Example 2: Extract Design Tokens

```
@figma Fetch all color styles from file ABC123DEF456

Extract these to our tokens.ts file format with HSL values
```

### Example 3: Generate Full Page Section

```
@figma Fetch the "Homepage Hero" frame from file ABC123DEF456

Generate a HeroSection component that:
1. Uses semantic naming
2. Is responsive (mobile, tablet, desktop)
3. Uses our typography tokens
4. Includes CTA buttons using shadcn Button
5. Optimizes images with Next.js Image
```

---

## Part 6: Custom MCP Wrapper (Optional)

For advanced automation, create a custom wrapper:

**scripts/figma-to-component.ts**

```typescript
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

interface FigmaToComponentOptions {
  figmaUrl: string;
  componentName: string;
  outputDir: 'ui' | 'features' | 'sections' | 'layout';
}

export async function generateFromFigma({
  figmaUrl,
  componentName,
  outputDir,
}: FigmaToComponentOptions) {
  // 1. Extract file key and node ID from URL
  const fileKey = extractFileKey(figmaUrl);
  const nodeId = extractNodeId(figmaUrl);

  // 2. Use Cursor MCP to fetch design
  console.log(`Fetching ${componentName} from Figma...`);
  
  // 3. Generate prompt for Cursor
  const prompt = `
    @figma Fetch node ${nodeId} from file ${fileKey}
    
    Generate a Next.js component named ${componentName}:
    1. Use semantic naming
    2. Place in components/${outputDir}/
    3. Use design tokens from tokens.ts
    4. Use shadcn/ui components where applicable
    5. Add TypeScript types
    6. Make responsive
    7. Use semantic CSS classes
  `;

  console.log('Generated prompt for Cursor:');
  console.log(prompt);
  
  return prompt;
}

function extractFileKey(url: string): string {
  const match = url.match(/\/design\/([a-zA-Z0-9]+)\//);
  return match ? match[1] : '';
}

function extractNodeId(url: string): string {
  const match = url.match(/node-id=([^&]+)/);
  return match ? match[1] : '';
}

// Usage
generateFromFigma({
  figmaUrl: 'https://www.figma.com/design/ABC123/file?node-id=123:456',
  componentName: 'ProductCard',
  outputDir: 'features',
});
```

Run with:
```bash
npx tsx scripts/figma-to-component.ts
```

---

## Part 7: VSCode Tasks (Optional)

Create `.vscode/tasks.json` for quick access:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Generate from Figma",
      "type": "shell",
      "command": "npx tsx scripts/figma-to-component.ts",
      "problemMatcher": [],
      "group": {
        "kind": "build",
        "isDefault": false
      }
    }
  ]
}
```

---

## Troubleshooting

### MCP Server Not Connecting

1. Check token is valid: Test at https://www.figma.com/api/rest/v1/me
2. Restart Cursor completely
3. Check Cursor logs: Help → Toggle Developer Tools → Console

### Components Not Following Standards

Update `.cursorrules` to be more specific:
```markdown
CRITICAL: Always use semantic naming. Never use Frame, Group, or generic names.
CRITICAL: Always check for existing shadcn/ui components before creating custom ones.
CRITICAL: Always extract colors to design tokens, never hardcode.
```

### Design Tokens Not Extracting

Be explicit in prompts:
```
"Extract all colors from Figma and update src/lib/tokens.ts in this exact format:
colors: {
  brand: {
    primary: 'hsl(...)',
  }
}"
```

---

## Best Practices

### 1. Design System First
- Set up Figma with proper component library
- Use consistent naming in Figma
- Define color/text styles in Figma

### 2. Iterative Generation
- Generate basic structure first
- Refine with tokens and combo classes
- Add interactions and states last

### 3. Manual Review
- Always review generated code
- Check for hardcoded values
- Verify responsive behavior
- Test accessibility

### 4. Maintain Sync
- Keep Figma as source of truth
- Regenerate when designs change
- Version control both design and code

---

## Quick Reference

### Cursor MCP Commands
```
@figma list files
@figma fetch [file-key]
@figma get component [component-name]
@figma extract tokens
```

### Generation Template
```
@figma [fetch design]

Generate [ComponentName] component:
- Directory: components/[directory]/
- Use: shadcn/ui + design tokens
- Naming: semantic (not property-based)
- Types: full TypeScript
- Styles: combo classes + Tailwind
- Responsive: mobile/tablet/desktop
```

---

## Additional Resources

- [Official Figma MCP Docs](https://help.figma.com/hc/en-us/articles/32132100833559)
- [Model Context Protocol Spec](https://modelcontextprotocol.io/)
- [Cursor MCP Guide](https://cursor.sh/docs/mcp)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

## Example Workflow

**Step 1: Design in Figma**
- Create component with meaningful name: "Product Card - Featured"

**Step 2: In Cursor**
```
@figma fetch "Product Card - Featured" from file ABC123

Generate ProductCard component in components/features/
```

**Step 3: Review & Refine**
- Check semantic naming ✓
- Verify design tokens used ✓
- Test responsive design ✓
- Add to Storybook/docs

**Step 4: Use Component**
```tsx
import { ProductCard } from '@/components/features/product-card';

export default function ProductsPage() {
  return (
    <div className="content-grid">
      <ProductCard 
        title="Product Name"
        price={99.99}
        imageUrl="/images/product.jpg"
      />
    </div>
  );
}
```

Success! 🎉