import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { object, string } from 'yup'
import AuthEntity from '../../services/entities/Auth.entity'
import Success from '../molecules/Alerts/Success.molecule'
import Warning from '../molecules/Alerts/Warning.molecule'
import Input from '../atoms/Forms/Input.atom'
import Button from '../atoms/Forms/Button.atom'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'

const RegisterPage = () => {
  const [form, setForm] = useState({ email: '', password: '', passwordConfirm: '' })
  const [status, setStatus] = useState({ success: false, errors: [] })
  const navigate = useNavigate()

  const registerSchema = object({
    email: string().email().required(),
    password: string().nullable().min(8).required(),
    passwordConfirm: string().nullable().min(8).required()
  })

  const changeValue = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (e.target.name === 'passwordConfirm') passwordMatch(e.target.value)
  }
  const hasError = (field) => {
    return status.errors?.map((e) => e.path).includes(field)
  }
  const showErrorMessage = (field) => {
    return status.errors?.map((e) => e.path === field ? e.message : '')
  }
  const validateSchema = async () => {
    const validationResult = await registerSchema.validate(form, { abortEarly: false }).catch((err) => err)
    return validationResult.inner ?? null
  }

  const passwordMatch = (passwordConfirm) => {
    const doesMatch = form.password === passwordConfirm

    if (!doesMatch) setStatus({ ...status, errors: [{ path: 'passwordMatch', message: 'Passwords doesn\'t match !' }] })
    else setStatus({ ...status, errors: [] })

    return doesMatch
  }

  const processRegister = async () => {
    const validationErrors = (await validateSchema())
    setStatus({ ...status, errors: validationErrors })
    if (validationErrors !== null) return

    try {
      const registrationRes = await AuthEntity.register(form)
      if (registrationRes.data.id !== null) {
        setStatus({ errors: [], success: true })

        // Redirect to login page
        setTimeout(() => {
          navigate('/login')
        }, 5000)
      }
    } catch (e) {
      setStatus({ success: false, errors: [{ path: e.response.data.status, message: e.response.data.message }] })
    }
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

            {(status.success === true) ? <Success message={'Registration complete. Redirecting you to login page...'}/> : ''}
            {status.errors?.map((e, key) => e.path === 'fail' ? <Warning key={key} message={e.message}/> : '')}

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
              className={hasError('password') ? 'border-2 border-red-600' : ''}
            />
            <div className='text-red-500 mb-2 first-letter:uppercase'>{showErrorMessage('password')}</div>

            <Input
              label="Confirm Password"
              type="password"
              name="passwordConfirm"
              onChange={(e) => changeValue(e)}
              className={hasError('passwordConfirm') ? 'border-2 border-red-600' : ''}
            />
            <div className='text-red-500 mb-2 first-letter:uppercase'>
              {showErrorMessage('password')}
              {showErrorMessage('passwordMatch')}
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
