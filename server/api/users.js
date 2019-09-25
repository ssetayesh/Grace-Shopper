const router = require('express').Router()
const {User, Orders, orderItems} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await User.findOne({
      where: {
        id
      }
    })
    if (user && user.isLoggedIn(req.user.id)) {
      res.json(user)
    } else {
      res
        .status(404)
        .send("You are trying to access someone else's information")
    }
  } catch (err) {
    next(err)
  }
})
