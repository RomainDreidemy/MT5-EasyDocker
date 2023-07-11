export interface INetwork {
  id: number

  description: string
  dockerImage: string
  dockerTag: string
  entrypoint: string

  positionX: number
  positionY: number
}
