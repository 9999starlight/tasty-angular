const express = require('express')
const router = express.Router()
const authUser = require('../middlewares/auth_user')
const {
  getAllComments,
  getSingleComment,
  addComment,
  deleteSingleComment,
  deleteMultipleComments
} = require('../controllers/comments_ctrl')
const { commentValidation } = require('../joi_validation')

// @desc    GET comment
// @route   GET /comments
// @access  Private - Admin
router.get('/', authUser, getAllComments)

// @desc    GET comment
// @route   GET /comments/:commentId
// @access  Private
router.get('/:commentId', authUser, getSingleComment)

// @desc    POST comment
// @route   POST /comments
// @access  Private
router.post('/', authUser, commentValidation, addComment)

// @desc    DELETE comment
// @route   DELETE /comments/:commentId
// @access  Private
router.delete('/:commentId', authUser, deleteSingleComment)

module.exports = router
