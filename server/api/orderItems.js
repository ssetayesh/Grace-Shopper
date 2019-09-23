const router = require('express').Router()
const db = require('../db')
const {User, Orders, orderItems} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const find = await orderItems.findAll()
    res.json(find)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const userId = req.session.passport.user

    const order = await db.models.orders.findOne({
      where: {
        userId: userId,
        status: false
      }
    })

    const createItemsInCart = await orderItems.create({
      itemId: req.body.itemId,
      priceAtSale: req.body.priceAtSale,
      orderId: order.id
    })

    res.json(createItemsInCart)
  } catch (error) {
    next(error)
  }
})

router.delete('/:itemId', async (req, res, next) => {
  try {
    const deletedItem = await orderItems.destroy({
      where: {
        itemId: req.params.itemId
      }
    })
    res.json(deletedItem)
  } catch (error) {
    next(error)
  }
})
