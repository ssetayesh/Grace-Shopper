const User = require('./user')
const Item = require('./item')
const Orders = require('./orders')
const orderItems = require('./orderItems')

// ASSOCIATIONS
User.hasOne(Orders)
Item.belongsToMany(Orders, {through: 'orderItems', foreignKey: 'itemId'})
Orders.belongsToMany(Item, {through: 'orderItems', foreignKey: 'orderId'})

module.exports = {
  User,
  Item,
  Orders,
  orderItems
}
