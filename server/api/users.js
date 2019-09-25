const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

const hideAPI = () => (req, res) => {
  if (!req.user.admin) {
    return res.send(
      'Forbidden! You do not have access rights to API routes. Only Admin has access rights'
    )
  }
}

router.get('/', hideAPI(), async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', hideAPI(), async (req, res, next) => {
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
