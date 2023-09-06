import React from 'react'
import Button from '../atoms/forms/Button.atom'
import { Link, useNavigate } from 'react-router-dom'
import AuthEntity from '../../services/entities/Auth.entity'
import { BiLeftArrowAlt } from 'react-icons/bi'

export const Navbar = (): JSX.Element => {
  const navigate = useNavigate()

  const logout = async (): Promise<void> => {
    await AuthEntity.logout()
    navigate('/login')
  }

  return (
    <div className="navbar bg-base-100 border-b-2">
      <div className="navbar-start">
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
