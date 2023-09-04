
export interface IValidationStatus {
  success: boolean
  errors: IValidationError[]
}

export interface IValidationError {
  path: string
  message: string
}
