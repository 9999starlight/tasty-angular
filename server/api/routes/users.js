const express = require('express')
const router = express.Router()
const authUser = require('../middlewares/auth_user')
const {
  registerUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  // deleteUser,
  updateUserImage,
  addToFavorites,
  removeFromFavorites,
  changeAdminStatus,
  changeDisableStatus
} = require('../controllers/users_ctrl')
const {
  registerValidation,
  loginValidation,
  favoritesValidation
} = require('../joi_validation')
const upload = require('../middlewares/multer')

// @desc    POST user registration
// @route   POST /users/register
// @access  PUBLIC
router.post(
  '/register',
  upload.single('user_image'),
  registerValidation,
  registerUser
)

// @desc    POST login user
// @route   POST /users/login
// @access  PUBLIC
router.post('/login', loginValidation, loginUser)

// @desc    GET get all users
// @route   GET /users
// @access  ADMIN
router.get('/', authUser, getAllUsers)

// @desc    GET get single user
// @route   GET /users/:userId
// @access  Private
router.get('/:userId', authUser, getSingleUser)

// @desc    PATCH update user photo
// @route   PATCH /users/:userId
// @access  Private
router.patch('/:userId', authUser, upload.single('user_image'), updateUserImage)

// @desc    PATCH add to user favorites
// @route   PATCH /users/favorites/:userId
// @access  Private
router.patch(
  '/favorites/:userId',
  authUser,
  favoritesValidation,
  addToFavorites
)

// @desc    PATCH remove from user favorites
// @route   PATCH /users/remove_favorite/:userId
// @access  Private
router.patch(
  '/remove_favorite/:userId',
  authUser,
  favoritesValidation,
  removeFromFavorites
)

// @desc    PATCH change user admin status
// @route   PATCH /users/adminStatus/:userId
// @access  ADMIN
router.patch('/adminStatus/:userId', authUser, changeAdminStatus)

// @desc    PATCH disable/enable user
// @route   PATCH /users/disableStatus/:userId
// @access  ADMIN
router.patch('/disableStatus/:userId', authUser, changeDisableStatus)

// @desc    DELETE remove user
// @route   DELETE /users/:userId
// @access  ADMIN
// router.delete('/:userId', authUser, deleteUser)

module.exports = router
