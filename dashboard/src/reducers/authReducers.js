import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from '../constants/authConstatnts'

export const loginReducer = (state = { loggedin: false }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loading: true }
    case LOGIN_SUCCESS:
      return { loading: false, loggedin: true, user: action.payload }
    case LOGIN_FAIL:
      return { loading: false, loggedin: false, error: action.payload }
    case LOGOUT:
      return { loggedin: false, user: null }
    default:
      return state
  }
}

export const registerReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { loading: true }
    case REGISTER_SUCCESS:
      return { loading: false, success: true }
    case REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
