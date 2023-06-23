import React, { useContext, useState } from 'react'
import axios from '../../services/utils/axios'
import { boolean, object, string } from 'yup'
import Warning from '../molecules/Alerts/Warning.molecule'
import Success from '../molecules/Alerts/Success.molecule'
import Input from '../atoms/Forms/Input.atom'
import { UserContext } from '../../index'
import Checkbox from '../atoms/Forms/Checkbox.atom'
import Cookies from 'js-cookie'
import { NavLink, useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [errors, setErrors] = useState([])
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const userSchema = object({
    email: string().email().required(),
    password: string().nullable().required(),
    remember: boolean().nullable()
  })

  const validateSchema = async () => {
    const validationResult = await userSchema
      .validate(form, { abortEarly: false })
      .catch((err) => {
        return err
      })

    return validationResult.inner ?? null
  }
  const processLogin = async () => {
    const validationErrors = (await validateSchema())
    setErrors(validationErrors)
    if (validationErrors !== null) return

    axios.post('/auth/login', form).then(r => {
      // Return error if status is not 200
      if (r.status !== 200) {
        setErrors([{ path: 'fail', message: 'Error while logging in. Please try again later.' }])
        return
      }

      // Set user context
      setUser({ email: form.email, token: r.data.token })

      // Remember cookie
      Cookies.set(
        'token',
        r.data.token,
        { expires: form.remember ? 365 : 1 }
      )

      // Redirect to stacks page
      setTimeout(() => {
        navigate('/stacks')
      }, 2000)
    }).catch(e => {
      setErrors([{ path: e.response.data.status, message: e.response.data.message }])
    })
  }

  return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <h1 className="font-bold text-center text-2xl mb-5">
                    <img src={'/assets/logo.png'} alt="logo" className={'w-5/6 mx-auto'}/>
                </h1>
                <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                    <div className="px-5 py-7">

                        <Input
                            label="Email"
                            type="email"
                            onChange={(e) => {
                              setForm({ ...form, email: e.target.value })
                            }}
                            className={errors?.map((e) => e.path).includes('email') ? 'border-2 border-red-600' : ''}
                        />
                        <div className='text-red-500 mb-5 first-letter:uppercase'>{errors?.map(e => e.path === 'email' ? e.message : '')}</div>

                        <Input
                            label="Password"
                            type="password"
                            onChange={(e) => {
                              setForm({ ...form, password: e.target.value })
                            }}
                            onKeyDown={async (e) => {
                              e.key === 'Enter' ? await processLogin() : null
                            }}
                            className={errors?.map((e) => e.path).includes('password') ? 'border-2 border-red-600' : ''}
                        />
                        <div className='text-red-500 mb-2 first-letter:uppercase'>{errors?.map(e => e.path === 'password' ? e.message : '')}</div>

                        <Checkbox label={'Remember me'} onChange={(e) => {
                          setForm({ ...form, remember: e.target.checked })
                        }} className={'mb-2'}/>

                        <button type="button" onClick={processLogin} className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                            <span className="inline-block mr-2">Login</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                            </svg>
                        </button>
                        {errors?.map((e, key) => e.path === 'fail' ? <Warning key={key} message={e.message}/> : '')}
                        {(user.token !== null && user.token !== undefined) ? <Success message={'Logged in successfully. Redirecting...'}/> : ''}

                    </div>

                    <div className="py-5">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-center sm:text-left whitespace-nowrap">
                                <NavLink to={'/forgot-password'}>
                                    <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block" style={{ verticalAlign: '-2px' }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/>
                                        </svg>
                                        <span className="inline-block ml-1">Forgot password ?</span>
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-5">
                    <div className="grid grid-cols-2 gap-1">
                        <div className="text-center sm:text-left whitespace-nowrap">
                            <NavLink to={'/'}>
                                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block" style={{ verticalAlign: '-3px' }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                                    </svg>
                                    <span className="inline-block ml-1">Back to home</span>
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default LoginPage
