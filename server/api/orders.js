const router = require('express').Router()
const {Orders, Item, orderItems} = require('../db/models')
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
    const allQuans = await orderItems.findAll({
      where: {
        orderId: req.body.orderId
      }
    })

    let totalQuan = 0
    for (let i = 0; i < allQuans.length; i++) {
      totalQuan += allQuans[i].quantityAtSale
    }

    const cart = await Orders.update(
      {
        status: true,
        totalPrice: req.body.totalPrice,
        totalQuantity: totalQuan
      },
      {
        where: {
          userId: req.params.userId,
          status: false
        }
      }
    )
    if (!cart) res.status(404).send('Cart not found')
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

router.post('/user/guest/cart', async (req, res, next) => {
  try {
    let totalQuan = 0
    for (let i = 0; i < req.session.wands.length; i++) {
      totalQuan += req.session.wands[i].quantity
    }
    const newOrder = await Orders.create({
      status: true,
      userId: null,
      totalPrice: req.body.totalPrice,
      totalQuantity: totalQuan
    })
    req.session.wands = []
    res.json(newOrder)
  } catch (error) {
    next(error)
  }
})
