import axios from 'axios'
import history from '../history'
import {session} from 'redux-react-session'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
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

const addToCart = (itemId, price, quantity, item) => ({
  type: ADD_TO_CART,
  itemId,
  price,
  quantity,
  item
})

const removeFromCart = itemId => ({
  type: REMOVE_FROM_CART,
  itemId
})

const changeQuantity = (itemId, newPrice, quantity) => ({
  type: CHANGE_QUANTITY,
  itemId,
  newPrice,
  quantity
})

// const totalPrice = totalPrice => ({
//   type: TOTAL_PRICE_IN_CART,
//   totalPrice
// })

const checkout = (orderId, totalPrice) => ({
  type: CHECKOUT,
  orderId,
  totalPrice
})
/**
 * THUNK CREATORS
 */

export const gotCart = userId => {
  return async dispatch => {
    try {
      if (userId) {
        console.log('hello!')
        const res = await axios.get(`/api/orders/user/${userId}/cart`)
        console.log('res.data if user has id', res.data[0].items)
        dispatch(getCart(res.data[0].items))
      } else {
        console.log(' not hello!')
        const res = await axios.get('/api/orderItems/')
        console.log('res for guest in thunk', res)
        dispatch(getCart(res.data))
      }
    } catch (error) {
      console.log('Error!', error)
    }
  }
}

export const addedToCart = (itemId, price, quantity) => {
  return async dispatch => {
    try {
      const orderToCart = {
        itemId: itemId,
        priceAtSale: price,
        quantityAtSale: quantity
      }
      console.log('orderToCart', orderToCart)
      const {data} = await axios.post('/api/orderItems/', orderToCart)
      console.log('jere')
      dispatch(addToCart(itemId, price, quantity, data))
    } catch (error) {
      console.log('Error!', error)
    }
  }
}

export const removedFromCart = (itemId, orderId) => {
  return async dispatch => {
    console.log('HERE', orderId)
    try {
      await axios.delete(`/api/orderItems/${itemId}`, orderId)
      dispatch(removeFromCart(itemId))
    } catch (error) {
      console.log('Error!', error)
    }
  }
}

// export const changedQuantity = (item, newQuantity) => {
//   return async dispatch => {
//     try {
//       const newPrice = item.price * newQuantity
//       const {res} = await axios.put(`/api/orderItems/${item.id}`, {
//         quantityAtSale: newQuantity,
//         priceAtSale: newPrice
//       })
//       dispatch(changeQuantity(res))
//     } catch (error) {
//       console.log('Error!', error)
//     }
//   }
// }

export const changedQuantity = (itemId, newPrice, quantity, orderId) => {
  return async dispatch => {
    console.log('in changed quantity thunk - itemId', newPrice, quantity)
    try {
      const newInfo = {
        itemId: itemId,
        quantityAtSale: quantity,
        priceAtSale: newPrice,
        orderId: orderId
      }
      await axios.put(`/api/orderItems/`, newInfo)
      console.log('data in changedQuantity')
      dispatch(changeQuantity(itemId, newPrice, quantity))
    } catch (error) {
      console.error(error)
    }
  }
}

export const checkoutCart = (orderId, totalPrice, totalQuantity) => {
  return async dispatch => {
    try {
      const completedOrder = {
        orderId: orderId,
        totalPrice: totalPrice
      }

      if (orderId !== null) {
        const order = await axios.get(`/api/orders/${orderId}`)
        await axios.put(
          `/api/orders/user/${order.data.userId}/cart`,
          completedOrder
        )
      } else {
        const {data} = await axios.post(
          `/api/orders/user/guest/cart`,
          completedOrder
        )
        console.log('After post request', data)
        orderId = data.id
      }
      console.log('new orderid', orderId)
      dispatch(checkout(orderId, totalPrice, totalQuantity))
    } catch (error) {
      console.log('Error!', error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      console.log('state in get action', state)
      return action.items
    case ADD_TO_CART:
      return [...state, action.item]
    case REMOVE_FROM_CART:
      return [...state].filter(item => item.id !== action.itemId)
    case CHANGE_QUANTITY:
      console.log('state in changed quantity', state)
      return [...state].map(item => {
        if (item.id === action.itemId) {
          item.price = action.newPrice
          return item
        } else return item
      })
    case CHECKOUT:
      console.log('checkout reducer')
    case CLEAR_CART:
      return initialState
    default:
      return state
  }
}
