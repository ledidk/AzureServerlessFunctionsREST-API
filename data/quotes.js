const fs = require('fs');
const path = require('path');

class QuotesData {
  constructor() {
    this.quotesFile = path.join(__dirname, 'quotes.json');
    this.quotes = this.loadQuotes();
  }

  loadQuotes() {
    try {
      if (fs.existsSync(this.quotesFile)) {
        const data = fs.readFileSync(this.quotesFile, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.log('Loading default quotes...');
    }
    
    // Default quotes if file doesn't exist or is corrupted
    return this.getDefaultQuotes();
  }

  saveQuotes() {
    try {
      fs.writeFileSync(this.quotesFile, JSON.stringify(this.quotes, null, 2));
    } catch (error) {
      console.error('Failed to save quotes:', error);
    }
  }

  getQuotes() {
    return this.quotes;
  }

  getQuotesByCategory(category) {
    return this.quotes.filter(quote => 
      quote.category.toLowerCase() === category.toLowerCase()
    );
  }

  getCategories() {
    const categories = [...new Set(this.quotes.map(quote => quote.category))];
    return categories.sort();
  }

  addQuote(quote) {
    this.quotes.push(quote);
    this.saveQuotes();
  }

  getDefaultQuotes() {
    return [
      {
        id: 1,
        author: "Linus Torvalds",
        text: "Talk is cheap. Show me the code.",
        category: "tech"
      },
      {
        id: 2,
        author: "Steve Jobs",
        text: "Innovation distinguishes between a leader and a follower.",
        category: "inspiration"
      },
      {
        id: 3,
        author: "Bill Gates",
        text: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.",
        category: "funny"
      },
      {
        id: 4,
        author: "Grace Hopper",
        text: "The most dangerous phrase in the language is, 'We've always done it this way.'",
        category: "inspiration"
      },
      {
        id: 5,
        author: "Donald Knuth",
        text: "Premature optimization is the root of all evil.",
        category: "tech"
      },
      {
        id: 6,
        author: "Martin Fowler",
        text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        category: "tech"
      },
      {
        id: 7,
        author: "Anonymous",
        text: "There are only 10 types of people in the world: those who understand binary and those who don't.",
        category: "funny"
      },
      {
        id: 8,
        author: "Edsger Dijkstra",
        text: "Simplicity is prerequisite for reliability.",
        category: "tech"
      },
      {
        id: 9,
        author: "Kent Beck",
        text: "I'm not a great programmer; I'm just a good programmer with great habits.",
        category: "inspiration"
      },
      {
        id: 10,
        author: "Anonymous",
        text: "99 little bugs in the code, 99 little bugs. Take one down, patch it around, 117 little bugs in the code.",
        category: "debugging"
      },
      {
        id: 11,
        author: "Robert C. Martin",
        text: "Clean code always looks like it was written by someone who cares.",
        category: "tech"
      },
      {
        id: 12,
        author: "Anonymous",
        text: "Programming is like sex: one mistake and you have to support it for the rest of your life.",
        category: "funny"
      },
      {
        id: 13,
        author: "Alan Kay",
        text: "The best way to predict the future is to invent it.",
        category: "inspiration"
      },
      {
        id: 14,
        author: "Anonymous",
        text: "A user interface is like a joke. If you have to explain it, it's not that good.",
        category: "tech"
      },
      {
        id: 15,
        author: "Jeff Atwood",
        text: "The best code is no code at all.",
        category: "productivity"
      },
      {
        id: 16,
        author: "Anonymous",
        text: "Debugging is twice as hard as writing the code in the first place.",
        category: "debugging"
      },
      {
        id: 17,
        author: "Larry Wall",
        text: "The three chief virtues of a programmer are: Laziness, Impatience and Hubris.",
        category: "funny"
      },
      {
        id: 18,
        author: "Anonymous",
        text: "Code never lies, comments sometimes do.",
        category: "tech"
      },
      {
        id: 19,
        author: "John Johnson",
        text: "First, solve the problem. Then, write the code.",
        category: "productivity"
      },
      {
        id: 20,
        author: "Anonymous",
        text: "It works on my machine.",
        category: "debugging"
      }
    ];
  }
}

module.exports = new QuotesData();