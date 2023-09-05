export interface IAuth {
  auth: (data: IAuthEntity) => Promise<any>
  register: (data: IAuthEntity) => Promise<any>
  logout: () => Promise<any>
  me: () => Promise<any>
}

export interface IAuthEntity {
  email: string
  password: string
  passwordConfirm?: string
  remember?: boolean
}
