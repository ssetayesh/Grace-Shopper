'use strict'

const db = require('../server/db')
const {User, Item, Orders, orderItems} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({
      email: 'janedoe@email.com',
      password: 'random',
      address: '24 Hello Street'
    })
  ])

  const items = await Promise.all([
    Item.create({
      name: 'Almond',
      description:
        'Sweet and natural. It is used for self-protection. Its aspects are fruitfulness and virginity',
      img:
        'https://i.pinimg.com/originals/b1/1f/78/b11f782fade08e0c91ff715d8f28b6f8.jpg',
      quantity: 10,
      price: 30.0
    }),
    Item.create({
      name: 'Ash',
      description:
        "Sacred to Poseidon and Woden, and called the 'father of trees'. Guardian spirits reside inside it and help absorb sickness. It's also associated with water and sea power. Aspects include seapower, karmic laws, magical potency, healing, and protection from drowning.",
      img: 'https://alivans.com/wp-content/uploads/2016/02/ASH_THUMB-2.jpg',
      quantity: 10,
      price: 31.0
    }),
    Item.create({
      name: 'Bloodwood',
      description:
        'Useful in divination, Bloodwood is said to reveal secrets of both the past and future and to aid its possessor in understanding the given knowledge. Well known for its brilliant red color it is also perfect for matters of the heart and healing.',
      img: 'https://alivans.com/wp-content/uploads/2017/09/BLOODWOOD_ZOOM.jpg',
      quantity: 10,
      price: 35.0
    }),
    Item.create({
      name: 'Beech',
      description:
        'Once used to make writing tablets for runes. Associated with spells of information, especially seeking old wisdom; invocation of ancient guardians or Ancestors; research into old writings and the runes; magic of the Summer Solstice, culmination of desires; magic of victory.',
      img: 'https://alivans.com/wp-content/uploads/2016/02/PROFESSOR_THUMB.jpg',
      quantity: 10,
      price: 54.0
    }),
    Item.create({
      name: 'Cherry',
      description:
        'Associated with invocations and blessings of sacred fires, spells of finding, hunting, conflict, war, competition, passion, communion with animals, unification of groups or tribes, and the amplification of magical will.',
      img:
        'https://alivans.com/wp-content/uploads/2017/05/BLACKCHERRY_THUMB.jpg',
      quantity: 10,
      price: 44.0
    }),
    Item.create({
      name: 'Holly',
      description:
        "Means 'holy' and has several uses such as making dye and use as an aphrodisiac. Its aspects are holiness, consecration, material gain, physical revenge, and beauty.",
      img: 'https://alivans.com/wp-content/uploads/2016/02/HOLLY15_THUMB.jpg',
      quantity: 10,
      price: 38.0
    }),
    Item.create({
      name: 'Kingswood',
      description:
        'Mahogany is known to be excellent for transfiguration and makes a great tool for warding off the Dark Arts.',
      img:
        'https://alivans.com/wp-content/uploads/2016/02/TWISTEDMAHOGANY_ZOOM.jpg',
      quantity: 10,
      price: 82.0
    }),
    Item.create({
      name: 'Palm',
      description:
        'Thought to be durable and strong because it never changes its leaves. It is thought to help in rejuvenation, and its aspects are resurrection, and the cycle and matrix of life.',
      img: 'https://alivans.com/wp-content/uploads/2016/02/BLACKPALM_ZOOM.jpg(',
      quantity: 10,
      price: 70.0
    }),
    Item.create({
      name: 'Redwood',
      description:
        'Associated with drawing down power from Heaven to Earth, spells of religious seeking and discipline, spells of mystical union with nature and wild animals, hunting magic, the martial arts as spiritual discipline, and spells for innovation and sudden revelation.',
      img: 'https://alivans.com/wp-content/uploads/2016/02/REDWOOD_THUMB.jpg',
      quantity: 10,
      price: 65.0
    }),
    Item.create({
      name: 'Willow',
      description:
        "Sacred to the dark aspects of the triple moon goddess (Hecate, Circe, Hera, and Persephone). Associated with water and giving dew and moisture, as well as the moon's female aspect. It is called the 'tree of enchantment', and its aspects are moon magic, psychic energy, healing, inspiration, and fertility.",
      img: 'https://alivans.com/wp-content/uploads/2016/02/WILLOW_THUMV.jpg',
      quantity: 10,
      price: 50.0
    })
  ])

  const orders = await Promise.all([
    Orders.create({
      totalQuantity: 6,
      totalPrice: 60,
      status: false
    }),
    Orders.create({
      totalQuantity: 2,
      totalPrice: 49,
      status: true
    })
  ])

  const order_Items = await Promise.all([
    orderItems.create({
      orderId: 2,
      itemId: 1,
      quanitityAtSale: 2,
      priceAtSale: 10
    }),
    orderItems.create({
      orderId: 1,
      itemId: 2,
      quanitityAtSale: 2,
      priceAtSale: 10
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
