# AARC Capital Platform - Coding Standards

## Overview

This document defines the coding standards and best practices for the AARC Capital Investor Confidence Platform. These standards ensure consistency, maintainability, and scalability across the entire codebase.

---

## 1. General Principles

### 1.1 Code Quality
- **Readability First**: Code should be self-documenting and easy to understand
- **Consistency**: Follow established patterns and conventions throughout the project
- **Maintainability**: Write code that can be easily modified and extended
- **Performance**: Optimize for both development speed and runtime performance
- **Security**: Implement security best practices at every layer

### 1.2 Documentation
- **Self-Documenting Code**: Use meaningful names and clear structure
- **Inline Comments**: Explain complex logic and business rules
- **API Documentation**: Document all public APIs with OpenAPI/Swagger
- **README Files**: Maintain up-to-date README files for each major component

---

## 2. TypeScript Standards

### 2.1 Type Safety
```typescript
// ✅ DO: Use strict typing
interface UserProfile {
  id: string;
  email: string;
  subscriptionTier: 'free' | 'basic' | 'advanced';
  createdAt: Date;
  preferences: UserPreferences;
}

// ❌ DON'T: Use any or loose typing
function processUser(user: any): any {
  return user.something;
}
```

### 2.2 Interface Design
```typescript
// ✅ DO: Use descriptive interface names
interface PortfolioOptimizationRequest {
  assets: Asset[];
  constraints: OptimizationConstraints;
  objective: OptimizationObjective;
  riskTolerance: number;
}

// ✅ DO: Use union types for enums
type SubscriptionTier = 'free' | 'basic' | 'advanced';
type OptimizationMethod = 'mpt' | 'risk-parity' | 'options-inclusive';
```

### 2.3 Generic Types
```typescript
// ✅ DO: Use generics for reusable components
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
  };
}
```

---

## 3. React/Next.js Standards

### 3.1 Component Structure
```typescript
// ✅ DO: Follow this component structure
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { tokens } from '@/lib/tokens';

// 1. Type definitions
interface ProductCardProps {
  title: string;
  price: number;
  imageUrl: string;
  onAddToCart: () => void;
  className?: string;
}

// 2. Component implementation
export function ProductCard({
  title,
  price,
  imageUrl,
  onAddToCart,
  className,
}: ProductCardProps) {
  // 3. Hooks
  const [isLoading, setIsLoading] = useState(false);
  
  // 4. Event handlers
  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await onAddToCart();
    } finally {
      setIsLoading(false);
    }
  };

  // 5. Render
  return (
    <Card className={cn('product-card', className)}>
      {/* Component content */}
    </Card>
  );
}
```

### 3.2 Naming Conventions

#### Component Names
```typescript
// ✅ DO: Use semantic, purpose-based names
<ProductCard />
<UserProfile />
<RiskReturnChart />
<PortfolioOptimizer />
<SubscriptionManager />

// ❌ DON'T: Use property-based names
<BlueButton />
<FlexColumn />
<LargeText />
<Grid3x3 />
```

#### File Names
```typescript
// ✅ DO: Use kebab-case for files
product-card.tsx
user-profile.tsx
risk-return-chart.tsx
portfolio-optimizer.tsx

// ❌ DON'T: Use camelCase or PascalCase for files
ProductCard.tsx
userProfile.tsx
```

### 3.3 Props and State Management
```typescript
// ✅ DO: Use proper prop destructuring
interface ComponentProps {
  title: string;
  isVisible: boolean;
  onToggle: (visible: boolean) => void;
}

export function Component({ title, isVisible, onToggle }: ComponentProps) {
  // Component logic
}

// ✅ DO: Use proper state management
const [user, setUser] = useState<User | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

---

## 4. Styling Standards

### 4.1 Design Token Usage
```typescript
// ✅ DO: Use design tokens from centralized system
import { tokens } from '@/lib/tokens';

const styles = {
  container: {
    backgroundColor: tokens.colors.brand.primary,
    padding: tokens.spacing.lg,
    borderRadius: tokens.radius.md,
  },
};

// ❌ DON'T: Hardcode values
const styles = {
  container: {
    backgroundColor: '#1a1a1a',
    padding: '24px',
    borderRadius: '8px',
  },
};
```

### 4.2 Tailwind CSS Classes
```typescript
// ✅ DO: Use semantic class combinations
<div className="page-container">
  <section className="section-wrapper">
    <h1 className="heading-primary">Welcome</h1>
    <p className="body-large">Description text</p>
  </section>
