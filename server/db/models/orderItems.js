const Sequelize = require('sequelize')
const db = require('../db')

const orderItems = db.define('orderItems', {
  quanitityAtSale: {
    type: Sequelize.INTEGER
  },
  priceAtSale: {
    type: Sequelize.DECIMAL(10, 2)
  }
})

module.exports = orderItems
