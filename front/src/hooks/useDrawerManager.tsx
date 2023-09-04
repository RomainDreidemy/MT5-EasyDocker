import { useState } from 'react'
import { DrawerTypes } from '../enums/DrawerTypes'
import ServiceDrawer from '../services/board/drawer/Service.drawer'
import NetworkDrawer from '../services/board/drawer/Network.drawer'
import VolumeDrawer from '../services/board/drawer/Volume.drawer'
import { type TEntity, type TEntityCreate } from '../types/Entity'
import { type AxiosResponse } from 'axios'
import ServiceEntity from '../services/entities/Service.entity'
import { type IServiceCreate } from '../interfaces/Service.interface'
import NetworkEntity from '../services/entities/Network.entity'
import { type INetworkCreate } from '../interfaces/Network.interface'
import VolumeEntity from '../services/entities/Volume.entity'
import { type IVolumeCreate } from '../interfaces/Volume.interface'
import { Errors } from '../enums/errors'
import { type ISize } from '../interfaces/Window.interface'
import StateFactory from '../services/board/drawer/factories/State.factory'
import EventsCanvas from '../services/canvas/Events.canvas'
import { type TServiceDrawer } from '../types/board/drawer/Service.drawer'
import ManagedVolumeEntity from "../services/entities/Volume.entity";

const useDrawerManager = (stackId: string): {
  createEntityAndDraw: (type: DrawerTypes) => Promise<void>
  createEntity: (entity: TEntityCreate, type: DrawerTypes) => Promise<AxiosResponse<TEntity>>
  loading: boolean
} => {
  const [loading, setLoading] = useState<boolean>(false)

  const entityForm = {
    [DrawerTypes.SERVICE]: {
      drawer: ServiceDrawer,
      form: {
        description: '',
        dockerImage: '',
        dockerTag: '',
        entrypoint: '',
        isExternal: false,
        positionX: 0,
        positionY: 0,
        name: 'Unnamed'
      }
    },
    [DrawerTypes.NETWORK]: {
      drawer: NetworkDrawer,
      form: {
        isExternal: false,
        name: 'Unnamed',
        positionX: 0,
        positionY: 0
      }
    },
    [DrawerTypes.VOLUME]: {
      drawer: VolumeDrawer,
      form: {
        containerPath: '',
        description: '',
        localPath: '',
        name: 'Unnamed',
        positionX: 0,
        positionY: 0
      }
    }
  }

  const createEntity = async (entity: TEntityCreate, type: DrawerTypes): Promise<AxiosResponse<TEntity>> => {
    switch (type) {
      case DrawerTypes.SERVICE:
        return await ServiceEntity.create(stackId, entity as IServiceCreate)

      case DrawerTypes.NETWORK:
        return await NetworkEntity.create(stackId, entity as INetworkCreate)

      case DrawerTypes.VOLUME:
        return await ManagedVolumeEntity.create(stackId, entity as IVolumeCreate)

      default:
        throw new Error(Errors.NOT_IMPLEMENTED)
    }
  }

  const createEntityAndDraw = async (type: DrawerTypes): Promise<void> => {
    try {
      setLoading(true)

      const { form, drawer } = entityForm[type]

      const size: ISize = { width: StateFactory.width, height: StateFactory.height }

      const { x, y } = EventsCanvas.emptyPosition(size)

      form.positionX = x
      form.positionY = y

      const { data: entityCreated } = await createEntity(form, type)

      const entityDrawer: TServiceDrawer = drawer(entityCreated, EventsCanvas.context!)
      entityDrawer.create()

      EventsCanvas.addAndSelectNewDrawer(entityDrawer)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return {
    createEntityAndDraw,
    createEntity,
    loading
  }
}

export default useDrawerManager
