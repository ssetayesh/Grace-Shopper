import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_ITEMS = 'GET_ALL_ITEMS'

/**
 * ACTION CREATORS
 */
const getItems = items => {
  return {
    type: GET_ALL_ITEMS,
    items
  }
}

/**
 * THUNK CREATORS
 */
export const getItemsThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/items')
    dispatch(getItems(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(items = [], action) {
  switch (action.type) {
    case GET_ALL_ITEMS:
      return action.items
    default:
      return items
  }
}
