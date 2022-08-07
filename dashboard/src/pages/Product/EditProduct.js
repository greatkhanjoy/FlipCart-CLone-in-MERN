import { Dropzone, FileItem } from '@dropzone-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getBrands, getCategories, getSingleProduct } from '../../actions'
import Layout from '../../components/Layout'
import CategorySelect from '../../components/util/CategorySelect'
import Editor from '../../components/util/Editor'
import SelectField from '../../components/util/SelectField'

const EditProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  //States
  const { loggedin, user } = useSelector((state) => state.login)

  const { product, error, loading } = useSelector(
    (state) => state.singleProduct
  )

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

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [stock, setStock] = useState('')
  const [status, setStatus] = useState('')
  const [price, setPrice] = useState('')
  const [salePrice, setSalePrice] = useState('')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [images, setImages] = useState([])

  //Dropzone
  const updateFiles = (incommingFiles) => {
    setImages(incommingFiles)
  }

  useEffect(() => {
    if (loggedin && user.role === 'admin') {
    } else {
      navigate('/login')
    }

    if (!product) {
      dispatch(getSingleProduct(id))
    } else {
      if (!categories) {
        dispatch(getCategories())
      }
      if (!brands) {
        dispatch(getBrands())
      }
      setName(product.name)
      setDescription(product.description)
      setStock(product.stock)
      setStatus(product.status)
      setPrice(product.price)
      setCategory(product.category)
      setBrand(product.brand)
      setImages(product.images)
    }

    if (error || categoryError || brandError) {
      toast.error(error ? error : categoryError ? categoryError : brandError)
    }
  }, [
    id,
    loggedin,
    navigate,
    user,
    dispatch,
    brandError,
    categoryError,
    error,
    product,
    categories,
    brands,
  ])

  //image delete handler
  const handleDelete = (id) => {
    setImages(images.filter((item) => item.id !== id))
  }

  return (
    <Layout>
      <div className="page-title text-[#333] flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold">Add new Product</h1>
      </div>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="col-span-3 space-y-6">
              <div className="flex flex-col bg-white rounded-md p-4 space-y-8">
                <div className="field-group space-y-1">
                  <label className="text-sm font-bold">Product Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product name"
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
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      type="number"
                      placeholder="Price"
                      className="w-full border-gray-100 rounded-md"
                    />
                    <p className="text-sm">Set the product price.</p>
                  </div>

                  <div className="field-group space-y-1 w-full">
                    <label className="text-sm font-bold">Sale Price</label>
                    <input
                      value={salePrice}
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
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      type="number"
                      placeholder="Stock"
                      className="w-full border-gray-100 rounded-md"
                    />
                    <p className="text-sm">set inventory.</p>
                  </div>

                  <div className="field-group space-y-1 w-full">
                    <label className="text-sm font-bold">Discount</label>
                    <input
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
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
                  <Dropzone
                    onChange={updateFiles}
                    value={images}
                    accept="image/*"
                    label="Drag and drop or click to upload"
                    maxFileSize={1000000}
                  >
                    {images.map((image) => (
                      <FileItem
                        {...image}
                        preview
                        key={image.id || image._id}
                        onDelete={handleDelete}
                      />
                    ))}
                  </Dropzone>
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
                  defaultValue={status ? status : 'DEFAULT'}
                >
                  <option disabled value="DEFAULT">
                    Select Status
                  </option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
                <p className="text-sm">set the product status.</p>
              </div>
              <div className="bg-white rounded-md p-4 space-y-1">
                <label className="text-sm font-bold">Category *</label>
                <CategorySelect
                  loading={categoryLoading}
                  categories={categories}
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                />
                <p className="text-sm">set the select category.</p>
                <button className="rounded-md bg-purple-50 text-purple-500 px-6 py-2 mt-3">
                  Create new category +
                </button>
              </div>
              <div className="bg-white rounded-md p-4 space-y-1">
                <label className="text-sm font-bold">Brand *</label>

                <SelectField
                  items={brands}
                  onChange={(e) => setBrand(e.target.value)}
                  loading={brandLoading}
                  value={brand}
                />
                <p className="text-sm">set the select brand.</p>
                <button className="rounded-md bg-purple-50 text-purple-500 px-6 py-2 mt-3">
                  Create new brand +
                </button>
              </div>
              <div className="bg-white rounded-md p-4 space-y-1">
                <button className="w-full px-6 py-2 rounded-md text-lg bg-blue-400 text-white">
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  )
}

export default EditProduct
