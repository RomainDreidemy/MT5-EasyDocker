import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthEntity from '../services/entities/Auth.entity'
import { Navbar } from '../views/organisms/Navbar.organism'

const ProtectedRoute = (): JSX.Element => {
  const [isLogged, setLogged] = useState(true)

  const isLoggedUser = async (): Promise<boolean> => {
    try {
      await AuthEntity.me()
      return true
    } catch (_) {
      return false
    }
  }

  useEffect(() => {
    (async () => {
      const response = await isLoggedUser()
      setLogged(response)
    })()
  }, [])

  return isLogged
    ? <>
      <Navbar/>
      <Outlet/>
    </>
    : <Navigate to="/login"/>
}

export default ProtectedRoute