</div>

// ✅ DO: Use combo classes for repeated patterns
<button className="button-primary">Primary Action</button>
<button className="button-secondary">Secondary Action</button>

// ❌ DON'T: Repeat utility class combinations
<div className="container mx-auto px-4 py-8 max-w-7xl">
  <section className="py-16 md:py-24">
    <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Welcome</h1>
  </section>
</div>
```

### 4.3 CSS Class Naming
```css
/* ✅ DO: Use semantic, component-scoped names */
.product-card {
  /* Product card specific styles */
}

.product-card-header {
  /* Header within product card */
}

.product-card-content {
  /* Content within product card */
}

/* ❌ DON'T: Use generic or property-based names */
.blue-card {
  /* Too generic, not semantic */
}

.flex-column-center {
  /* Property-based naming */
}
```

---

## 5. API Design Standards

### 5.1 RESTful API Conventions
```typescript
// ✅ DO: Use consistent HTTP methods and status codes
// GET /api/portfolios - List portfolios
// GET /api/portfolios/:id - Get specific portfolio
// POST /api/portfolios - Create portfolio
// PUT /api/portfolios/:id - Update portfolio
// DELETE /api/portfolios/:id - Delete portfolio

// ✅ DO: Use proper HTTP status codes
app.get('/api/portfolios', async (req, res) => {
  try {
    const portfolios = await portfolioService.getAll();
    res.status(200).json({
      success: true,
      data: portfolios,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      errors: [error.message],
    });
  }
});
```

### 5.2 Request/Response Format
```typescript
// ✅ DO: Use consistent response format
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  pagination?: PaginationInfo;
}

// ✅ DO: Use proper error handling
app.post('/api/portfolios', async (req, res) => {
  try {
    const { name, assets } = req.body;
    
    // Validation
    if (!name || !assets) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        errors: ['name and assets are required'],
      });
    }

    const portfolio = await portfolioService.create({ name, assets });
    
    res.status(201).json({
      success: true,
      data: portfolio,
      message: 'Portfolio created successfully',
    });
  } catch (error) {
    logger.error('Portfolio creation failed:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create portfolio',
      errors: [error.message],
    });
  }
});
```

### 5.3 Input Validation
```typescript
// ✅ DO: Use proper validation schemas
import Joi from 'joi';

const portfolioSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  description: Joi.string().max(500).optional(),
  assets: Joi.array().items(
    Joi.object({
      symbol: Joi.string().required(),
      weight: Joi.number().min(0).max(1).required(),
    })
  ).min(1).required(),
});

app.post('/api/portfolios', async (req, res) => {
  const { error, value } = portfolioSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.details.map(detail => detail.message),
    });
  }

  // Process validated data
});
```

---

## 6. Database Standards

### 6.1 Schema Design
```sql
-- ✅ DO: Use descriptive table and column names
CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- ✅ DO: Use proper indexing
CREATE INDEX idx_portfolios_user_id ON portfolios(user_id);
CREATE INDEX idx_portfolios_created_at ON portfolios(created_at);

-- ✅ DO: Use constraints for data integrity
ALTER TABLE portfolios ADD CONSTRAINT chk_portfolio_name_length 
  CHECK (LENGTH(name) >= 1 AND LENGTH(name) <= 100);
```

### 6.2 Query Patterns
```typescript
// ✅ DO: Use parameterized queries
const getPortfolioById = async (id: string): Promise<Portfolio | null> => {
  const query = `
    SELECT p.*, u.email as user_email
    FROM portfolios p
    JOIN users u ON p.user_id = u.id
    WHERE p.id = $1 AND p.is_active = true
  `;
  
  const result = await db.query(query, [id]);
  return result.rows[0] || null;
};

