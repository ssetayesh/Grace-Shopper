const router = require('express').Router()
const db = require('../db')
const {orderItems} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    //route for guest's items in cart (not checked out)
    const wandsInCart = req.session.wands
    console.log('req.session.wands in api', wandsInCart)
    res.json(wandsInCart)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (!req.user) {
      //store the information on the session
      const wandImg = await db.models.item.findOne({
        where: {
          id: req.body.itemId
        }
      })

      const wand = {
        id: wandImg.id,
        name: wandImg.name,
        // item: req.body.itemId,
        price: req.body.priceAtSale,
        img: wandImg.img
      }
      if (!req.session.wands) {
        req.session.wands = []
      }
      req.session.wands.push(wand)
      console.log('req.session after push', req.session.wands)
      req.session.save()
    } else {
      console.log('req.session in user post', req.session.orderId)
      // const orderId = req.session.orderId;
      const createItemsInCart = await orderItems.create({
        itemId: req.body.itemId,
        priceAtSale: req.body.priceAtSale,
        orderId: +req.session.orderId
      })

      res.json(createItemsInCart)
    }
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
