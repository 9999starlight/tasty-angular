const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 30,
    match: /^[a-z0-9_\-@.]{4,30}$/i
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024
  },
  user_image: {
    type: Object,
    required: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      required: true
    }
  ],
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      required: true
    }
  ]
})

module.exports = mongoose.model('User', userSchema)
