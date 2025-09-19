const request = require('supertest')
const app = require('../app')

describe('Health Routes', () => {
  describe('GET /api/health', () => {
    it('should return health status structure', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(503) // Will be 503 because database/redis not available

      expect(response.body.status).toBeDefined()
      expect(response.body.timestamp).toBeDefined()
      expect(response.body.uptime).toBeDefined()
      expect(response.body.version).toBeDefined()
      expect(response.body.services).toBeDefined()
    })
  })

  describe('GET /api/health/ready', () => {
    it('should return not ready status when services unavailable', async () => {
      const response = await request(app)
        .get('/api/health/ready')
        .expect(503)

      expect(response.body.status).toBe('not ready')
      expect(response.body.timestamp).toBeDefined()
    })
  })

  describe('GET /api/health/live', () => {
    it('should return alive status', async () => {
      const response = await request(app)
        .get('/api/health/live')
        .expect(200)

      expect(response.body.status).toBe('alive')
      expect(response.body.timestamp).toBeDefined()
      expect(response.body.uptime).toBeDefined()
    })
  })
})
