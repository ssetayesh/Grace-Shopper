const Sequelize = require('sequelize')
const db = require('../db')

const orderItems = db.define('orderItems', {
  quantityAtSale: {
    type: Sequelize.INTEGER
  },
  priceAtSale: {
    type: Sequelize.FLOAT(4, 2)
  }
})

module.exports = orderItems
