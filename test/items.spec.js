const {expect} = require('chai')
const request = require('supertest')

const app = require('../server/index')
const agent = request.agent(app)

const db = require('../server/db')
const Item = db.model('item')

describe('Item routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  xdescribe('/api/items/', () => {
    const dresserItem = 'dresser'

    beforeEach(() => {
      return Item.create({
        name: dresserItem
      })
    })

    it('GET /api/items', async () => {
      const res = await request(app)
        .get('/api/items')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(dresserItem)
    })
  }) // end describe('/api/items')

  xdescribe('GET /items/:id', () => {
    let coolItem

    beforeEach(async () => {
      const creatingItems = [
        {
          name: 'Very cool Item',
          price: 99
        },
        {
          name: 'Cool Item',
          price: 49
        },
        {
          name: 'Another Item',
          price: 39
        }
      ].map(data => Item.create(data))

      const createdItems = await Promise.all(creatingItems)
      coolItem = createdItems[1].dataValues
    })

    /**
     * This is a proper GET /items/ID request
     * where we search by the ID of the article created above
     */
    it('returns the JSON of the item based on the id', async () => {
      const res = await agent.get('/api/items/' + coolItem.id).expect(200)
      console.log(res.body)
      if (typeof res.body === 'string') {
        res.body = JSON.parse(res.body)
      }
      expect(res.body.name).to.equal('Cool Item')
    })

    /**
     * Here we pass in a bad ID to the URL, we should get a 404 error
     */
    it('returns a 404 error if the ID is not correct', () => {
      return agent.get('/api/items/76142896').expect(404)
    })
  })
}) // end describe('Item routes')
