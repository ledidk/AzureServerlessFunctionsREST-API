const Joi = require('joi');

const quoteSchema = Joi.object({
  author: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.min': 'Author name must be at least 2 characters long',
      'string.max': 'Author name cannot exceed 100 characters',
      'any.required': 'Author is required'
    }),
  
  text: Joi.string()
    .min(10)
    .max(500)
    .required()
    .messages({
      'string.min': 'Quote text must be at least 10 characters long',
      'string.max': 'Quote text cannot exceed 500 characters',
      'any.required': 'Quote text is required'
    }),
  
  category: Joi.string()
    .valid('tech', 'funny', 'inspiration', 'productivity', 'debugging')
    .required()
    .messages({
      'any.only': 'Category must be one of: tech, funny, inspiration, productivity, debugging',
      'any.required': 'Category is required'
    })
});

const validateQuote = (req, res, next) => {
  const { error } = quoteSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.details.map(detail => detail.message),
      validCategories: ['tech', 'funny', 'inspiration', 'productivity', 'debugging']
    });
  }
  
  next();
};

module.exports = { validateQuote };