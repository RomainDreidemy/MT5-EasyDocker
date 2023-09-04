import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { object, string } from 'yup'
import AuthEntity from '../../services/entities/Auth.entity'
import Success from '../molecules/Alerts/Success.molecule'
import Warning from '../molecules/Alerts/Warning.molecule'
import Input from '../atoms/forms/Input.atom'
import Button from '../atoms/forms/Button.atom'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import { type IAuthEntity } from '../../interfaces/Auth.interface'
import { type IValidationStatus } from '../../interfaces/Forms/Validation.interface'
import { hasError, showErrorMessage, validateSchema } from '../../services/utils/validation.util'

const RegisterPage = (): JSX.Element => {
  const navigate = useNavigate()
  const [form, setForm] = useState<IAuthEntity>({ email: '', password: '', passwordConfirm: '' })
  const [status, setStatus] = useState<IValidationStatus>({ success: false, errors: [] })

  useEffect(() => {
    async () => {
      const response = await AuthEntity.isLogged()
      if (response) {
        navigate('/')
      }
    }
  }, [])

  const registerSchema = object({
    email: string().email().required(),
    password: string().nullable().min(8).required(),
    passwordConfirm: string().nullable().min(8).required()
  })

  const processRegister = async (): Promise<void> => {
    const validationErrors = (await validateSchema(registerSchema, form))
    setStatus({ ...status, errors: validationErrors })
    if (validationErrors?.length > 0) return

    try {
      const registrationRes = await AuthEntity.register(form)
      if (registrationRes.data.id !== null) {
        setStatus({ success: true, errors: [] })

        // Redirect to login page
        redirect('/login', 5000)
      }
    } catch (e: any) {
      setStatus({ success: false, errors: [{ path: e.response.data.status, message: e.response.data.message }] })
    }
  }

  const changeValue = (e: React.ChangeEvent<any>): void => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (e.target.name === 'passwordConfirm') passwordMatch(e.target.value)
  }
  const passwordMatch = (passwordConfirm: string): boolean => {
    const doesMatch = form.password === passwordConfirm

    if (!doesMatch) setStatus({ ...status, errors: [{ path: 'passwordMatch', message: 'Passwords doesn\'t match !' }] })
    else setStatus({ ...status, errors: [] })

    return doesMatch
  }
  const redirect = (to: string, delay: number): void => {
    setTimeout(() => {
      navigate(to)
    }, delay)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-2">
          <img src={'/assets/logo.png'} alt="logo" className={'w-5/6 mx-auto'}/>
        </h1>
        <h2 className={'mb-3 text-2xl font-semibold text-primary mx-auto text-center'}>Registration</h2>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div className="px-5 py-7">

            {(status.success) ? <Success message={'Registration complete. Redirecting you to login page...'}/> : ''}
            {status.errors?.map((e, key) => e.path === 'fail' ? <Warning key={key} message={e.message}/> : '')}

            <Input
              label="Email"
              type="email"
              name="email"
              onChange={(e) => { changeValue(e) }}
              className={hasError(status, 'email') ? 'border-2 border-red-600' : ''}
            />
            <div className='text-red-500 mb-5 first-letter:uppercase'>{showErrorMessage(status, 'email')}</div>

            <Input
              label="Password"
              type="password"
              name="password"
              onChange={(e) => { changeValue(e) }}
              className={hasError(status, 'password') ? 'border-2 border-red-600' : ''}
            />
            <div className='text-red-500 mb-2 first-letter:uppercase'>{showErrorMessage(status, 'password')}</div>

            <Input
              label="Confirm Password"
              type="password"
              name="passwordConfirm"
              onChange={(e) => { changeValue(e) }}
              onKeyDown={async (e) => await (e.key === 'Enter' && processRegister())}
              className={hasError(status, 'passwordConfirm') ? 'border-2 border-red-600' : ''}
            />
            <div className='text-red-500 mb-2 first-letter:uppercase'>
              {showErrorMessage(status, 'password')}
              {showErrorMessage(status, 'passwordMatch')}
            </div>

            <Button
              label={'Register'}
              onClick={processRegister}
              className={'w-full mt-5'}
              icon={<BiRightArrowAlt/>}
              direction={'right'}
              disabled={status.errors?.length > 1 && status.errors[0]?.path === 'passwordMatch'}
            />
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

export default RegisterPage
