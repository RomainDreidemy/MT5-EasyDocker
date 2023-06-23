import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { IconContext } from 'react-icons'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

export const UserContext = createContext({})

const App = (): JSX.Element => {
  const [user, setUser] = useState(UserContext)

  return (
        <IconContext.Provider value={{ className: 'icons' }}>
            <UserContext.Provider value={{ user, setUser }}>
                <RouterProvider router={router}/>
            </UserContext.Provider>
        </IconContext.Provider>
  )
}

root.render(<App />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
