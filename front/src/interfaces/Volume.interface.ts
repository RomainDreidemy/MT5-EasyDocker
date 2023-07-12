export interface IVolume {
  id: string

  name: string
  description: string
  containerPath: string
  localPath: string

  positionX: number
  positionY: number
}

export type IVolumeCreate = Omit<IVolume, 'id'>
