const router = require('express').Router()
const db = require('../db')
const {orderItems} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    //route for guest's items in cart (not checked out)
    console.log('session in get', req.session)
    const wandsInCart = req.session.wands
    console.log('req.session.wands in api', wandsInCart)
    res.json(wandsInCart)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log('hello in post')
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

      const wandToAdd = await db.models.item.findOne({
        where: {
          id: req.body.itemId
        }
      })
      res.json(wandToAdd)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const update = {
      quantityAtSale: req.body.quantity,
      priceAtSale: req.body.price
    }
    const updatedWand = await orderItems.update(update, {
      where: {id: req.body.id}
    })
    res.json(updatedWand)
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
