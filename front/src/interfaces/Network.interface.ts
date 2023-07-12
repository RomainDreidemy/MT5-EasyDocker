export interface INetwork {
  id: string

  name: string
  isExternal: boolean

  positionX: number
  positionY: number
}

export type INetworkCreate = Omit<INetwork, 'id'>
