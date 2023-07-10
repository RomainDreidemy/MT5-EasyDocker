import React from 'react'
import Button from '../atoms/Forms/Button.atom'

export const Navbar = (): JSX.Element => {
  return (
    <div className="navbar bg-gray-100">
      <div className="navbar-start">
        <Button label={'Export as file'} variant="primary"/>
      </div>
      <div className="navbar-center">
        <img src={'/assets/logo.png'} alt="logo" className={'w-60'}/>
      </div>
      <div className="navbar-end">
        <Button label={'Account'} variant="secondary"/>
      </div>
    </div>
  )
}
