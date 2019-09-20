import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const getCart = items => ({type: GET_CART, items})
const addToCart = (itemId, price, quantity) => ({
  type: ADD_TO_CART,
  itemId,
  price,
  quantity
})
const removeFromCart = itemId => ({type: REMOVE_FROM_CART, itemId})
const changeQuantity = item => ({type: CHANGE_QUANTITY, item})
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

export const addedToCart = itemId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/items/${itemId}`)
      console.log('res.data in addtocart', res.data)
      await axios.post('/api/orderItems/', res.data)
      dispatch(addToCart(res.data))
    } catch (error) {
      next(error)
    }
  }
}

export const removedFromCart = itemId => {
  return async dispatch => {
    try {
      dispatch(removeFromCart(itemId))
    } catch (error) {
      next(error)
    }
  }
}

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
      return [...state].map(item => item.id !== action.itemId)
    case CHANGE_QUANTITY:
      return state.map(item => {
        if (item.id !== action.item.id) return item
        else return action.item
      })
    default:
      return state
  }
}