// ✅ DO: Use transactions for complex operations
const createPortfolioWithAssets = async (portfolioData: CreatePortfolioData) => {
  const client = await db.getClient();
  
  try {
    await client.query('BEGIN');
    
    const portfolio = await client.query(
      'INSERT INTO portfolios (user_id, name, description) VALUES ($1, $2, $3) RETURNING *',
      [portfolioData.userId, portfolioData.name, portfolioData.description]
    );
    
    for (const asset of portfolioData.assets) {
      await client.query(
        'INSERT INTO portfolio_assets (portfolio_id, symbol, weight) VALUES ($1, $2, $3)',
        [portfolio.rows[0].id, asset.symbol, asset.weight]
      );
    }
    
    await client.query('COMMIT');
    return portfolio.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
```

---

## 7. Error Handling Standards

### 7.1 Frontend Error Handling
```typescript
// ✅ DO: Use proper error boundaries
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Error boundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

// ✅ DO: Handle async errors properly
const usePortfolioData = (portfolioId: string) => {
  const [data, setData] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const portfolio = await portfolioService.getById(portfolioId);
        setData(portfolio);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        logger.error('Failed to fetch portfolio:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [portfolioId]);

  return { data, loading, error };
};
```

### 7.2 Backend Error Handling
```typescript
// ✅ DO: Use centralized error handling
class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404);
  }
}

// ✅ DO: Use error handling middleware
const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('Error occurred:', error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      errors: [error.message],
    });
  }

  // Don't leak internal errors in production
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal server error' 
    : error.message;

  res.status(500).json({
    success: false,
    message,
    errors: [message],
  });
};
```

---

## 8. Testing Standards

### 8.1 Unit Testing
```typescript
// ✅ DO: Write comprehensive unit tests
describe('PortfolioService', () => {
  describe('calculateRisk', () => {
    it('should calculate portfolio risk correctly', () => {
      const portfolio = {
        assets: [
          { symbol: 'AAPL', weight: 0.6, volatility: 0.25 },
          { symbol: 'GOOGL', weight: 0.4, volatility: 0.30 },
        ],
        correlations: [[1, 0.3], [0.3, 1]],
      };

      const risk = portfolioService.calculateRisk(portfolio);
      
      expect(risk).toBeCloseTo(0.22, 2);
    });

    it('should throw error for invalid portfolio', () => {
      const invalidPortfolio = { assets: [] };
      
      expect(() => {
        portfolioService.calculateRisk(invalidPortfolio);
      }).toThrow('Portfolio must contain at least one asset');
    });
  });
});
```

### 8.2 Integration Testing
```typescript
// ✅ DO: Test API endpoints
describe('Portfolio API', () => {
  describe('POST /api/portfolios', () => {
    it('should create portfolio successfully', async () => {
      const portfolioData = {
        name: 'Test Portfolio',
        assets: [
          { symbol: 'AAPL', weight: 0.6 },
          { symbol: 'GOOGL', weight: 0.4 },
        ],
      };

      const response = await request(app)
        .post('/api/portfolios')
        .set('Authorization', `Bearer ${validToken}`)
        .send(portfolioData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(portfolioData.name);
    });

    it('should return 400 for invalid data', async () => {
      const invalidData = { name: '' };

      const response = await request(app)
        .post('/api/portfolios')
        .set('Authorization', `Bearer ${validToken}`)
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toContain('name is required');
    });
  });
});
```

---

## 9. Security Standards

### 9.1 Input Sanitization
```typescript
// ✅ DO: Sanitize all user inputs
import DOMPurify from 'dompurify';
import validator from 'validator';

const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(validator.escape(input.trim()));
};

// ✅ DO: Validate file uploads
const validateFileUpload = (file: Express.Multer.File) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.mimetype)) {
    throw new ValidationError('Invalid file type');
  }

  if (file.size > maxSize) {
    throw new ValidationError('File too large');
  }
};
```

### 9.2 Authentication & Authorization
```typescript
// ✅ DO: Use proper JWT handling
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }

    req.user = user as UserPayload;
    next();
  });
};

// ✅ DO: Use role-based authorization
const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
      });
    }
    next();
  };
};
```

---

## 10. Performance Standards

### 10.1 Frontend Performance
```typescript
// ✅ DO: Use React.memo for expensive components
const ExpensiveChart = React.memo(({ data }: { data: ChartData }) => {
  return <ComplexVisualization data={data} />;
});

// ✅ DO: Use useMemo for expensive calculations
const PortfolioMetrics = ({ portfolio }: { portfolio: Portfolio }) => {
  const metrics = useMemo(() => {
    return calculatePortfolioMetrics(portfolio);
  }, [portfolio.assets, portfolio.weights]);

  return <MetricsDisplay metrics={metrics} />;
};

