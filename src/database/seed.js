const bcrypt = require('bcryptjs');
const { getPool } = require('./connection');
const logger = require('../utils/logger');

const seedData = async () => {
  try {
    const pool = getPool();

    // Check if data already exists
    const userCheck = await pool.query('SELECT COUNT(*) FROM users');
    if (parseInt(userCheck.rows[0].count) > 0) {
      logger.info('Database already seeded, skipping...');
      return;
    }

    // Hash password for demo user
    const hashedPassword = await bcrypt.hash('demo123456', 12);

    // Insert demo user
    const userResult = await pool.query(
      'INSERT INTO users (email, password_hash, first_name, last_name, email_verified, subscription_tier) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      ['demo@aarcapital.com', hashedPassword, 'Demo', 'User', true, 'basic_pro']
    );

    const userId = userResult.rows[0].id;

    // Insert sample content
    const contentData = [
      {
        title: 'Introduction to Portfolio Theory',
        content: 'Modern Portfolio Theory (MPT) is a framework for constructing investment portfolios that maximize expected return for a given level of risk...',
        type: 'lesson',
        category: 'Portfolio Theory',
        difficulty_level: 'beginner',
        published: true
      },
      {
        title: 'Risk vs Return Fundamentals',
        content: 'Understanding the relationship between risk and return is fundamental to investment decision-making...',
        type: 'tutorial',
        category: 'Risk Management',
        difficulty_level: 'beginner',
        published: true
      },
      {
        title: 'Diversification Strategies',
        content: 'Diversification is a risk management technique that mixes a wide variety of investments within a portfolio...',
        type: 'article',
        category: 'Portfolio Management',
        difficulty_level: 'intermediate',
        published: true
      },
      {
        title: 'Beta Coefficient',
        content: 'Beta is a measure of the volatility, or systematic risk, of a security or portfolio compared to the market as a whole...',
        type: 'glossary',
        category: 'Financial Terms',
        difficulty_level: 'intermediate',
        published: true
      }
    ];

    for (const content of contentData) {
      await pool.query(
        'INSERT INTO content (title, content, type, category, difficulty_level, published, author_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [content.title, content.content, content.type, content.category, content.difficulty_level, content.published, userId]
      );
    }

    logger.info('Database seeded successfully with demo data');
  } catch (error) {
    logger.error('Seeding failed:', error);
    throw error;
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedData()
    .then(() => {
      logger.info('Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Seeding failed:', error);
      process.exit(1);
    });
}

module.exports = { seedData };
