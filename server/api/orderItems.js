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
        price: req.body.priceAtSale,
        quantity: req.body.quantityAtSale,
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
        quantityAtSale: req.body.quantityAtSale,
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

router.delete('/:itemId', async (req, res, next) => {
  try {
    console.log('here in delete', req.user)
    if (req.user !== undefined) {
      const deletedItem = await orderItems.destroy({
        where: {
          itemId: req.params.itemId
        }
      })
      res.json(deletedItem)
    } else {
      const newWands = req.session.wands.filter(wand => {
        return req.params.itemId !== wand.id
      })
      console.log('NEW WANDS', newWands)
      res.json(newWands)
    }
  } catch (error) {
    next(error)
  }
})

//edit quantity
router.put('/', async (req, res, next) => {
  try {
    console.log('editing quantity in put', req.body)
    if (req.body.orderId !== null) {
      const itemToEdit = await orderItems.findOne({
        where: {
          itemId: req.body.itemId,
          orderId: req.body.orderId
        }
      })
      await itemToEdit.update({
        quantityAtSale: +req.body.quantityAtSale,
        priceAtSale: +req.body.priceAtSale
      })
      console.log('after update', itemToEdit)
      res.json(itemToEdit)
    } else {
      console.log('order id is null in put')
      for (let i = 0; i < req.session.wands.length; i++) {
        if (req.session.wands[i].id === req.body.itemId) {
          req.session.wands[i].quantity = +req.body.quantityAtSale
          req.session.wands[i].price = +req.body.priceAtSale
        }
      }
      console.log('new wands', req.session.wands)
      res.json(req.session.wands)
    }
  } catch (error) {
    next(error)
  }
})
