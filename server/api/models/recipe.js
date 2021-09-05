const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  mealName: {
    type: String,
    lowercase: true,
    required: true,
    minlength: 4,
    maxlength: 50,
    match: /^(?!\s*$).{4,50}/i
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  intro: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 150,
    match: /^(?!\s*$).{4,150}/i
  },
  dishType: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40,
    match: /^\b(pasta|salad|bread|soup|side dish|roast|pizza|stew|sandwich|pastry|sauce|cookie|dessert|drink|main|snack)\b$/i
  },
  level: {
    type: String,
    required: false,
    default: '',
    match: /^\b(easy|medium|hard)\b$/i
  },
  timing: {
    type: Number,
    required: true
  },
  persons: {
    type: Number,
    required: true
  },
  regional: {
    type: String,
    lowercase: true,
    required: false,
    default: ''
  },
  vegetarian: {
    type: Boolean,
    required: false,
    default: false
  },
  glutenFree: {
    type: Boolean,
    required: false,
    default: false
  },
  image: {
    type: Object,
    required: false,
    default: {}
  },
  ingredients: [
    {
      _id: false,
      ingredient: {
        type: String,
        lowercase: true,
        required: true
      },
      amount: {
        type: String
      }
    }
  ],
  steps: [
    {
      _id: false,
      step: {
        type: String,
        required: true
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  rates: [
    {
      _id: false,
      ratedBy: {
        type: mongoose.Schema.Types.ObjectId
      },
      rate: {
        type: Number
      }
    }
  ],
  rating: {
    type: Number,
    default: 0
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      required: true
    }
  ] // attached related comments to recipe via ref
})

module.exports = mongoose.model('Recipe', recipeSchema)
