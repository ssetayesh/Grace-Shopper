const router = require('express').Router()
const {Item} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll()
    res.json(items)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const item = await Item.findByPk(id)
    if (!item) {
      res.status(404).send('Item not found!')
    }
    res.json(item)
  } catch (err) {
    next(err)
  }
})
