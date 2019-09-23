import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const TOTAL_PRICE_IN_CART = 'TOTAL_PRICE_IN_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'
const CLEAR_CART = 'CLEAR_CART'
const CHECKOUT = 'CHECKOUT'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const getCart = items => ({
  type: GET_CART,
  items
})

const addToCart = (itemId, price) => ({
  type: ADD_TO_CART,
  itemId,
  price
})

const removeFromCart = itemId => ({
  type: REMOVE_FROM_CART,
  itemId
})

const changeQuantity = item => ({
  type: CHANGE_QUANTITY,
  item
})

// const totalPrice = totalPrice => ({
//   type: TOTAL_PRICE_IN_CART,
//   totalPrice
// })

const checkout = orderId => ({
  type: CHECKOUT,
  orderId
})
/**
 * THUNK CREATORS
 */

export const gotCart = userId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/orders/user/${userId}/cart`)
      console.log('got cart data', res.data)
      dispatch(getCart(res.data))
    } catch (error) {
      next(err)
    }
  }
}

export const addedToCart = (itemId, price) => {
  return async dispatch => {
    try {
      const orderToCart = {
        itemId: itemId,
        priceAtSale: price
      }
      const {data} = await axios.post('/api/orderItems/', orderToCart)
      dispatch(addToCart(data.itemId, data.priceAtSale))
    } catch (error) {
      console.log(error)
    }
  }
}

export const removedFromCart = itemId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/orderItems/${itemId}`)
      dispatch(removeFromCart(itemId))
    } catch (error) {
      next(error)
    }
  }
}

// export const updateTotal = (newTotal) => {
//   return async dispatch => {
//     try {
//       // const {data} = await axios.get(`/api/orders/user/${userId}/cart`);
//       // const
//      } catch (error) {
//       console.log('Error: ', error)
//     }
//   }
// }

export const changedQuantity = (itemId, price, newQuantity) => {
  return async dispatch => {
    try {
      const updatedItem = {
        id: itemId,
        priceAtSale: price,
        quantityAtSale: newQuantity
      }
      const res = await axios.put(`/api/orderItems/${itemId}`, updatedItem)

      dispatch(changeQuantity(updatedItem))
    } catch (error) {
      console.error(error)
    }
  }
}

// export const totalPrice = (pr)

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.items
    case ADD_TO_CART:
      return [...state, action.item]
    case REMOVE_FROM_CART:
      return [...state].filter(item => item.id !== action.itemId)
    case CHANGE_QUANTITY:
      return [...state].map(item => {
        if (item.id === action.item.id) {
          item.quantityAtSale = action.item.quantityAtSale
          return item
        }
      })
    case CLEAR_CART:
      return initialState
    default:
      return state
  }
}
