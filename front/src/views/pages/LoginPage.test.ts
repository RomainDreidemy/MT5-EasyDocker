import { expect, test } from 'vitest'
import { validateSchema } from '../../services/utils/validation.util'
import { object, string, boolean } from 'yup';
import { IAuthEntity } from '../../interfaces/Auth.interface';

const userSchema = object({
  email: string().email().required(),
  password: string().nullable().required(),
  remember: boolean().nullable()
})

test('Login - Email/Password pair Validation Test', async () => {

  const form: IAuthEntity = {
    email: '',
    password: '',
    remember: false
  }

  const expectedError =  [
    {
      "message": "email is a required field",
      "path": "email",
    },
    {
      "message": "password is a required field",
      "path": "password",
    }
  ]

  const validationErrors = (await validateSchema(userSchema, form))
  expect(validationErrors).toMatchObject(expectedError)

});