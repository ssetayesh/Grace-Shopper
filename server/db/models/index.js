const User = require('./user')
const Item = require('./item')
const Orders = require('./orders')

// ASSOCIATIONS
User.hasOne(Orders)
Item.belongsToMany(Orders, {through: 'order_items', foreignKey: 'itemId'})
Orders.belongsToMany(Item, {through: 'order_items', foreignKey: 'orderId'})

module.exports = {
  User,
  Item,
  Orders
}
