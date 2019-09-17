const User = require('./user')
const Item = require('./item')
const Cart = require('./cart')

User.hasOne(Cart)

Cart.belongTo(Item)

// Item.hasMany(Cart)

module.exports = {
  User,
  Item,
  Cart
}
