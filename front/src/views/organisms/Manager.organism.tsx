import React from 'react'
import ServiceDrawer from '../../services/board/drawer/Service.drawer'
import EventsCanvas from '../../services/canvas/Events.canvas'
import {type TServiceDrawer} from '../../types/board/drawer/Service.drawer'
import {type IServiceCreate} from '../../interfaces/Service.interface'
import EntityButtonAtom from '../atoms/Forms/EntityButton.atom'
import {type INetworkCreate} from '../../interfaces/Network.interface'
import NetworkDrawer from '../../services/board/drawer/Network.drawer'
import {type TNetworkDrawer} from '../../types/board/drawer/Network.drawer'
import {IVolumeCreate} from "../../interfaces/Volume.interface";
import VolumeDrawer from "../../services/board/drawer/Volume.drawer";
import {TVolumeDrawer} from "../../types/board/drawer/Volume.drawer";

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
    const serviceDrawer: TServiceDrawer = ServiceDrawer(service, EventsCanvas.context!)
    serviceDrawer.create()

    EventsCanvas.addAndSelectNewDrawer(serviceDrawer)
  }

  const createNetwork = (): void => {
    const network: INetworkCreate = {
      isExternal: false,
      name: 'Unnamed',
      positionX: 100,
      positionY: 20
    }
    const networkDrawer: TNetworkDrawer = NetworkDrawer(network, EventsCanvas.context!)
    networkDrawer.create()

    EventsCanvas.addAndSelectNewDrawer(networkDrawer)
  }

  const createVolume = (): void => {
    const volume: IVolumeCreate = {
      containerPath: "",
      description: "",
      localPath: "",
      name: 'Unnamed',
      positionX: 100,
      positionY: 20
    }
    const volumeDrawer: TVolumeDrawer = VolumeDrawer(volume, EventsCanvas.context!)
    volumeDrawer.create()

    EventsCanvas.addAndSelectNewDrawer(volumeDrawer)
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

ManagerOrganism.propTypes = {}

export default ManagerOrganism
