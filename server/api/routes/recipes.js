const express = require('express')
const router = express.Router()
const authUser = require('../middlewares/auth_user')
const upload = require('../middlewares/multer')

const {
  getRecipes,
  getSingleRecipe,
  addNewRecipe,
  updateRecipe,
  addRating,
  deleteRecipe
} = require('../controllers/recipes_ctrl')
const {
  newRecipeValidation,
  updateRecipeValidation,
  updateRating
} = require('../joi_validation')

// @desc    Get recipes
// @route   GET /recipes
// @access  Public
router.get('/', getRecipes)

// @desc    Get single recipe
// @route   GET /recipes/:recipeId
// @access  Public
router.get('/:recipeId', getSingleRecipe)

// @desc    POST recipe
// @route   POST /recipes
// @access  Private
router.post(
  '/',
  authUser,
  upload.single('image'),
  newRecipeValidation,
  addNewRecipe
)

// @desc    PATCH recipe
// @route   PATCH /recipes/:recipeId
// @access  Private
router.patch(
  '/:recipeId',
  authUser,
  upload.single('image'),
  updateRecipeValidation,
  updateRecipe
)

// @desc    PATCH rate recipe & update rating
// @route   PATCH /recipes/rate/:recipeId
// @access  Private
router.patch('/rate/:recipeId', authUser, updateRating, addRating)

// @desc    DELETE recipe
// @route   DELETE /recipes/:recipeId
// @access  Private
router.delete('/:recipeId', authUser, deleteRecipe)

module.exports = router
