export interface IServiceVolume {
  id: string

  containerPath: string
  localPath: string
}

export type IServiceVolumeCreate = Omit<IServiceVolume, 'id'>
