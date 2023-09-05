import { Navigate, Route } from 'react-router-dom'
import * as React from 'react'
import { type ReactElement } from 'react'

interface IRedirect {
  from: string
  to: string
}

const Redirect = ({ from, to }: IRedirect): ReactElement => (
  <Route
    path={from}
    element={<Navigate to={to} replace />}
  />
)

export default Redirect
