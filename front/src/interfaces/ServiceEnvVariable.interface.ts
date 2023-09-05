export interface IServiceEnvVariable {
  id: string

  key: string
  value: string
}

export type IServiceEnvVariableCreate = Omit<IServiceEnvVariable, 'id'>
