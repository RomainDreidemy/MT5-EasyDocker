import { boolean, object, string } from 'yup'
import React, { useContext, useState } from 'react'
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
import AuthEntity from '../../services/entities/Auth.entity'

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

  const changeValue = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const hasError = (field) => {
    return errors?.map((e) => e.path).includes(field)
  }
  const showErrorMessage = (field) => {
    return errors?.map((e) => e.path === field ? e.message : '')
  }
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

    const authRes = await AuthEntity.auth(form)
    if (authRes.status !== 200) {
      setErrors([{ path: authRes.data.status, message: authRes.data.message }])
      return
    }

    // Set user context
    setUser({ email: form.email, token: authRes.data.token })

    // Remember cookie
    Cookies.set(
      'token',
      authRes.data.token,
      { expires: form.remember ? 365 : 1 }
    )

    // Redirect to stacks page
    setTimeout(() => {
      navigate('/stacks')
    }, 2000)
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
                            name="email"
                            onChange={(e) => changeValue(e)}
                            className={hasError('email') ? 'border-2 border-red-600' : ''}
                        />
                        <div className='text-red-500 mb-5 first-letter:uppercase'>{showErrorMessage('email')}</div>

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            onChange={(e) => changeValue(e)}
                            onKeyDown={(e) => e.key === 'Enter' && processLogin()}
                            className={hasError('password') ? 'border-2 border-red-600' : ''}
                        />
                        <div className='text-red-500 mb-2 first-letter:uppercase'>{showErrorMessage('password')}</div>

                        <Checkbox
                            label={'Remember me'}
                            name={'remember'}
                            onChange={(e) => changeValue(e)}
                            className={'mb-2'}
                        />

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
                            <div className="text-center sm:text-left whitespace-nowrap ml-1">
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
