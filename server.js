const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const quotesRoutes = require('./routes/quotes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  }
});

// Apply rate limiting to all requests
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API Documentation endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Dev Quotes API - Inspiring developers one quote at a time!',
    version: '1.0.0',
    documentation: {
      endpoints: {
        'GET /quotes': 'Get all quotes',
        'GET /quotes/random': 'Get a random quote',
        'GET /quotes/category/:category': 'Get quotes by category',
        'POST /quotes': 'Submit a new quote',
        'GET /quotes/stats': 'Get API statistics'
      },
      categories: ['tech', 'funny', 'inspiration', 'productivity', 'debugging'],
      examples: {
        'Get all quotes': `${req.protocol}://${req.get('host')}/quotes`,
        'Random quote': `${req.protocol}://${req.get('host')}/quotes/random`,
        'Tech quotes': `${req.protocol}://${req.get('host')}/quotes/category/tech`,
        'Submit quote': `POST ${req.protocol}://${req.get('host')}/quotes`
      }
    },
    author: 'Built with ❤️ for developers',
    github: 'https://github.com/your-username/dev-quotes-api'
  });
});

// Routes
app.use('/quotes', quotesRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\n🚀 Dev Quotes API is running!`);
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log(`📖 Documentation: http://localhost:${PORT}`);
  console.log(`🎲 Random quote: http://localhost:${PORT}/quotes/random`);
  console.log(`💡 Tech quotes: http://localhost:${PORT}/quotes/category/tech`);
  console.log(`\n✨ Ready to inspire developers worldwide! ✨\n`);
});

module.exports = app;