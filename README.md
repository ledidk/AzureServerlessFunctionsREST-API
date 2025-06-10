# 🚀 Dev Quotes API

A fun and inspiring REST API that serves developer quotes and motivational sayings. Built with Node.js and Express, this API provides quotes from famous programmers, tech leaders, and the developer community.

## ✨ Features

- **Random Quotes** - Get inspiring quotes to fuel your coding sessions
- **Category Filtering** - Browse quotes by tech, funny, inspiration, productivity, or debugging
- **User Submissions** - Allow developers to contribute their favorite quotes
- **Pagination** - Efficiently browse through large collections
- **Rate Limiting** - Built-in protection against abuse
- **Data Persistence** - Quotes are saved to a local JSON file
- **Comprehensive Testing** - Full test suite with Jest and Supertest
- **API Statistics** - Track usage and quote distribution

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Joi** - Data validation
- **Jest & Supertest** - Testing framework
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Request throttling

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd dev-quotes-api

# Install dependencies
npm install

# Start development server
npm run dev

# Or start production server
npm start
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API documentation and welcome message |
| GET | `/quotes` | Get all quotes (with pagination) |
| GET | `/quotes/random` | Get a single random quote |
| GET | `/quotes/category/:category` | Get quotes by category |
| GET | `/quotes/stats` | Get API statistics |
| POST | `/quotes` | Submit a new quote |
| GET | `/health` | Health check endpoint |

### Categories

- `tech` - Technical programming quotes
- `funny` - Humorous developer quotes
- `inspiration` - Motivational quotes
- `productivity` - Efficiency and workflow quotes
- `debugging` - Debugging and problem-solving quotes

## 🔍 API Examples

### Get All Quotes
```bash
GET /quotes
GET /quotes?page=1&limit=10
```

**Response:**
```json
{
  "quotes": [
    {
      "id": 1,
      "author": "Linus Torvalds",
      "text": "Talk is cheap. Show me the code.",
      "category": "tech"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 2,
    "totalQuotes": 20,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### Get Random Quote
```bash
GET /quotes/random
```

**Response:**
```json
{
  "quote": {
    "id": 5,
    "author": "Donald Knuth",
    "text": "Premature optimization is the root of all evil.",
    "category": "tech"
  },
  "totalQuotes": 20
}
```

### Get Quotes by Category
```bash
GET /quotes/category/tech
```

**Response:**
```json
{
  "category": "tech",
  "count": 8,
  "quotes": [
    {
      "id": 1,
      "author": "Linus Torvalds",
      "text": "Talk is cheap. Show me the code.",
      "category": "tech"
    }
  ]
}
```

### Submit New Quote
```bash
POST /quotes
Content-Type: application/json

{
  "author": "Your Name",
  "text": "Code is poetry written in logic.",
  "category": "inspiration"
}
```

**Response:**
```json
{
  "message": "Quote successfully added! 🎉",
  "quote": {
    "id": "uuid-here",
    "author": "Your Name",
    "text": "Code is poetry written in logic.",
    "category": "inspiration",
    "submittedAt": "2024-01-15T10:30:00.000Z",
    "userSubmitted": true
  }
}
```

### Get API Statistics
```bash
GET /quotes/stats
```

**Response:**
```json
{
  "totalQuotes": 25,
  "userSubmittedQuotes": 5,
  "originalQuotes": 20,
  "categories": {
    "tech": 8,
    "funny": 4,
    "inspiration": 6,
    "productivity": 2,
    "debugging": 5
  },
  "availableCategories": ["debugging", "funny", "inspiration", "productivity", "tech"],
  "lastUpdated": "2024-01-15T10:30:00.000Z"
}
```

## 🔒 Security Features

- **Rate Limiting** - 100 requests per 15 minutes per IP
- **Helmet** - Security headers
- **Input Validation** - Joi schema validation
- **CORS** - Configurable cross-origin requests
- **Error Handling** - Comprehensive error responses

## 📊 Data Validation

### Quote Schema
```javascript
{
  author: string (2-100 characters, required),
  text: string (10-500 characters, required),
  category: enum ['tech', 'funny', 'inspiration', 'productivity', 'debugging'] (required)
}
```

## 🚀 Deployment Options

### Render
1. Connect your GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Railway
1. Connect your GitHub repository
2. Railway will auto-detect and deploy

### Environment Variables
```bash
PORT=3000
NODE_ENV=production
```

## 🧪 Testing

The API includes comprehensive tests covering:
- All endpoints
- Validation logic
- Error handling
- Edge cases

Run tests with:
```bash
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your quotes or improvements
4. Write tests for new features
5. Submit a pull request

## 📝 Quote Submission Guidelines

When submitting quotes:
- Ensure they're appropriate and inspiring
- Attribute to the correct author
- Choose the most fitting category
- Keep text between 10-500 characters

## 🎯 Future Enhancements

- [ ] MongoDB integration
- [ ] User authentication
- [ ] Quote voting system
- [ ] Swagger/OpenAPI documentation
- [ ] Quote of the day feature
- [ ] Social sharing endpoints
- [ ] Advanced search functionality

## 📄 License

MIT License - feel free to use this project for learning and inspiration!

## 🙏 Acknowledgments

Thanks to all the brilliant developers and tech leaders whose quotes inspire us daily!

---

**Built with ❤️ for the developer community**

*"The best way to predict the future is to invent it." - Alan Kay*