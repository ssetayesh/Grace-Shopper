import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SEE_CART = 'SEE_CART'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const seeCart = items => ({type: SEE_CART, items})

/**
 * THUNK CREATORS
 */

export const getCart = userId => {
  return async dispatch => {
    try {
      const res = axios.get(/api/`${userId}` / cart)
      dispatch(seeCart(res.data))
    } catch (error) {
      next(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SEE_CART:
      return [...state, action.items]
    default:
      return state
  }
}
