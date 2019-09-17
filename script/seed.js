'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Item} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const items = await Promise.all([
    Item.create({
      name: 'cabinet',
      quantity: 10,
      price: 59.99,
      category: ['kitchen', 'living room', 'bedroom']
    }),
    Item.create({
      name: 'poster',
      quantity: 20,
      price: 999.99,
      category: ['kitchen', 'living room', 'bedroom']
    })
  ])

  console.log(`ed ${users.length} users`)
  console.log(`ed successfully`)
}

// We've separated the `` function from the `run` function.
// This way we can isolate the error handling and exit trapping.
// The `` function is concerned only with modifying the database.
async function runSeed() {
  console.log('ing...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `` function, IF we ran this module directly (`node `).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of ``.
if (module === require.main) {
  runSeed()
}

// we export the  function for testing purposes (see `./.spec.js`)
module.exports = seed
