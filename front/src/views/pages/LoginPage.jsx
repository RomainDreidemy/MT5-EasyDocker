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
import Button from '../atoms/Forms/Button.atom'
import { AiOutlineUnlock } from 'react-icons/ai'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'

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
                        {(user.token !== null && user.token !== undefined) ? <Success message={'Logged in successfully. Redirecting...'}/> : ''}

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
                            onKeyDown={(e) => {
                              e.key === 'Enter' && processLogin()
                            }}
                            className={errors?.map((e) => e.path).includes('password') ? 'border-2 border-red-600' : ''}
                        />
                        <div className='text-red-500 mb-2 first-letter:uppercase'>{errors?.map(e => e.path === 'password' ? e.message : '')}</div>

                        <Checkbox label={'Remember me'} onChange={(e) => {
                          setForm({ ...form, remember: e.target.checked })
                        }} className={'mb-2'}/>

                        <Button
                            label={'Login'}
                            onClick={processLogin}
                            className={'w-full'}
                            icon={<BiRightArrowAlt/>}
                            direction={'right'}
                        />
                        {errors?.map((e, key) => e.path === 'fail' ? <Warning key={key} message={e.message}/> : '')}
                    </div>

                    <div className="py-5">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-center sm:text-left whitespace-nowrap">
                                <NavLink to={'/forgot-password'}>
                                    <Button label={'Forgot password ?'} icon={<AiOutlineUnlock/>} variant={'ghost'}/>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-5">
                    <div className="grid grid-cols-2 gap-1">
                        <div className="text-center sm:text-left whitespace-nowrap">
                            <NavLink to={'/'}>
                                <Button label={'Back to home'} icon={<BiLeftArrowAlt/>} variant={'ghost'}/>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default LoginPage
