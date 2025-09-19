const express = require('express');
const { getPool } = require('../database/connection');
const { redisClient } = require('../cache/redis');
const logger = require('../utils/logger');

const router = express.Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 uptime:
 *                   type: number
 *                   description: Process uptime in seconds
 *                 version:
 *                   type: string
 *                   example: 1.0.0
 *                 services:
 *                   type: object
 *                   properties:
 *                     database:
 *                       type: string
 *                       example: connected
 *                     redis:
 *                       type: string
 *                       example: connected
 *       503:
 *         description: Service is unhealthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: unhealthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.get('/', async (req, res) => {
  const healthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0',
    services: {}
  };

  const errors = [];

  try {
    // Check database connection
    const pool = getPool();
    await pool.query('SELECT 1');
    healthCheck.services.database = 'connected';
  } catch (error) {
    logger.error('Database health check failed:', error);
    healthCheck.services.database = 'disconnected';
    errors.push('Database connection failed');
  }

  try {
    // Check Redis connection
    await redisClient.ping();
    healthCheck.services.redis = 'connected';
  } catch (error) {
    logger.error('Redis health check failed:', error);
    healthCheck.services.redis = 'disconnected';
    errors.push('Redis connection failed');
  }

  // Determine overall health status
  if (errors.length > 0) {
    healthCheck.status = 'unhealthy';
    healthCheck.errors = errors;
    return res.status(503).json(healthCheck);
  }

  res.json(healthCheck);
});

/**
 * @swagger
 * /api/health/ready:
 *   get:
 *     summary: Readiness check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is ready
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ready
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       503:
 *         description: Service is not ready
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: not ready
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 reason:
 *                   type: string
 */
router.get('/ready', async (req, res) => {
  try {
    // Check if all critical services are available
    const pool = getPool();
    await pool.query('SELECT 1');
    await redisClient.ping();

    res.json({
      status: 'ready',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Readiness check failed:', error);
    res.status(503).json({
      status: 'not ready',
      timestamp: new Date().toISOString(),
      reason: 'Critical services unavailable'
    });
  }
});

/**
 * @swagger
 * /api/health/live:
 *   get:
 *     summary: Liveness check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is alive
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: alive
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 uptime:
 *                   type: number
 *                   description: Process uptime in seconds
 */
router.get('/live', (req, res) => {
  res.json({
    status: 'alive',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

module.exports = router;
