import React from 'react'
import Button from '../atoms/forms/Button.atom'
import Cookies from "js-cookie";

export const Navbar = (): JSX.Element => {
  const logout = (): void => {
    Cookies.remove('token')
    window.location.href = '/login'
  }

  return (
    <div className="navbar bg-base-100 border-b-2">
      <div className="navbar-start">
        <Button label={'Export as file'} variant="primary"/>
      </div>
      <div className="navbar-center">
        <img src={'/assets/logo.png'} alt="logo" className={'w-60'}/>
      </div>
      <div className="navbar-end">
        <Button label={'Account'} variant="secondary"/>
        <Button label={'Logout'} variant="accent" className={'ml-2'} onClick={logout} />
      </div>
    </div>
  )
}
