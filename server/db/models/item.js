const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING
  },
  img: {
    type: Sequelize.STRING,
    defaultValue: 'https://image.flaticon.com/icons/svg/8/8109.svg'
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.FLOAT
  },
  category: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Item
