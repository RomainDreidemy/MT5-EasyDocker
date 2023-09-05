import * as React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from '../views/pages/LoginPage'
import RegisterPage from '../views/pages/RegisterPage'
import StacksPage from '../views/pages/StacksPage'
import StackPage from '../views/pages/StackPage'
import ProtectedRoute from './Protected.route'
import Redirect from './Redirect'

export const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/stacks' element={<ProtectedRoute/>}>
          <Route path='/stacks' element={<StacksPage/>}/>
          <Route path="/stacks/:id" element={<StackPage/>} />
        </Route>

        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>

        <Redirect from="/" to="/stacks" />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
