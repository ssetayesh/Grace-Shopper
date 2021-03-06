const router = require('express').Router()
const User = require('../db/models/user')
const db = require('../db')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
      const order = await db.models.orders.findOne({
        where: {
          userId: user.id,
          status: false
        }
      })

      if (order) {
        req.session.orderId = order.id
        req.session.save()
        console.log('req.session after login', req.session)
      } else {
        const newOrder = await db.models.orders.create({
          userId: user.id,
          status: false
        })
        req.session.orderId = newOrder.id
        req.session.save()
        console.log('req.session after login, new order', req.session)
      }
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
    const newOrder = await db.models.orders.create({
      userId: user.id,
      status: false
    })
    req.session.orderId = newOrder.id
    req.session.save()
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  req.session.wands = []
  console.log('req.session', req.session)
  res.json(req.user)
})

router.use('/google', require('./google'))
