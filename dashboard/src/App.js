import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import NewProduct from './pages/Product/NewProduct'
import Products from './pages/Product/Products'
import Update from './pages/Product/Update'
import Register from './pages/Register'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/new" element={<NewProduct />} />
          {/* <Route path="/products/:id" element={<EditProduct />} /> */}
          <Route path="/products/:id" element={<Update />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </div>
  )
}

export default App
