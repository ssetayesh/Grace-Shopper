import axios from 'axios'
import history from '../history'
import {session} from 'redux-react-session'

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

export const addedToCart = (itemId, price) => {
  return async dispatch => {
    try {
      console.log('jere')
      const orderToCart = {
        itemId: itemId,
        priceAtSale: price
      }
      const {data} = await axios.post('/api/orderItems/', orderToCart)
      dispatch(addToCart(data.itemId, data.priceAtSale))
    } catch (error) {
      console.log('Error!', error)
    }
  }
}

export const removedFromCart = itemId => {
  return async dispatch => {
    try {
      dispatch(removeFromCart(itemId))
    } catch (error) {
      console.log('Error!', error)
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

export const changedQuantity = (item, newQuantity) => {
  return async dispatch => {
    try {
      const newPrice = item.price * newQuantity
      const {res} = await axios.put(`/api/orderItems/${item.id}`, {
        quantityAtSale: newQuantity,
        priceAtSale: newPrice
      })
      dispatch(changeQuantity(res))
    } catch (error) {
      next(error)
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
      console.log('state', state)
      return action.items
    case ADD_TO_CART:
      console.log('state', state)
      return [...state, action.item]
    case REMOVE_FROM_CART:
      return [...state].map(item => item.id !== action.itemId)
    // case CHANGE_QUANTITY:
    //   return state.map(item => {
    //     if (item.id !== action.item.id) return item
    //     else return action.item
    //   })
    case CLEAR_CART:
      return initialState
    default:
      return state
  }
}
