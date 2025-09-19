const request = require('supertest')
const app = require('../app')

describe('Authentication Routes', () => {
  // Note: These tests require database and Redis to be running
  // For now, we'll test the basic route structure

  describe('POST /api/auth/register', () => {
    it('should return error for invalid email format', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'password123'
      }

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400)

      expect(response.body.success).toBe(false)
      expect(response.body.error).toContain('email')
    })

    it('should return error for short password', async () => {
      const userData = {
        email: 'test@example.com',
        password: '123'
      }

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400)

      expect(response.body.success).toBe(false)
      expect(response.body.error).toContain('password')
    })

    it('should return error for missing required fields', async () => {
      const userData = {
        email: 'test@example.com'
        // missing password
      }

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400)

      expect(response.body.success).toBe(false)
      expect(response.body.error).toContain('password')
    })
  })

  describe('POST /api/auth/login', () => {
    it('should return error for invalid email format', async () => {
      const loginData = {
        email: 'invalid-email',
        password: 'password123'
      }

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(400)

      expect(response.body.success).toBe(false)
      expect(response.body.error).toContain('email')
    })

    it('should return error for missing required fields', async () => {
      const loginData = {
        email: 'test@example.com'
        // missing password
      }

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(400)

      expect(response.body.success).toBe(false)
      expect(response.body.error).toContain('password')
    })
  })

  describe('GET /api/auth/me', () => {
    it('should return error without token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .expect(401)

      expect(response.body.success).toBe(false)
      expect(response.body.error).toContain('Access token required')
    })
  })
})
