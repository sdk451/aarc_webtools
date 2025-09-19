const express = require('express');
const Joi = require('joi');
const { getPool } = require('../database/connection');
const { cache } = require('../cache/redis');
const { optionalAuth } = require('../middleware/auth');
const logger = require('../utils/logger');

const router = express.Router();

// Validation schemas
const contentQuerySchema = Joi.object({
  type: Joi.string().valid('lesson', 'tutorial', 'glossary', 'article').optional(),
  category: Joi.string().optional(),
  difficulty: Joi.string().valid('beginner', 'intermediate', 'advanced').optional(),
  published: Joi.boolean().optional(),
  limit: Joi.number().integer().min(1).max(100).default(20),
  offset: Joi.number().integer().min(0).default(0)
});

/**
 * @swagger
 * /api/content:
 *   get:
 *     summary: Get educational content
 *     tags: [Content]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [lesson, tutorial, glossary, article]
 *         description: Filter by content type
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *         description: Filter by difficulty level
 *       - in: query
 *         name: published
 *         schema:
 *           type: boolean
 *         description: Filter by publication status
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Number of items to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Number of items to skip
 *     responses:
 *       200:
 *         description: Content retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Content'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     offset:
 *                       type: integer
 *                     hasMore:
 *                       type: boolean
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', optionalAuth, async (req, res) => {
  try {
    // Validate query parameters
    const { error, value } = contentQuerySchema.validate(req.query);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    const { type, category, difficulty, published, limit, offset } = value;

    // Create cache key
    const cacheKey = `content:${JSON.stringify({ type, category, difficulty, published, limit, offset })}`;

    // Try to get from cache first
    const cachedData = await cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const pool = getPool();

    // Build query
    let query = `
      SELECT c.id, c.title, c.content, c.type, c.category, c.difficulty_level, 
             c.published, c.created_at, c.updated_at,
             u.first_name as author_first_name, u.last_name as author_last_name
      FROM content c
      LEFT JOIN users u ON c.author_id = u.id
      WHERE 1=1
    `;
    const queryParams = [];
    let paramCount = 0;

    if (type) {
      paramCount++;
      query += ` AND c.type = $${paramCount}`;
      queryParams.push(type);
    }

    if (category) {
      paramCount++;
      query += ` AND c.category = $${paramCount}`;
      queryParams.push(category);
    }

    if (difficulty) {
      paramCount++;
      query += ` AND c.difficulty_level = $${paramCount}`;
      queryParams.push(difficulty);
    }

    if (published !== undefined) {
      paramCount++;
      query += ` AND c.published = $${paramCount}`;
      queryParams.push(published);
    }

    // Add ordering and pagination
    query += ` ORDER BY c.created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    queryParams.push(limit, offset);

    // Execute query
    const result = await pool.query(query, queryParams);

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) FROM content c WHERE 1=1';
    const countParams = [];
    let countParamCount = 0;

    if (type) {
      countParamCount++;
      countQuery += ` AND c.type = $${countParamCount}`;
      countParams.push(type);
    }

    if (category) {
      countParamCount++;
      countQuery += ` AND c.category = $${countParamCount}`;
      countParams.push(category);
    }

    if (difficulty) {
      countParamCount++;
      countQuery += ` AND c.difficulty_level = $${countParamCount}`;
      countParams.push(difficulty);
    }

    if (published !== undefined) {
      countParamCount++;
      countQuery += ` AND c.published = $${countParamCount}`;
      countParams.push(published);
    }

    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    // Format response
    const response = {
      success: true,
      data: result.rows.map(row => ({
        id: row.id,
        title: row.title,
        content: row.content,
        type: row.type,
        category: row.category,
        difficultyLevel: row.difficulty_level,
        published: row.published,
        author: row.author_first_name && row.author_last_name
          ? `${row.author_first_name} ${row.author_last_name}`
          : null,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      })),
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    };

    // Cache the response for 5 minutes
    await cache.set(cacheKey, response, 300);

    res.json(response);
  } catch (error) {
    logger.error('Get content error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve content'
    });
  }
});

/**
 * @swagger
 * /api/content/{id}:
 *   get:
 *     summary: Get specific content by ID
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Content ID
 *     responses:
 *       200:
 *         description: Content retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Content'
 *       404:
 *         description: Content not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    // Create cache key
    const cacheKey = `content:${id}`;

    // Try to get from cache first
    const cachedData = await cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const result = await pool.query(
      `SELECT c.id, c.title, c.content, c.type, c.category, c.difficulty_level, 
              c.published, c.created_at, c.updated_at,
              u.first_name as author_first_name, u.last_name as author_last_name
       FROM content c
       LEFT JOIN users u ON c.author_id = u.id
       WHERE c.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Content not found'
      });
    }

    const row = result.rows[0];
    const response = {
      success: true,
      data: {
        id: row.id,
        title: row.title,
        content: row.content,
        type: row.type,
        category: row.category,
        difficultyLevel: row.difficulty_level,
        published: row.published,
        author: row.author_first_name && row.author_last_name
          ? `${row.author_first_name} ${row.author_last_name}`
          : null,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      }
    };

    // Cache the response for 10 minutes
    await cache.set(cacheKey, response, 600);

    res.json(response);
  } catch (error) {
    logger.error('Get content by ID error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve content'
    });
  }
});

module.exports = router;
