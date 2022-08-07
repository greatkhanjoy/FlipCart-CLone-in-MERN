import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getBrands, getCategories, getSingleProduct } from '../../actions'
import Layout from '../../components/Layout'
import CategorySelect from '../../components/util/CategorySelect'
import Editor from '../../components/util/Editor'
import Loading from '../../components/util/Loading'
import SelectField from '../../components/util/SelectField'

const Update = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //States
  const { user } = useSelector((state) => state.login)
  const {
    categories,
    loading: categoryLoading,
    error: categoryError,
  } = useSelector((state) => state.categories)

  const {
    brands,
    loading: brandLoading,
    error: brandError,
  } = useSelector((state) => state.brands)

  const { product, loading, error } = useSelector(
    (state) => state.singleProduct
  )

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [salePrice, setSalePrice] = useState('')
  const [stock, setStock] = useState('')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [status, setStatus] = useState('')
  //   const [images, setImages] = useState([])
  const [offer, setOffer] = useState('')

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login')
    } else {
      if (!product || product._id !== id) {
        dispatch(getSingleProduct(id))

        if (!categories) {
          dispatch(getCategories())
        }

        if (!brands) {
          dispatch(getBrands())
        }
      } else {
        setName(product.name)
        setDescription(product.description)
        setPrice(product.price)
        setSalePrice(product.salePrice)
        setStock(product.stock)
        setCategory(product.category)
        setBrand(product.brand)
        setStatus(product.status)
        // setImages(product.images)
        setOffer(product.offer)
      }
    }
    // eslint-disable-next-line
  }, [user, id, product, dispatch, navigate])

  //Form handler
  const formHandler = (e) => {
    e.preventDefault()
  }

  return (
    <Layout>
      <div className="page-title text-[#333] flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold">Update Product</h1>
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <h3 className="text-center text-red-600 text-xl">{error}</h3>
      ) : (
        <>
          {product && product._id && (
            <form onSubmit={formHandler}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-3 space-y-6">
                  <div className="flex flex-col bg-white rounded-md p-4 space-y-8">
                    <div className="field-group space-y-1">
                      <label className="text-sm font-bold">Product Name</label>
                      <input
                        type="text"
                        value={name || ''}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Product name"
                        required
                        className="w-full border-gray-100 rounded-md"
                      />
                      <p className="text-sm">
                        A product name is required and recommended to be unique.
                      </p>
                    </div>
                    {/* Description field */}
                    <div className="field-group space-y-1">
                      <label className="text-sm font-bold">Description</label>
                      <Editor setValue={setDescription} value={description} />
                    </div>
                  </div>
                  <div className="flex flex-col bg-white rounded-md p-4 space-y-8">
                    <div className="flex justify-between space-x-3">
                      <div className="field-group space-y-1 w-full">
                        <label className="text-sm font-bold">Price</label>
                        <input
                          value={price || ''}
                          onChange={(e) => setPrice(e.target.value)}
                          type="number"
                          placeholder="Price"
                          required
                          className="w-full border-gray-100 rounded-md"
                        />
                        <p className="text-sm">Set the product price.</p>
                      </div>

                      <div className="field-group space-y-1 w-full">
                        <label className="text-sm font-bold">Sale Price</label>
                        <input
                          value={salePrice || ''}
                          onChange={(e) => setSalePrice(e.target.value)}
                          type="number"
                          placeholder="Sale price"
                          className="w-full border-gray-100 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between space-x-3">
                      <div className="field-group space-y-1 w-full">
                        <label className="text-sm font-bold">In stock</label>
                        <input
                          value={stock || ''}
                          onChange={(e) => setStock(e.target.value)}
                          type="number"
                          placeholder="Stock"
                          required
                          className="w-full border-gray-100 rounded-md"
                        />
                        <p className="text-sm">set inventory.</p>
                      </div>

                      <div className="field-group space-y-1 w-full">
                        <label className="text-sm font-bold">Discount</label>
                        <input
                          value={offer || ''}
                          onChange={(e) => setOffer(e.target.value)}
                          type="number"
                          placeholder="Discount"
                          className="w-full border-gray-100 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col bg-white rounded-md p-4 space-y-8">
                    <div className="field-group space-y-1">
                      <label className="text-sm font-bold">Images</label>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 space-y-6">
                  <div className="bg-white rounded-md p-4 space-y-1">
                    <label className="text-sm font-bold">Status</label>
                    <select
                      className="w-full border-gray-100 rounded-md"
                      required
                      onChange={(e) => setStatus(e.target.value)}
                      value={status || ''}
                    >
                      <option value="DEFAULT" disabled>
                        Select Status
                      </option>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                    <p className="text-sm">set the product status.</p>
                  </div>
                  <div className="bg-white rounded-md p-4 space-y-1">
                    <label className="text-sm font-bold">Category *</label>
                    {categoryLoading ? (
                      <select>
                        <option disabled>Loading...</option>
                      </select>
                    ) : categoryError ? (
                      <h3>{categoryError}</h3>
                    ) : (
                      <CategorySelect
                        loading={categoryLoading}
                        categories={categories}
                        value={category !== null ? category : 'DEFAULT'}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    )}

                    <p className="text-sm">set the select category.</p>
                    <button className="rounded-md bg-purple-50 text-purple-500 px-6 py-2 mt-3">
                      Create new category +
                    </button>
                  </div>
                  <div className="bg-white rounded-md p-4 space-y-1">
                    <label className="text-sm font-bold">Brand *</label>
                    {brandLoading ? (
                      <select>
                        <option disabled>Loading...</option>
                      </select>
                    ) : brandError ? (
                      <h3>{brandError}</h3>
                    ) : (
                      <SelectField
                        items={brands}
                        onChange={(e) => setBrand(e.target.value)}
                        loading={brandLoading}
                        value={brand !== null ? brand : 'DEFAULT'}
                      />
                    )}

                    <p className="text-sm">set the select brand.</p>
                    <button className="rounded-md bg-purple-50 text-purple-500 px-6 py-2 mt-3">
                      Create new brand +
                    </button>
                  </div>
                  <div className="bg-white rounded-md p-4 space-y-1">
                    <button
                      disabled={loading}
                      type="submit"
                      className="w-full px-6 py-2 rounded-md text-lg bg-blue-400 text-white"
                    >
                      {loading ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </>
      )}
    </Layout>
  )
}

export default Update
