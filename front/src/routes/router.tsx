import * as React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../views/pages/LoginPage'
import RegisterPage from '../views/pages/RegisterPage'
import StacksPage from '../views/pages/StacksPage'
import StackPage from '../views/pages/StackPage'

export const router = createBrowserRouter([
  {
    path: 'login',
    element: <LoginPage />
  },
  {
    path: 'register',
    element: <RegisterPage />
  },
  {
    path: 'stacks',
    element: <StacksPage />
  },
  {
    path: 'stacks/:id',
    element: <StackPage />
  }
])
