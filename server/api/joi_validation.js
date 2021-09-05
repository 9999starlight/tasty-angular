const Joi = require('joi');

exports.registerValidation = (req, res, next) => {
  const registerUserSchema = Joi.object({
    username: Joi.string()
      .min(4)
      .max(30)
      .regex(/^[a-z0-9_\-@.]{4,30}$/i)
      .required(),
    password: Joi.string().min(6).max(1024).required(),
    user_image: Joi.object()
  })
  const { error } = registerUserSchema.validate(req.body)
  if (error) {
    console.log('joi error ' + error.details[0].message)
    return res.status(400).json({
      error: error.details[0].message
    })
  }
  next()
}

exports.loginValidation = (req, res, next) => {
  const loginUserSchema = Joi.object({
    username: Joi.string()
      .min(4)
      .max(30)
      .regex(/^[a-z0-9_-]{4,30}$/i)
      .required(),
    password: Joi.string().min(6).max(1024).required()
  })
  const { error } = loginUserSchema.validate(req.body)
  if (error) {
    console.log('joi error ' + error.details[0].message)
    return res.status(400).json({
      error: error.details[0].message
    })
  }
  next()
}

exports.favoritesValidation = (req, res, next) => {
  const favoritesSchema = Joi.object({
    favoriteId: Joi.string().required()
  })
  const { error } = favoritesSchema.validate(req.body)
  if (error) {
    console.log('joi error ' + error.details[0].message)
    return res.status(400).json({
      error: error.details[0].message
    })
  }
  next()
}

exports.newRecipeValidation = (req, res, next) => {
  const newRecipeSchema = Joi.object({
    mealName: Joi.string()
      .min(4)
      .max(50)
      .regex(/^(?!\s*$).{4,50}/i)
      .required(),
    intro: Joi.string()
      .min(4)
      .max(150)
      .regex(/^(?!\s*$).{4,150}/i)
      .required(),
    dishType: Joi.string()
      .min(3)
      .max(40)
      .regex(
        /^\b(pasta|salad|bread|soup|side dish|roast|pizza|stew|sandwich|pastry|sauce|cookie|dessert|drink|main|snack)\b$/i
      )
      .required(),
    level: Joi.string().regex(/^\b(easy|medium|hard)\b$/i),
    timing: Joi.number().required(),
    persons: Joi.number().required(),
    regional: Joi.string(),
    vegetarian: Joi.boolean(),
    glutenFree: Joi.boolean(),
    image: Joi.object(),
    ingredients: Joi.array()
      .items({
        ingredient: Joi.string().required(),
        amount: Joi.string().allow('')
      })
      .required(),
    steps: Joi.array().items({ step: Joi.string().required() }).required(),
    author: Joi.string().required()
  })
  const { error } = newRecipeSchema.validate(req.body)
  if (error) {
    console.log('joi error ' + error.details[0].message)
    return res.status(400).json({
      error: error.details[0].message
    })
  }
  next()
}

exports.updateRecipeValidation = (req, res, next) => {
  const updateRecipeSchema = Joi.object({
    mealName: Joi.string()
      .min(4)
      .max(50)
      .regex(/^(?!\s*$).{4,50}/i)
      .required(),
    intro: Joi.string()
      .min(4)
      .max(150)
      .regex(/^(?!\s*$).{4,150}/i)
      .required(),
    dishType: Joi.string()
      .min(3)
      .max(40)
      .regex(/^(?!\s*$).{3,40}/i)
      .required(),
    level: Joi.string(),
    timing: Joi.number().required(),
    persons: Joi.number().required(),
    regional: Joi.string(),
    vegetarian: Joi.boolean(),
    glutenFree: Joi.boolean(),
    image: Joi.object(),
    ingredients: Joi.array()
      .items({
        ingredient: Joi.string().required(),
        amount: Joi.string().allow('')
      })
      .required(),
    steps: Joi.array().items({ step: Joi.string().required() }).required()
  })
  const { error } = updateRecipeSchema.validate(req.body)
  if (error) {
    console.log('joi error ' + error.details[0].message)
    return res.status(400).json({
      error: error.details[0].message
    })
  }
  next()
}

exports.updateRating = (req, res, next) => {
  const updateRatingSchema = Joi.object({
    rate: Joi.number().required().integer().min(1).max(10)
  })
  const { error } = updateRatingSchema.validate(req.body)
  if (error) {
    console.log('joi error ' + error.details[0].message)
    return res.status(400).json({
      error: error.details[0].message
    })
  }
  next()
}

exports.commentValidation = (req, res, next) => {
  const commentSchema = Joi.object({
    commentedRecipeId: Joi.string().required(),
    commentBody: Joi.string().min(4).max(200).required(),
    author: Joi.string()
  })
  const { error } = commentSchema.validate(req.body)
  if (error) {
    console.log('joi error ' + error.details[0].message)
    return res.status(400).json({
      error: error.details[0].message
    })
  }
  next()
}
