import { boolean, object, string } from 'yup'
import React, { useContext, useState } from 'react'
import Warning from '../molecules/Alerts/Warning.molecule'
import Input from '../atoms/forms/Input.atom'
import { UserContext } from '../../index'
import Checkbox from '../atoms/forms/Checkbox.atom'
import Cookies from 'js-cookie'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../atoms/forms/Button.atom'
import { AiOutlineUnlock } from 'react-icons/ai'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import AuthEntity from '../../services/entities/Auth.entity'
import { type IAuthEntity } from '../../interfaces/Auth.interface'
import { type IValidationStatus } from '../../interfaces/Forms/Validation.interface'
import { hasError, showErrorMessage, validateSchema } from '../../services/utils/validation.util'
import useForm from '../../hooks/useForm'
import { type EditorForm, TypeList } from '../../forms/editor.structure'
import { CookieType } from '../../enums/CookieType'

export const USER_STRUCTURE: EditorForm[] = [
  {
    label: 'Email',
    key: 'email',
    type: TypeList.TEXT,
    component: Input,
    validator: string().nullable()
  },
  {
    label: 'Password',
    key: 'password',
    type: TypeList.PASSWORD,
    component: Input,
    validator: string().nullable()
  },
  {
    label: 'Remember me',
    key: 'remember',
    type: TypeList.TEXT,
    component: Checkbox,
    validator: string().nullable()
  }
]

const LoginPage = (): JSX.Element => {
  const navigate = useNavigate()
  // const [form, setForm] = useState<IAuthEntity>({ email: '', password: '', remember: false })
  const [status, setStatus] = useState<IValidationStatus>({ success: false, errors: [] })
  const { user, setUser } = useContext<any>(UserContext)

  const initialUser: IAuthEntity = { email: '', password: '', remember: false }

  const {
    form,
    onChange,
    validatorsSchema
  } = useForm<IAuthEntity>(initialUser, USER_STRUCTURE)

  const onSubmit = async (): Promise<void> => {
    await validatorsSchema.validate(form)

    const validationErrors = (await validateSchema(validationErrors, form))
    setStatus({ ...status, errors: validationErrors })
    if (validationErrors.length > 0) return

    try {
      const authRes = await AuthEntity.auth(form)

      // Set user context
      setUser({ email: form.email, token: authRes.data.token })

      // Remember cookie
      Cookies.set(
        CookieType.TOKEN,
        authRes.data.token,
        { expires: (form.remember === true) ? 365 : 1 }
      )

      navigate('/stacks')
    } catch (e: any) {
      setStatus({ ...status, errors: [{ path: e.response.data.status, message: e.response.data.message }] })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">
          <img src={'/assets/logo.png'} alt="logo" className={'w-5/6 mx-auto'}/>
        </h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div className="px-5 py-7">

            {status.errors?.map((e, key) => e.path === 'fail' ? <Warning key={key} message={e.message}/> : '')}

            <Input
              label="Email"
              type="email"
              name="email"
              onChange={onChange}
              className={hasError(status, 'email') ? 'border-2 border-red-600' : ''}
            />
            <div className='text-red-500 mb-5 first-letter:uppercase'>{showErrorMessage(status, 'email')}</div>

            <Input
              label="Password"
              type="password"
              name="password"
              onChange={onChange}
              onKeyDown={async (e) => await (e.key === 'Enter' && onSubmit())}
              className={hasError(status, 'password') ? 'border-2 border-red-600' : ''}
            />
            <div className='text-red-500 mb-2 first-letter:uppercase'>{showErrorMessage(status, 'password')}</div>

            <Checkbox
              label={'Remember me'}
              name={'remember'}
              onChange={onChange}
              className={'mb-2'}
            />

            <Button
              label={'Login'}
              onClick={onSubmit}
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
              <NavLink to={'/register'}>
                <Button label="Create an account" icon={<BiLeftArrowAlt/>} variant={'ghost'}/>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