// ✅ DO: Use dynamic imports for code splitting
const PortfolioOptimizer = lazy(() => import('./PortfolioOptimizer'));

const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PortfolioOptimizer />
    </Suspense>
  );
};
```

### 10.2 Backend Performance
```typescript
// ✅ DO: Use database connection pooling
const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// ✅ DO: Use caching for expensive operations
const getMarketData = async (symbols: string[]) => {
  const cacheKey = `market-data:${symbols.sort().join(',')}`;
  
  // Try cache first
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // Fetch from API
  const data = await marketDataService.fetch(symbols);
  
  // Cache for 5 minutes
  await redis.setex(cacheKey, 300, JSON.stringify(data));
  
  return data;
};
```

---

## 11. Documentation Standards

### 11.1 Code Comments
```typescript
/**
 * Calculates the risk-adjusted return for a portfolio using the Sharpe ratio.
 * 
 * @param portfolio - The portfolio containing assets and their weights
 * @param riskFreeRate - The risk-free rate (default: 0.02 for 2%)
 * @returns The Sharpe ratio as a number
 * 
 * @example
 * ```typescript
 * const portfolio = {
 *   assets: [{ symbol: 'AAPL', weight: 0.6 }, { symbol: 'GOOGL', weight: 0.4 }],
 *   expectedReturn: 0.12,
 *   volatility: 0.18
 * };
 * const sharpeRatio = calculateSharpeRatio(portfolio, 0.02);
 * ```
 */
export function calculateSharpeRatio(
  portfolio: Portfolio,
  riskFreeRate: number = 0.02
): number {
  return (portfolio.expectedReturn - riskFreeRate) / portfolio.volatility;
}
```

### 11.2 API Documentation
```typescript
/**
 * @swagger
 * /api/portfolios:
 *   post:
 *     summary: Create a new portfolio
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - assets
 *             properties:
 *               name:
 *                 type: string
 *                 description: Portfolio name
 *                 example: "My Investment Portfolio"
 *               assets:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     symbol:
 *                       type: string
 *                       example: "AAPL"
 *                     weight:
 *                       type: number
 *                       minimum: 0
 *                       maximum: 1
 *                       example: 0.6
 *     responses:
 *       201:
 *         description: Portfolio created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Portfolio'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
```

---

## 12. Git and Version Control Standards

### 12.1 Commit Messages
```bash
# ✅ DO: Use conventional commit format
feat: add portfolio optimization endpoint
fix: resolve calculation error in risk metrics
docs: update API documentation for new endpoints
test: add unit tests for portfolio service
refactor: extract common validation logic
perf: optimize database queries for large portfolios

# ❌ DON'T: Use vague or unclear messages
fix stuff
update
changes
```

### 12.2 Branch Naming
```bash
# ✅ DO: Use descriptive branch names
feature/portfolio-optimization
bugfix/risk-calculation-error
hotfix/security-vulnerability
refactor/validation-middleware
docs/api-documentation-update

# ❌ DON'T: Use unclear branch names
fix
update
new-feature
```

---

## 13. Code Review Checklist

### 13.1 Before Submitting PR
- [ ] Code follows TypeScript standards
- [ ] Components use semantic naming
- [ ] Design tokens are used instead of hardcoded values
- [ ] Proper error handling is implemented
- [ ] Tests are written and passing
- [ ] Documentation is updated
- [ ] Security considerations are addressed
- [ ] Performance implications are considered

### 13.2 During Code Review
- [ ] Code is readable and maintainable
- [ ] Business logic is correctly implemented
- [ ] Edge cases are handled
- [ ] No security vulnerabilities
- [ ] No performance bottlenecks
- [ ] Follows established patterns
- [ ] Proper separation of concerns

---

## 14. Tools and Configuration

### 14.1 ESLint Configuration
```json
{
  "extends": [
    "@typescript-eslint/recommended",
    "next/core-web-vitals",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### 14.2 Prettier Configuration
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

---

## 15. Continuous Integration

### 15.1 Pre-commit Hooks
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

---

This coding standards document should be reviewed and updated regularly to reflect the evolving needs of the AARC Capital platform. All team members should be familiar with these standards and apply them consistently across the codebase.
