import { type IValidationError, type IValidationStatus } from '../../interfaces/Forms/Validation.interface'
import { ValidationError } from 'yup'

export async function validateSchema (schema: any, form: any): Promise<IValidationError[]> {
  let validationResult: IValidationError[] | PromiseLike<IValidationError[]> = []
  try {
    await schema.validate(form, { abortEarly: false })
  } catch (err) {
    if (err instanceof ValidationError) {
      validationResult = getValidationErrors(err)
    }
  }
  return validationResult
}

export function getValidationErrors (err: ValidationError): IValidationError[] {
  const validationErrors: IValidationError[] = []

  err.inner.forEach((error: ValidationError) => {
    validationErrors.push({ path: error.path ?? '', message: error.message })
  })

  return validationErrors
}

export function hasError (status: IValidationStatus, field: string): boolean {
  return status.errors?.map((e) => e.path).includes(field)
}

export function showErrorMessage (status: IValidationStatus, field: string): string[] {
  return status.errors?.map((e) => e.path === field ? e.message : '')
}
