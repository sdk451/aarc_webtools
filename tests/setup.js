// Test setup file
require('dotenv').config({ path: '.env.test' })

// Set test environment variables
process.env.NODE_ENV = 'test'
process.env.DB_NAME = 'aarc_platform_test'
process.env.REDIS_HOST = 'localhost'
process.env.REDIS_PORT = '6379'
process.env.JWT_SECRET = 'test-jwt-secret-key'
process.env.JWT_EXPIRES_IN = '1h'
process.env.BCRYPT_ROUNDS = '4' // Faster for tests

// Global test timeout
jest.setTimeout(10000)
