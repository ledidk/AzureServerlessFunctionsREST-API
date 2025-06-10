const request = require('supertest');
const app = require('../server');

describe('Dev Quotes API', () => {
  describe('GET /', () => {
    it('should return API documentation', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toContain('Dev Quotes API');
      expect(res.body.documentation).toBeDefined();
    });
  });

  describe('GET /quotes', () => {
    it('should return all quotes with pagination', async () => {
      const res = await request(app).get('/quotes');
      expect(res.statusCode).toBe(200);
      expect(res.body.quotes).toBeDefined();
      expect(res.body.pagination).toBeDefined();
      expect(Array.isArray(res.body.quotes)).toBe(true);
    });

    it('should handle pagination parameters', async () => {
      const res = await request(app).get('/quotes?page=1&limit=5');
      expect(res.statusCode).toBe(200);
      expect(res.body.quotes.length).toBeLessThanOrEqual(5);
      expect(res.body.pagination.currentPage).toBe(1);
    });
  });

  describe('GET /quotes/random', () => {
    it('should return a random quote', async () => {
      const res = await request(app).get('/quotes/random');
      expect(res.statusCode).toBe(200);
      expect(res.body.quote).toBeDefined();
      expect(res.body.quote.id).toBeDefined();
      expect(res.body.quote.author).toBeDefined();
      expect(res.body.quote.text).toBeDefined();
      expect(res.body.quote.category).toBeDefined();
    });
  });

  describe('GET /quotes/category/:category', () => {
    it('should return quotes for valid category', async () => {
      const res = await request(app).get('/quotes/category/tech');
      expect(res.statusCode).toBe(200);
      expect(res.body.category).toBe('tech');
      expect(res.body.quotes).toBeDefined();
      expect(Array.isArray(res.body.quotes)).toBe(true);
    });

    it('should return 404 for invalid category', async () => {
      const res = await request(app).get('/quotes/category/invalid');
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toContain('No quotes found');
    });
  });

  describe('GET /quotes/stats', () => {
    it('should return API statistics', async () => {
      const res = await request(app).get('/quotes/stats');
      expect(res.statusCode).toBe(200);
      expect(res.body.totalQuotes).toBeDefined();
      expect(res.body.categories).toBeDefined();
      expect(res.body.availableCategories).toBeDefined();
    });
  });

  describe('POST /quotes', () => {
    it('should create a new quote with valid data', async () => {
      const newQuote = {
        author: 'Test Author',
        text: 'This is a test quote for our API testing.',
        category: 'tech'
      };

      const res = await request(app)
        .post('/quotes')
        .send(newQuote);

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toContain('successfully added');
      expect(res.body.quote.author).toBe(newQuote.author);
      expect(res.body.quote.userSubmitted).toBe(true);
    });

    it('should reject quote with invalid data', async () => {
      const invalidQuote = {
        author: 'A', // Too short
        text: 'Short', // Too short
        category: 'invalid' // Invalid category
      };

      const res = await request(app)
        .post('/quotes')
        .send(invalidQuote);

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Validation failed');
      expect(res.body.details).toBeDefined();
    });

    it('should reject quote with missing fields', async () => {
      const incompleteQuote = {
        author: 'Test Author'
        // Missing text and category
      };

      const res = await request(app)
        .post('/quotes')
        .send(incompleteQuote);

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Validation failed');
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('healthy');
      expect(res.body.timestamp).toBeDefined();
    });
  });
});