import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const getCart = items => ({type: GET_CART, items})
const addToCart = item => ({type: ADD_TO_CART, item})
const removeFromCart = itemId => ({type: REMOVE_FROM_CART, itemId})
/**
 * THUNK CREATORS
 */

export const gotCart = userId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/${userId}/cart`)
      dispatch(getCart(res.data))
    } catch (error) {
      next(err)
    }
  }
}

export const addedToCart = itemId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/${itemId}`)
      //await axios.post(`/api/${userId}/cart`)

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
    default:
      return state
  }
}
