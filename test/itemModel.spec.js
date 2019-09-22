const {expect} = require('chai')

const db = require('../server/db/db')
const {Item} = require('../server/db/models')

describe('Item Model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  let item
  beforeEach(async () => {
    item = await Item.create({
      name: 'Cool Wand',
      description:
        'An amazing Wand! The best Wand in the world! The most epic Wand! With this Wand you can do amazing things! I really want to buy this wand! its a high quality wand and its one of a kind!',
      img:
        'https://alivans.com/wp-content/uploads/2016/02/APPRENTICE_THUMB.jpg',
      price: 50.0
    })
  })

  describe('Item attributes', async () => {
    it('has name attribute', () => {
      expect(item.name).to.equal('Cool Wand')
    })

    it('can handle a long description', () => {
      expect(item.description).to.equal(
        'An amazing Wand! The best Wand in the world! The most epic Wand! With this Wand you can do amazing things! I really want to buy this wand! its a high quality wand and its one of a kind!'
      )
    })
    it('has an image attribute', () => {
      expect(item.img).to.equal(
        'https://alivans.com/wp-content/uploads/2016/02/APPRENTICE_THUMB.jpg'
      )
    })
  })
})
