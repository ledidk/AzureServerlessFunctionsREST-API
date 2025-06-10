const quotesData = require('../data/quotes');
const { v4: uuidv4 } = require('uuid');

class QuotesController {
  // Get all quotes with optional pagination
  getAllQuotes(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const quotes = quotesData.getQuotes();
      const paginatedQuotes = quotes.slice(startIndex, endIndex);

      const result = {
        quotes: paginatedQuotes,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(quotes.length / limit),
          totalQuotes: quotes.length,
          hasNext: endIndex < quotes.length,
          hasPrev: startIndex > 0
        }
      };

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve quotes' });
    }
  }

  // Get a random quote
  getRandomQuote(req, res) {
    try {
      const quotes = quotesData.getQuotes();
      if (quotes.length === 0) {
        return res.status(404).json({ error: 'No quotes available' });
      }

      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex];

      res.json({
        quote: randomQuote,
        totalQuotes: quotes.length
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve random quote' });
    }
  }

  // Get quotes by category
  getQuotesByCategory(req, res) {
    try {
      const { category } = req.params;
      const quotes = quotesData.getQuotesByCategory(category.toLowerCase());

      if (quotes.length === 0) {
        return res.status(404).json({ 
          error: `No quotes found for category: ${category}`,
          availableCategories: quotesData.getCategories()
        });
      }

      res.json({
        category: category.toLowerCase(),
        count: quotes.length,
        quotes: quotes
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve quotes by category' });
    }
  }

  // Create a new quote
  createQuote(req, res) {
    try {
      const { author, text, category } = req.body;
      
      const newQuote = {
        id: uuidv4(),
        author: author.trim(),
        text: text.trim(),
        category: category.toLowerCase(),
        submittedAt: new Date().toISOString(),
        userSubmitted: true
      };

      quotesData.addQuote(newQuote);

      res.status(201).json({
        message: 'Quote successfully added! 🎉',
        quote: newQuote
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create quote' });
    }
  }

  // Get API statistics
  getStats(req, res) {
    try {
      const quotes = quotesData.getQuotes();
      const categories = quotesData.getCategories();
      
      const categoryStats = categories.reduce((stats, category) => {
        stats[category] = quotesData.getQuotesByCategory(category).length;
        return stats;
      }, {});

      const userSubmitted = quotes.filter(q => q.userSubmitted).length;

      res.json({
        totalQuotes: quotes.length,
        userSubmittedQuotes: userSubmitted,
        originalQuotes: quotes.length - userSubmitted,
        categories: categoryStats,
        availableCategories: categories,
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve statistics' });
    }
  }
}

module.exports = new QuotesController();