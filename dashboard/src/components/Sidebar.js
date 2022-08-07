import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <aside className="mt-16 hidden md:flex flex-col sidebar w-80 bg-[#404E67] min-h-screen text-white relative overflow-hidden">
      <div className="fixed overflow-auto flex flex-col">
        <div className="sidebar-header">
          <h3 className="font-bold px-3 text-2xl mb-10">Back office</h3>
        </div>
        <div className="links flex flex-col mb-10">
          <Link
            to="/"
            className="link py-2 hover:text-white hover:bg-gray-600 p-3"
          >
            Dashboard
          </Link>
          <Link
            to="/products"
            className="link py-2 hover:text-white hover:bg-gray-600 p-3"
          >
            Products
          </Link>
        </div>
      </div>
    </aside>
  )
}

export default SideBar
