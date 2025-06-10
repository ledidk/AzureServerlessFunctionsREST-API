const express = require('express');
const router = express.Router();
const { validateQuote } = require('../middleware/validation');
const quotesController = require('../controllers/quotesController');

// GET /quotes - Get all quotes with optional pagination
router.get('/', quotesController.getAllQuotes);

// GET /quotes/random - Get a random quote
router.get('/random', quotesController.getRandomQuote);

// GET /quotes/stats - Get API statistics
router.get('/stats', quotesController.getStats);

// GET /quotes/category/:category - Get quotes by category
router.get('/category/:category', quotesController.getQuotesByCategory);

// POST /quotes - Submit a new quote
router.post('/', validateQuote, quotesController.createQuote);

module.exports = router;