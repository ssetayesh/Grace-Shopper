const Promise = require('bluebird')
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

const db = require('../server/db/db')
const {User, Product, Order} = require('../server/db/models')

describe('The User Model', () => {
  before(() => {
    return db.sync({force: true})
  })

  let user
  beforeEach(() => {
    user = User.build({
      email: 'helloworld@email.com',
      password: 'password',
      address: '123 Sesame Street'
    })
  })

  it('user attributes', async () => {
    const savedUser = await user.save()
    expect(savedUser.email).to.equal('')
  })
})
