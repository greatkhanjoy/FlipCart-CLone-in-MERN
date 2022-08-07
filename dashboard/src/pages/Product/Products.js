import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { getProducts } from '../../actions/productActions'
import Layout from '../../components/Layout'
import ProductGrid from '../../components/util/ProductGrid'

const Products = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loggedin, user } = useSelector((state) => state.login)

  const { loading, products, error } = useSelector((state) => state.products)

  useEffect(() => {
    if (loggedin && user.role === 'admin') {
      dispatch(getProducts())
    } else {
      navigate('/login')
    }
    if (error) {
      console.log(error)
    }
  }, [loggedin, navigate, dispatch, error, user.role])

  return (
    <Layout>
      <div className="page-title text-[#333] flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          to={'/products/new'}
          className="bg-green-600 text-white px-6 py-2"
        >
          Add new
        </Link>
      </div>
      <div className="filter flex justify-end items-center space-x-3 mb-2">
        <div className="filter-item">
          <label className="text-sm font-bold">Search product</label>
          <input type="text" placeholder="search..." className="w-full" />
        </div>
        <div className="filter-item">
          <label className="text-sm font-bold">Filter by</label>
          <select className="w-full">
            <option value="">All</option>
            <option value="">Category</option>
            <option value="">Brand</option>
          </select>
        </div>
        <div className="filter-item">
          <label className="text-sm font-bold">Category</label>
          <select className="w-full">
            <option value="">All</option>
            <option value="">Category</option>
            <option value="">Category 2</option>
          </select>
        </div>
        <div className="filter-item">
          <label className="text-sm font-bold">Brand</label>
          <select className="w-full">
            <option value="">All</option>
            <option value="">Brand</option>
            <option value="">Brand 2</option>
          </select>
        </div>
      </div>
      {loading ? <div>Loading...</div> : <ProductGrid products={products} />}
    </Layout>
  )
}

export default Products
