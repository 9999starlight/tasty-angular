const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Recipe = require('../models/recipe')
const cloudinary = require('cloudinary').v2
require('../middlewares/cloudinary')

const { returnUserImage } = require('../helpers/imageFunction')

exports.registerUser = async (req, res, next) => {
  try {
    const checkUsername = await User.find({
      username: req.body.username
    })
    if (checkUsername.length) {
      return res.status(409).json({
        message: 'Username already exists!'
      })
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    let imageresult = ''
    if (req.file) {
      imageresult = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: 'users'
        },
        (error, result) => {
          console.log(result, error)
        }
      )
    }
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username: req.body.username,
      password: hashPassword,
      user_image: {
        url: imageresult.secure_url,
        id: imageresult.public_id
      }
    })
    const savedUser = await user.save()
    const payload = {
      userId: savedUser._id,
      username: savedUser.username,
      isAdmin: savedUser.isAdmin,
      isDisabled: savedUser.isDisabled,
      createdAt: savedUser.createdAt,
      createdRecipes: savedUser.createdRecipes,
      favorites: savedUser.favorites,
      user_image: returnUserImage(savedUser)
    }

    await jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: '12h'
      },
      (err, token) => {
        if (err) {
          return res.status(401).json({
            message: `Invalid username or password or there is no user record`
          })
        }
        return res.status(200).json({
          message: 'User created',
          token
        })
      }
    )
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      error,
      message: error.message
    })
  }
}

exports.loginUser = async (req, res, next) => {
  //console.log('request: ', req.body)
  try {
    const user = await User.find({
      username: req.body.username
    })
    // check if username exists
    if (!user.length) {
      return res.status(401).json({
        message: `Invalid username or password or there is no user record`
      })
    }
    // if user exists, compare password
    await bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: `Invalid username or password or there is no user record`
        })
      }
      if (result) {
        // if user exists, deny access if disabled
        if (user[0].isDisabled) {
          return res.status(401).json({
            message: `Unauthorized - access denied!`
          })
        }
        const token = jwt.sign(
          {
            username: user[0].username,
            userId: user[0]._id,
            isAdmin: user[0].isAdmin,
            isDisabled: user[0].isDisabled,
            createdAt: user[0].createdAt,
            createdRecipes: user[0].createdRecipes,
            favorites: user[0].favorites,
            user_image: returnUserImage(user[0])
          },
          process.env.JWT_KEY,
          {
            expiresIn: '12h'
          }
        )
        return res.status(200).json({
          message: 'Successfully logged in',
          token
        })
      }
      return res.status(401).json({
        message: `Invalid username or password or there is no user record`
      })
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error,
      message: error.message
    })
  }
}

exports.getAllUsers = async (req, res, next) => {
  try {
    if (!req.userData.isAdmin) {
      return res.status(403).json({
        message: `Unauthorized - access denied!`
      })
    }
    const queryObj = {
      ...req.query
    } // copy query object and then exclude fields
    const excludedFields = ['sort']
    excludedFields.forEach((el) => delete queryObj[el])
    let query = User.find(queryObj)

    // Sorting
    if (req.query.sort) {
      query = query.sort(req.query.sort)
    }

    const docs = await query.populate({
      // Get author's createdRecipes
      path: 'createdRecipes',
      select: '_id mealName image createdAt dishType level rating'
    })
    const response = {
      users: docs.map((doc) => {
        return {
          username: doc.username,
          userId: doc._id,
          isAdmin: doc.isAdmin,
          isDisabled: doc.isDisabled,
          createdAt: doc.createdAt,
          favorites: doc.favorites,
          createdRecipes: doc.createdRecipes,
          user_image: returnUserImage(doc)
        }
      })
    }
    //const docsCount = await query.countDocuments()
    res.status(200).json({ response, usersCount: docs.length })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      error,
      message: error.message
    })
  }
}

exports.getSingleUser = async (req, res, next) => {
  try {
    const id = req.params.userId
    if (!req.userData.isAdmin && req.userData.userId !== id) {
      return res.status(403).json({
        message: `Unauthorized - access denied!`
      })
    }
    const doc = await User.findById(id)
      .populate({
        path: 'createdRecipes'
      })
      .populate({
        path: 'favorites'
      })
    if (doc) res.status(200).json(doc)
    else
      res.status(404).json({
        message: 'no result for reqested user'
      })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      error,
      message: error.message
    })
  }
}

