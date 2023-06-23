export interface IAuth {
  auth: (data: IAuthEntity) => Promise<any>
}

export interface IAuthEntity {
  email: string
  password: string
}
