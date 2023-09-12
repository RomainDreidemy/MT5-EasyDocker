import { useState } from 'react'
import { DrawerTypes } from '../enums/DrawerTypes'
import ServiceDrawer from '../services/board/drawer/Service.drawer'
import NetworkDrawer from '../services/board/drawer/Network.drawer'
import VolumeDrawer from '../services/board/drawer/Volume.drawer'
import { type TEntity, type TEntityCreate } from '../types/Entity'
import { type AxiosResponse } from 'axios'
import { type ISize } from '../interfaces/Window.interface'
import StateFactory from '../services/board/drawer/factories/State.factory'
import EventsCanvas from '../services/canvas/Events.canvas'
import { type TServiceDrawer } from '../types/board/drawer/Service.drawer'
import DrawerManager from '../services/entities/Drawer.manager'

const useDrawerManager = (stackId: string): {
  createEntityAndDraw: (type: DrawerTypes) => Promise<void>
  createEntity: (stackId: string, entity: TEntityCreate, type: DrawerTypes) => Promise<AxiosResponse<TEntity>>
  updateEntity: (entity: TEntity, type: DrawerTypes) => Promise<AxiosResponse<TEntity>>
  deleteEntity: (entity: TEntity, type: DrawerTypes) => Promise<any>
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

  const createEntity = DrawerManager.create
  const updateEntity = DrawerManager.update
  const deleteEntity = DrawerManager.delete

  const createEntityAndDraw = async (type: DrawerTypes): Promise<void> => {
    try {
      setLoading(true)

      const { form, drawer } = entityForm[type]

      const size: ISize = { width: StateFactory.width, height: StateFactory.height }

      const { x, y } = EventsCanvas.emptyPosition(size)

      form.positionX = x
      form.positionY = y

      const { data: entityCreated } = await DrawerManager.create(stackId, form, type)

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
    updateEntity,
    deleteEntity,
    loading
  }
}

export default useDrawerManager
