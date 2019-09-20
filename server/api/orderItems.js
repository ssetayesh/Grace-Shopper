const router = require('express').Router()
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
    console.log('req.body in post', req.body)
    const createItemsInCart = await orderItems.create()
    // const createItemsInCart = await orderItems.create({
    //   itemId: req.body.id,
    //   priceAtSale: req.body.price,
    //   quantityAtSale: 2,
    //   orderId: 3
    // })
    // orderItems.a
    res.json(createItemsInCart)
  } catch (error) {
    next(error)
  }
})

//edit items in cart
router.put('/:id', async (req, res, next) => {
  try {
    const find = await orderItems.findById(req.params.id)
    const updateFound = find.update(req.body)
    res.json(updateFound)
  } catch (error) {
    next(error)
  }
})

// router.delete('/:id', async (req, res, next) => {
//   try {
//     const find = await orderItems.findById(req.params.id)
//     const del = await orderItems.destroy(find)
//     res.json(del)
//   } catch (error) {
//     next(error)
//   }
// })
