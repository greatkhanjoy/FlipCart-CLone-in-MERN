import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Cards from '../components/Cards'
import Layout from '../components/Layout'

const Home = () => {
  const navigate = useNavigate()
  const { loggedin } = useSelector((state) => state.login)

  useEffect(() => {
    if (!loggedin) {
      navigate('/login')
    }
  }, [loggedin, navigate])

  return (
    <Layout>
      <div className="page-title text-[#333]">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <Cards />
    </Layout>
  )
}

export default Home
