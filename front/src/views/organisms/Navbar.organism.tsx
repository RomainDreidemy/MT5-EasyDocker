import React from 'react'
import Button from '../atoms/forms/Button.atom'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'

export const Navbar = (): JSX.Element => {
  const navigate = useNavigate()

  const logout = (): void => {
    Cookies.remove('token')
    navigate('/login')
  }

  return (
    <div className="navbar bg-base-100 border-b-2">
      <div className="navbar-start">
        <Button label={'Export as file'} variant="primary"/>
      </div>
      <Link to="/stacks" className="navbar-center">
        <img src={'/assets/logo.png'} alt="logo" className={'w-60'}/>
      </Link>
      <div className="navbar-end">
        <Button label={'Logout'} variant="accent" className={'ml-2'} onClick={logout} />
      </div>
    </div>
  )
}
