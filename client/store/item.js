import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_ITEMS = 'GET_ALL_ITEMS'

/**
 * INITIAL STATE
 */
// const initialState = {
//   allItems: []
//   // currentItem: {}
// }

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
  console.log('flag 1')
  try {
    const res = await axios.get('/api/items')
    console.log('res.data', res.data)
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
