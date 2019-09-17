const User = require('./user')
const Item = require('./item')
const Cart = require('./cart')

// ASSOCIATIONS
User.hasOne(Cart)
Item.hasMany(Cart)

module.exports = {
  User,
  Item,
  Cart
}
