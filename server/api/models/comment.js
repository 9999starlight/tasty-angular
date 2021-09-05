const mongoose = require('mongoose')

// create comment Schema - related to recipe via ref: 'Recipe', author  ref: user
const commentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  commentedRecipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  commentBody: {
    type: String,
    required: true
  }
})

// export model for comment
module.exports = mongoose.model('Comment', commentSchema)
