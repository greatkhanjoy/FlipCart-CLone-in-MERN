import { Dropzone, FileItem } from '@dropzone-ui/react'
import { useEffect, useState } from 'react'
import { useQuill } from 'react-quilljs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addProduct, getBrands, getCategories } from '../../actions'
import Layout from '../../components/Layout'
import CategorySelect from '../../components/util/CategorySelect'
import SelectField from '../../components/util/SelectField'

const NewProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //States
  const { loggedin, user } = useSelector((state) => state.login)
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

  const { loading, error, success } = useSelector((state) => state.addProduct)

  //Quil Editor
  const placeholder = 'Enter your product description here...'
  const { quill, quillRef } = useQuill({ placeholder })

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [salePrice, setSalePrice] = useState('')
  const [stock, setStock] = useState('')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [status, setStatus] = useState('')
  const [images, setImages] = useState([])

  const updateFiles = (incommingFiles) => {
    setImages(incommingFiles)
  }

  useEffect(() => {
    if (loggedin && user.role === 'admin') {
      dispatch(getCategories())
      dispatch(getBrands())

      if (categoryError || brandError || error) {
        toast.error(categoryError ?? brandError ?? error)
      }
    } else {
      navigate('/login')
    }

    if (success) {
      toast.success('Product added successfully')
      // navigate('/products')
    }

    if (quill) {
      // quill.clipboard.dangerouslyPasteHTML(description)
      quill.on('text-change', (delta, oldDelta, source) => {
        setDescription(quill.root.innerHTML)
      })
    }
  }, [
    loggedin,
    navigate,
    user,
    quill,
    description,
    dispatch,
    categoryError,
    brandError,
    error,
    success,
  ])

  //Form handler
  const formHandler = (e) => {
    e.preventDefault()
    if (name.trim() === '') {
      toast.error('Product name is required')
    } else if (description.trim() === '') {
      toast.error('Product description is required')
    } else if (price.trim() === '') {
      toast.error('Product price is required')
    } else if (stock.trim() === '') {
      toast.error('Product stock is required')
    } else if (category.trim() === '') {
      toast.error('Product category is required')
    } else if (brand.trim() === '') {
      toast.error('Product brand is required')
    } else if (status.trim() === '') {
      toast.error('Product status is required')
    } else {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('salePrice', salePrice)
      formData.append('stock', stock)
      formData.append('category', category)
      formData.append('brand', brand)
      formData.append('status', status)
      formData.append('images', images)
      dispatch(addProduct(formData))
    }
  }

  //image delete handler
  const handleDelete = (id) => {
    setImages(images.filter((item) => item.id !== id))
  }

  return (
    <Layout>
      <div className="page-title text-[#333] flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold">Add new Product</h1>
      </div>
      <form onSubmit={formHandler}>
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
                <div className="h-64" ref={quillRef} />
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
                    required
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
                    required
                    className="w-full border-gray-100 rounded-md"
                  />
                  <p className="text-sm">set inventory.</p>
                </div>

                <div className="field-group space-y-1 w-full">
                  <label className="text-sm font-bold">Discount</label>
                  <input
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
                      key={image.id}
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
              >
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
              />
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
    </Layout>
  )
}

export default NewProduct
