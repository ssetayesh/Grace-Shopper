const router = require('express').Router()
module.exports = router

router.use(function(req, res, next) {
  if (req.user && req.user.admin === true) {
    console.log('in middleware', req.user)
    return next()
  }
  res.send('You do not have admninistrator rights to access the information')
})

router.use('/users', require('./users'))
router.use('/items', require('./items'))
router.use('/orders', require('./orders'))
router.use('/orderItems', require('./orderItems'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
