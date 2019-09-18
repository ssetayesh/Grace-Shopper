const router = require('express').Router()
const {Orders, Item} = require('../db/models')
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
