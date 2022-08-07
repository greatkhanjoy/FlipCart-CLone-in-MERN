import {
  GET_CATEGORIES_FAIL,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
} from '../constants'

export const getCategoriesReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
        categories: action.payload,
      }
    case GET_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
