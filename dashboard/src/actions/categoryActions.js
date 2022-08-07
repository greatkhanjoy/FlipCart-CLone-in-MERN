import axios from 'axios'
import {
  GET_CATEGORIES_FAIL,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
} from '../constants'

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORIES_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get('/api/categories', config)

    dispatch({ type: GET_CATEGORIES_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_CATEGORIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
