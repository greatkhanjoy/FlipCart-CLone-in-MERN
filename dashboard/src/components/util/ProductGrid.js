import { PencilIcon, TrashIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'

const ProductGrid = ({ products }) => {
  const deleteHandler = (id) => {
    console.log(id)
  }

  return (
    <div className="bg-white p-3">
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-3 gap-x-6 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <div key={product._id} className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 relative">
                <img
                  src={
                    product.images.length > 0
                      ? product.images[0].img
                      : 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg'
                  }
                  alt={product.name}
                  className="h-72 min-h-72 object-center object-cover group-hover:opacity-75"
                />
                <div className="action absolute flex space-x-3 top-2 right-2">
                  <button onClick={() => deleteHandler(product._id)}>
                    <TrashIcon className="w-7 h-7 p-1 bg-gray-50 text-red-500 rounded-full" />
                  </button>
                  <Link to={`/products/${product._id}`}>
                    <PencilIcon className="w-7 h-7 p-1 bg-gray-50 text-blue-500 rounded-full" />
                  </Link>
                </div>
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {product.price}
              </p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ProductGrid
