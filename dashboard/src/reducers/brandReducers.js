import {
  GET_BRANDS_FAIL,
  GET_BRANDS_REQUEST,
  GET_BRANDS_SUCCESS,
} from '../constants'

export const getBrandsReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case GET_BRANDS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_BRANDS_SUCCESS:
      return {
        ...state,
        loading: false,
        brands: action.payload,
      }
    case GET_BRANDS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
