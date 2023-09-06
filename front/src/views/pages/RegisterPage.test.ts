import { expect, test } from 'vitest'
import { validateSchema } from '../../services/utils/validation.util'
import { IAuthEntity } from '../../interfaces/Auth.interface';
import { object, string, ref } from 'yup';

const registerSchema = object({
  email: string().email().required(),
  password: string().nullable().min(8).required(),
  passwordConfirm: string().nullable().min(8).required().oneOf([ref('password')], 'Passwords must match')
})

test('Register - Email Validation Test', async () => {

  const form: IAuthEntity = {
    email: '',
    password: 'test1234',
    passwordConfirm: 'test1234',
  }

  const expectedError =  [
    {
      message: "email is a required field",
      path: "email",
    }
  ]

  const validationErrors = (await validateSchema(registerSchema, form))
  expect(validationErrors).toMatchObject(expectedError)

});


test('Register - Password Validation Test', async () => {

  const form: IAuthEntity = {
    email: 'test@example.com',
    password: 'test',
    passwordConfirm: 'test',
  }

  const expectedError =  [
    {
        message: "passwordConfirm must be at least 8 characters",
        path: "passwordConfirm",
    },
    {
        path: 'password',
        message: 'password must be at least 8 characters'
    }
  ]

  const validationErrors = (await validateSchema(registerSchema, form))
  expect(validationErrors).toMatchObject(expectedError)
});


test('Register - Password Confirm Validation Test', async () => {

    const form: IAuthEntity = {
      email: 'test@example.com',
      password: 'test1234',
      passwordConfirm: 'test4321',
    }

    const expectedError =  [
      {
        message: "Passwords must match",
        path: "passwordConfirm",
      }
    ]

    const validationErrors = (await validateSchema(registerSchema, form))
    expect(validationErrors).toMatchObject(expectedError)
});

