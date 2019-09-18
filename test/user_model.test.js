const {expect} = require('chai')

const db = require('../server/db/db')
const {User} = require('../server/db/models')

describe('User Model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  let user
  beforeEach(async () => {
    user = await User.create({
      email: 'helloworld@email.com',
      password: 'password',
      address: '123 Sesame Street'
    })
  })

  describe('user attributes', async () => {
    it('has email attribute', () => {
      expect(user.email).to.equal('helloworld@email.com')
    })

    it('has hidden password attribute', () => {
      expect(typeof user.password).to.equal('function')
    })

    it('requires `email`', async () => {
      user.email = null
      let emailIsNull, error

      try {
        emailIsNull = await user.validate()
      } catch (err) {
        error = err
      }
      if (emailIsNull) throw Error('validation should fail if email is null')

      expect(error).to.be.an.instanceOf(Error)
    })
  })
  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      it('returns true if the password is correct', () => {
        expect(user.correctPassword('password')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(user.correctPassword('pusword')).to.be.equal(false)
      })
    })
  })
})
