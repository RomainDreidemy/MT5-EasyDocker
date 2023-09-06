export interface IStack {
  id: number

  description: string
  name: string
}

export interface IStackEntity {
  name: string
  description: string
}

export interface IstackMethods {
  createStack: (stack: IStackEntity) => Promise<IStack>
}