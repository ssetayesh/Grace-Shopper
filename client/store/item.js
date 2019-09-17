import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_ITEMS = 'GET_ALL_ITEMS'

/**
 * INITIAL STATE
 */
const initialState = {
  allItems: [],
  currentItem: {}
}

/**
 * ACTION CREATORS
 */
const getItems = items => ({type: GET_ALL_ITEMS, items})

/**
 * THUNK CREATORS
 */
export const gotItems = () => async dispatch => {
  try {
    const res = await axios.get('/api/items')
    dispatch(getItems(res.data || initialState))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ITEMS:
      return {
        ...state,
        allItems: action.items
      }
    default:
      return state
  }
}
