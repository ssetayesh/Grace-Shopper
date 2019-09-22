const {expect} = require('chai')

const db = require('../server/db/db')
const {Orders} = require('../server/db/models')

describe('Order Model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  let order
  beforeEach(async () => {
    order = await Orders.create({
      totalQuantity: 4,
      totalPrice: 100.0,
      status: false
    })
  })

  describe('order attributes', async () => {
    it('has Total Quantity attribute', () => {
      expect(order.totalQuantity).to.equal(4)
    })

    it('has a Status attribute', () => {
      expect(order.status).to.equal(false)
    })
  })
})