exports.updateUserImage = async (req, res, next) => {
  try {
    const id = req.params.userId
    if (req.userData.userId !== id) {
      return res.status(403).json({
        message: `Unauthorized - access denied!`
      })
    }

    const user = await User.findById(id)
    let imageresult = ''
    if (!user.user_image) {
      imageresult = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: 'users'
        },
        (error, result) => {
          console.log(result, error)
        }
      )
    } else {
      await cloudinary.uploader.destroy(
        user.user_image.id,
        (error, result) => {
          console.log(result, error)
        }
      )
      imageresult = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: 'users'
        },
        (error, result) => {
          console.log(result, error)
        }
      )
    }
    const result = await User.findByIdAndUpdate(
      {
        _id: id
      },
      {
        $set: {
          user_image: {
            url: imageresult.secure_url,
            id: imageresult.public_id
          }
        }
      },
      { new: true }
    )
    res.status(200).json({
      message: 'Updated successfully',
      updatedUser: {
        username: result.username,
        userId: result._id,
        isAdmin: result.isAdmin,
        isDisabled: result.isDisabled,
        createdAt: result.createdAt,
        createdRecipes: result.createdRecipes,
        favorites: result.favorites,
        user_image: result.user_image.url
      }
    })
  } catch (error) {
    res.status(500).json({
      error,
      message: error.message
    })
  }
}

exports.addToFavorites = async (req, res, next) => {
  try {
    const id = req.params.userId
    if (req.userData.userId !== id) {
      return res.status(403).json({
        message: `Unauthorized - access denied!`
      })
    }
    const addFavorite = await Recipe.findById(req.body.favoriteId)
    if (!addFavorite) {
      return res.status(404).json({
        message: 'Recipe not found'
      })
    }
    // restriction - if recipe already added to favorites
    const findUser = await User.findById(id)
    let findRecipeId = findUser.favorites.find(
      (fav) => fav == req.body.favoriteId
    )
    if (findRecipeId) {
      return res.status(406).json({
        message: `Already saved in your favorites!`
      })
    }

    const result = await User.findByIdAndUpdate(
      {
        _id: id
      },
      {
        $push: {
          favorites: req.body.favoriteId
        }
      },
      { new: true }
    )
    res.status(200).json({
      message: 'Added to your saved recipes',
      updatedUser: {
        username: result.username,
        userId: result._id,
        isAdmin: result.isAdmin,
        isDisabled: result.isDisabled,
        createdAt: result.createdAt,
        createdRecipes: result.createdRecipes,
        favorites: result.favorites,
        user_image: returnUserImage(result)
      }
    })
    //console.log(res.updatedUser)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      error,
      message: error.message
    })
  }
}

exports.removeFromFavorites = async (req, res, next) => {
  try {
    const id = req.params.userId
    if (req.userData.userId !== id) {
      return res.status(403).json({
        message: `Unauthorized - access denied!`
      })
    }
    // restriction - check if recipe is in favorites array
    const findUser = await User.findById(id)
    let findRecipeId = findUser.favorites.find(
      (fav) => fav == req.body.favoriteId
    )
    if (!findRecipeId) {
      return res.status(406).json({
        message: `Recipe is not saved in favorites!`
      })
    }
    // remove from saved recipes
    const result = await User.findByIdAndUpdate(
      {
        _id: id
      },
      {
        $pull: {
          favorites: req.body.favoriteId
        }
      },
      { new: true }
    )
    res.status(200).json({
      message: 'Removed from saved recipes',
      updatedUser: {
        username: result.username,
        userId: result._id,
        isAdmin: result.isAdmin,
        isDisabled: result.isDisabled,
        createdAt: result.createdAt,
        createdRecipes: result.createdRecipes,
        favorites: result.favorites,
        user_image: returnUserImage(result)
      }
    })
    //console.log(res.updatedUser)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      error,
      message: error.message
    })
  }
}

exports.changeAdminStatus = async (req, res, next) => {
  try {
    const id = req.params.userId
    if (!req.userData.isAdmin) {
      return res.status(403).json({
        message: `Unauthorized - access denied!`
      })
    }
    const result = await User.findByIdAndUpdate(
      {
        _id: id
      },
      {
        $set: {
          isAdmin: req.body.adminStatus
        }
      },
      { new: true }
    )
    res.status(200).json({
      message: `User admin status is changed to ${result.isAdmin}`
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      error,
      message: error.message
    })
  }
}

exports.changeDisableStatus = async (req, res, next) => {
  try {
    const id = req.params.userId
    if (!req.userData.isAdmin) {
      return res.status(403).json({
        message: `Unauthorized - access denied!`
      })
    }
    const result = await User.findByIdAndUpdate(
      {
        _id: id
      },
      {
        $set: {
          isDisabled: req.body.disableStatus
        }
      },
      { new: true }
    )
    res.status(200).json({
      message: `User status is changed to isDisabled: ${result.isDisabled}`
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      error,
      message: error.message
    })
  }
}
