export interface IAuth {
  auth: (data: IAuthEntity) => Promise<any>
  register: (data: IAuthRegisterEntity) => Promise<any>
}

export interface IAuthEntity {
  email: string
  password: string
}

export interface IAuthRegisterEntity {
  email: string
  password: string
  passwordConfirm: string
}
