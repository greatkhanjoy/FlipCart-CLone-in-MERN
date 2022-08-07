import Header from './Header'
import SideBar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="content-body flex">
        <SideBar />
        <main className="main mt-16 w-full p-6 bg-[#F6F7FB] relative">
          {children}
        </main>
      </div>
    </>
  )
}

export default Layout
