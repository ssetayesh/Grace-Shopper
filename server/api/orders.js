const router = require('express').Router()
const {Orders, Item, orderItems} = require('../db/models')
// const orderItems = require('../db/models/orderItems')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Orders.findAll({
      include: [{model: Item}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const order = await Orders.findByPk(id)
    if (!order) {
      res.status(404).send('Order not found!')
    }
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.get('/user/:userId/cart', async (req, res, next) => {
  try {
    const cart = await Orders.findAll({
      where: {
        userId: req.params.userId,
        status: false
      },
      include: [{model: Item}]
    })
    if (!cart) res.status(404).send('Cart not found')
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

router.put('/user/:userId/cart', async (req, res, next) => {
  try {
    const cart = await Orders.update(
      {
        status: true
        // totalPrice: req.body.totalPrice
      },
      {
        where: {
          userId: req.params.userId,
          status: false
        }
      }
    )

    console.log('new cart', cart)
    if (!cart) res.status(404).send('Cart not found')
    res.json(cart)
  } catch (error) {
    next(error)
  }
})
