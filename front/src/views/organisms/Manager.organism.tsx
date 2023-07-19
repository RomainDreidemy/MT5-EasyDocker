import React from 'react'
import EventsCanvas from '../../services/canvas/Events.canvas'
import { type IServiceCreate } from '../../interfaces/Service.interface'
import EntityButtonAtom from '../atoms/Forms/EntityButton.atom'
import { type INetworkCreate } from '../../interfaces/Network.interface'
import { type IVolumeCreate } from '../../interfaces/Volume.interface'
import { type AxiosResponse } from 'axios'
import { type TEntity, type TEntityCreate } from '../../types/Entity'
import { DrawerTypes } from '../../enums/DrawerTypes'
import ServiceEntity from '../../services/entities/Service.entity'
import NetworkEntity from '../../services/entities/Network.entity'
import VolumeEntity from '../../services/entities/Volume.entity'
import { Errors } from '../../enums/errors'
import { type TServiceDrawer } from '../../types/board/drawer/Service.drawer'
import ServiceDrawer from '../../services/board/drawer/Service.drawer'

const ManagerOrganism = ({ stackId }: { stackId: string }): JSX.Element => {
  const entityForm = {
    [DrawerTypes.SERVICE]: {
      description: '',
      dockerImage: '',
      dockerTag: '',
      entrypoint: '',
      isExternal: false,
      positionX: 100,
      positionY: 20,
      name: 'Unnamed'
    },
    [DrawerTypes.NETWORK]: {
      isExternal: false,
      name: 'Unnamed',
      positionX: 100,
      positionY: 20
    },
    [DrawerTypes.VOLUME]: {
      containerPath: '',
      description: '',
      localPath: '',
      name: 'Unnamed',
      positionX: 100,
      positionY: 20
    }
  }

  const createEntity = async (entity: TEntityCreate, type: DrawerTypes): Promise<AxiosResponse<TEntity>> => {
    switch (type) {
      case DrawerTypes.SERVICE:
        return await ServiceEntity.create(stackId, entity as IServiceCreate)

      case DrawerTypes.NETWORK:
        return await NetworkEntity.create(stackId, entity as INetworkCreate)

      case DrawerTypes.VOLUME:
        return await VolumeEntity.create(stackId, entity as IVolumeCreate)

      default:
        throw new Error(Errors.NOT_IMPLEMENTED)
    }
  }

  const createEntityAndDraw = async (type: DrawerTypes): Promise<void> => {
    const { data: entityCreated } = await createEntity(entityForm[type] as TEntityCreate, type)

    const entityDrawer: TServiceDrawer = ServiceDrawer(entityCreated, EventsCanvas.context!)
    entityDrawer.create()

    EventsCanvas.addAndSelectNewDrawer(entityDrawer)
  }

  const createService = async (): Promise<void> => {
    await createEntityAndDraw(DrawerTypes.SERVICE)
  }
  const createNetwork = async (): Promise<void> => {
    await createEntityAndDraw(DrawerTypes.NETWORK)
  }
  const createVolume = async (): Promise<void> => {
    await createEntityAndDraw(DrawerTypes.VOLUME)
  }

  return (
    <div className="w-full h-full border-l-2 ">
      <div className="h-[70px] border-b-2 p-2 flex flex items-center justify-between">
        <h2>
          <strong>Manager</strong>
        </h2>
      </div>

      <EntityButtonAtom name="Service" onClick={createService}/>
      <EntityButtonAtom name="Network" onClick={createNetwork}/>
      <EntityButtonAtom name="Volume" onClick={createVolume}/>

    </div>
  )
}

export default ManagerOrganism
