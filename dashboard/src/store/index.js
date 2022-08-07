import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {
  addProductReducer,
  getBrandsReducer,
  getCategoriesReducer,
  getProductsReducer,
  getSingleProductReducer,
  loginReducer,
  registerReducer,
  updateProductReducer,
} from '../reducers'

const reducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  products: getProductsReducer,
  addProduct: addProductReducer,
  categories: getCategoriesReducer,
  brands: getBrandsReducer,
  singleProduct: getSingleProductReducer,
  updateProduct: updateProductReducer,
})

const loginUserFromStorage = localStorage.getItem('login')
  ? JSON.parse(localStorage.getItem('login'))
  : null

const initialState = {
  login: {
    loggedin: loginUserFromStorage ? true : false,
    user: loginUserFromStorage,
  },
}

const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
