import axios from 'axios'
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from '../constants/authConstatnts'

export const login = (loginData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post('/api/auth/login', loginData, config)

    dispatch({ type: LOGIN_SUCCESS, payload: data })
    localStorage.setItem('login', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const register = (registerData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/auth/register',
      registerData,
      config
    )

    dispatch({ type: REGISTER_SUCCESS, payload: data })
    dispatch({ type: LOGIN_SUCCESS, payload: data })
    localStorage.setItem('login', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('login')
  dispatch({ type: LOGOUT })
}
