import React from 'react'
import ServiceDrawer from '../../services/board/drawer/Service.drawer'
import EventsCanvas from '../../services/canvas/Events.canvas'
import { type TServiceDrawer } from '../../types/board/drawer/Service.drawer'
import { type IService, type IServiceCreate } from '../../interfaces/Service.interface'
import EntityButtonAtom from '../atoms/Forms/EntityButton.atom'
import { type INetwork, type INetworkCreate } from '../../interfaces/Network.interface'
import NetworkDrawer from '../../services/board/drawer/Network.drawer'
import { type TNetworkDrawer } from '../../types/board/drawer/Network.drawer'

const ManagerOrganism = (): JSX.Element => {
  /**
   * Dirty code, but it's just for testing
   */

  const createService = (): void => {
    const service: IServiceCreate = {
      description: '',
      dockerImage: '',
      dockerTag: '',
      entrypoint: '',
      isExternal: false,
      positionX: 100,
      positionY: 20,
      name: 'Unnamed'
    }
    const serviceDrawer: TServiceDrawer = ServiceDrawer(service as IService, EventsCanvas.context!)
    serviceDrawer.create()

    EventsCanvas.addAndSelectNewDrawer(serviceDrawer)
  }

  const createNetwork = (): void => {
    const network: INetworkCreate = {
      isExternal: false,
      name: 'Unnamed',
      positionX: 0,
      positionY: 0
    }
    const networkDrawer: TNetworkDrawer = NetworkDrawer(network as INetwork, EventsCanvas.context!)
    networkDrawer.create()

    EventsCanvas.addAndSelectNewDrawer(networkDrawer)
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
      <EntityButtonAtom name="Volume" onClick={createService}/>

    </div>
  )
}

ManagerOrganism.propTypes = {}

export default ManagerOrganism
