# AARC Capital Investor Confidence Platform - Backend API

A robust, scalable backend infrastructure for the AARC Capital Investor Confidence Platform, built with Node.js, Express, PostgreSQL, and Redis.

## Features

- **Authentication System**: JWT-based authentication with user registration, login, and session management
- **Database**: PostgreSQL with comprehensive schema for users, content, analytics, and portfolio simulations
- **Caching**: Redis for session storage and API response caching
- **API Documentation**: Swagger/OpenAPI documentation
- **Security**: Helmet, CORS, rate limiting, and input validation
- **Monitoring**: Health checks, logging with Winston, and error handling
- **Testing**: Jest test suite with coverage reporting
- **Containerization**: Docker and Docker Compose for easy deployment

## Quick Start

### Prerequisites

- Node.js 18+ 
- Docker and Docker Compose
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aarc_webtools
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Run database migrations**
   ```bash
   docker-compose exec api npm run migrate
   ```

5. **Seed the database (optional)**
   ```bash
   docker-compose exec api npm run seed
   ```

6. **Access the API**
   - API: http://localhost:3000
   - API Documentation: http://localhost:3000/api-docs
   - Health Check: http://localhost:3000/api/health

### Development Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start PostgreSQL and Redis**
   ```bash
   docker-compose up -d postgres redis
   ```

3. **Run migrations**
   ```bash
   npm run migrate
   ```

4. **Seed database**
   ```bash
   npm run seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user information

### Content
- `GET /api/content` - Get educational content (with filtering)
- `GET /api/content/:id` - Get specific content by ID

### Health
- `GET /api/health` - Comprehensive health check
- `GET /api/health/ready` - Readiness check
- `GET /api/health/live` - Liveness check

## Database Schema

The database includes the following main tables:

- **users**: User accounts and authentication
- **content**: Educational content and materials
- **analytics**: User interaction tracking
- **sessions**: JWT session management
- **user_progress**: Learning progress tracking
- **portfolio_simulations**: Portfolio simulation data

## Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run test suite
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database with sample data
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `development` |
| `PORT` | Server port | `3000` |
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `DB_NAME` | Database name | `aarc_platform` |
| `DB_USER` | Database user | `aarc_user` |
| `DB_PASSWORD` | Database password | `aarc_password` |
| `REDIS_HOST` | Redis host | `localhost` |
| `REDIS_PORT` | Redis port | `6379` |
| `JWT_SECRET` | JWT secret key | Required |
| `JWT_EXPIRES_IN` | JWT expiration | `24h` |

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: API request rate limiting
- **Input Validation**: Joi schema validation
- **Password Hashing**: bcrypt with configurable rounds
- **JWT**: Secure token-based authentication
- **Token Blacklisting**: Redis-based token revocation

## Monitoring and Logging

- **Winston**: Structured logging with file rotation
- **Health Checks**: Comprehensive health monitoring
- **Error Handling**: Centralized error handling middleware
- **Request Logging**: Morgan HTTP request logging

## Docker

The application is fully containerized with:

- **Multi-stage Dockerfile** for optimized production builds
- **Docker Compose** for local development
- **Health checks** for container orchestration
- **Volume mounts** for development hot-reloading

## Contributing

1. Follow the existing code style (ESLint configuration included)
2. Write tests for new features
3. Update documentation as needed
4. Ensure all tests pass before submitting

## License

MIT License - see LICENSE file for details
