export interface IService {
  id: number

  name: string
  description: string
  dockerImage: string
  dockerTag: string
  entrypoint: string

  positionX: number
  positionY: number
}
