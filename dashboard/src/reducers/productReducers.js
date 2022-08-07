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

export const getProductsReducer = (
  state = { loading: false, products: {} },
  action
) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return { loading: true }
    case GET_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload }
    case GET_PRODUCTS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const addProductReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
      return { loading: true }
    case ADD_PRODUCT_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case ADD_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const updateProductReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return { loading: true }
    case UPDATE_PRODUCT_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case UPDATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getSingleProductReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT_REQUEST:
      return { loading: true }
    case GET_SINGLE_PRODUCT_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case GET_SINGLE_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
