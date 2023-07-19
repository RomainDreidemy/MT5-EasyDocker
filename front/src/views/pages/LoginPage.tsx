import { boolean, object, string } from 'yup'
import React, { useContext, useState } from 'react'
import Warning from '../molecules/Alerts/Warning.molecule'
import Success from '../molecules/Alerts/Success.molecule'
import Input from '../atoms/forms/Input.atom'
import { UserContext } from '../../index'
import Checkbox from '../atoms/forms/Checkbox.atom'
import Cookies from 'js-cookie'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../atoms/forms/Button.atom'
import { AiOutlineUnlock } from 'react-icons/ai'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import AuthEntity from '../../services/entities/Auth.entity'
import { type IAuthEntity, type IAuthError, type IAuthStatus } from '../../interfaces/Auth.interface'

const LoginPage = (): JSX.Element => {
  const navigate = useNavigate()
  const [form, setForm] = useState<IAuthEntity>({ email: '', password: '', remember: false })
  const [status, setStatus] = useState<IAuthStatus>({ success: false, errors: [] })
  const { user, setUser } = useContext<any>(UserContext)

  const userSchema = object({
    email: string().email().required(),
    password: string().nullable().required(),
    remember: boolean().nullable()
  })

  const changeValue = (e: React.ChangeEvent<HTMLButtonElement | HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: (e.target.type === 'checkbox' ? e.target?.checked : e.target.value) })
  }
  const hasError = (field: string): boolean => {
    return status.errors?.map((e) => e.path).includes(field)
  }
  const showErrorMessage = (field: string): string[] => {
    return status.errors?.map((e) => e.path === field ? e.message : '')
  }
  const validateSchema = async (): Promise<IAuthError[]> => {
    const validationResult = await userSchema.validate(form, { abortEarly: false }).catch((err) => { console.log(err) })
    return validationResult.inner ?? []
  }
  const processLogin = async (): Promise<void> => {
    const validationErrors = (await validateSchema())
    setStatus({ ...status, errors: validationErrors })
    if (validationErrors.length > 0) return

    try {
      const authRes = await AuthEntity.auth(form)

      // Set user context
      setUser({ email: form.email, token: authRes.data.token })

      // Remember cookie
      Cookies.set(
        'token',
        authRes.data.token,
        { expires: (form.remember === true) ? 365 : 1 }
      )

      // Redirect to stacks page
      redirect('/stacks', 2000)
    } catch (e: any) {
      setStatus({ ...status, errors: [{ path: e.response.data.status, message: e.response.data.message }] })
    }
  }

  const redirect = (to: string, delay: number): void => {
    setTimeout(() => {
      navigate(to)
    }, delay)
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
                        {status.errors?.map((e, key) => e.path === 'fail' ? <Warning key={key} message={e.message}/> : '')}

                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            onChange={(e) => { changeValue(e) }}
                            className={hasError('email') ? 'border-2 border-red-600' : ''}
                        />
                        <div className='text-red-500 mb-5 first-letter:uppercase'>{showErrorMessage('email')}</div>

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            onChange={(e) => { changeValue(e) }}
                            onKeyDown={async (e) => await (e.key === 'Enter' && processLogin())}
                            className={hasError('password') ? 'border-2 border-red-600' : ''}
                        />
                        <div className='text-red-500 mb-2 first-letter:uppercase'>{showErrorMessage('password')}</div>

                        <Checkbox
                            label={'Remember me'}
                            name={'remember'}
                            onChange={(e) => { changeValue(e) }}
                            className={'mb-2'}
                        />

                        <Button
                            label={'Login'}
                            onClick={async () => { await processLogin() }}
                            className={'w-full'}
                            icon={<BiRightArrowAlt/>}
                            direction={'right'}
                        />
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
