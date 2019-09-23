const {expect} = require('chai')

const db = require('../server/db/db')
const orderItems = require('../server/db/models/orderItems')

describe('Order Items Model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  let order_items
  beforeEach(async () => {
    order_items = await orderItems.create({
      orderId: 1,
      itemId: 1,
      priceAtSale: 20
    })
  })

  describe('order attributes', async () => {
    xit('has Price at Sale attribute', () => {
      expect(order_items.priceAtSale).to.equal(20)
    })
  })
})
