import axios from 'axios'

import {
  GET_BRANDS_FAIL,
  GET_BRANDS_REQUEST,
  GET_BRANDS_SUCCESS,
} from '../constants'

export const getBrands = () => async (dispatch) => {
  try {
    dispatch({ type: GET_BRANDS_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get('/api/brands', config)

    dispatch({ type: GET_BRANDS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_BRANDS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
