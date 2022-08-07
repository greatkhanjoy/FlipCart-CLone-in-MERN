import axios from 'axios'
import {
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCT_FAIL,
  GET_SINGLE_PRODUCT_REQUEST,
  GET_SINGLE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from '../constants'

//@desc Get all products
//@route GET /api/products

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTS_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get('/api/products', config)

    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//@desc Add product
//@route POST /api/products
//@access Private
export const addProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: ADD_PRODUCT_REQUEST })
    const token = JSON.parse(localStorage.getItem('login')).token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.post('/api/products', product, config)

    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//@desc   - Update product
//@route  - PUT /api/products/:id
//@access - Private
export const updateProduct = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST })
    const token = JSON.parse(localStorage.getItem('login')).token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.put(`/api/products/${id}`, formData, config)

    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//@desc   - Get Single Product
//@route  - GET /api/products/:id
//@access - Public
export const getSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_PRODUCT_REQUEST })
    // const token = JSON.parse(localStorage.getItem('login')).token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get(`/api/products/${id}`, config)

    dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_SINGLE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
