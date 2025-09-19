const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AARC Capital Platform API',
      version: '1.0.0',
      description: 'API for AARC Capital Investor Confidence Platform',
      contact: {
        name: 'AARC Capital',
        email: 'support@aarcapital.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            id: {
              type: 'integer',
              description: 'User ID'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'User creation timestamp'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'User last update timestamp'
            },
            last_login: {
              type: 'string',
              format: 'date-time',
              description: 'User last login timestamp'
            }
          }
        },
        AuthRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address'
            },
            password: {
              type: 'string',
              minLength: 8,
              description: 'User password'
            }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Request success status'
            },
            token: {
              type: 'string',
              description: 'JWT access token'
            },
            user: {
              $ref: '#/components/schemas/User'
            }
          }
        },
        Content: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Content ID'
            },
            title: {
              type: 'string',
              description: 'Content title'
            },
            content: {
              type: 'string',
              description: 'Content body'
            },
            type: {
              type: 'string',
              enum: ['lesson', 'tutorial', 'glossary', 'article'],
              description: 'Content type'
            },
            published: {
              type: 'boolean',
              description: 'Content publication status'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Content creation timestamp'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Content last update timestamp'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'string',
              description: 'Error message'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js'] // paths to files containing OpenAPI definitions
};

const specs = swaggerJSDoc(options);

module.exports = specs;
