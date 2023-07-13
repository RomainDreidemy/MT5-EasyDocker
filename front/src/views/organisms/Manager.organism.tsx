import React from 'react'
import ServiceDrawer from '../../services/board/drawer/Service.drawer'
import EventsCanvas from '../../services/canvas/Events.canvas'
import { type TServiceDrawer } from '../../types/board/drawer/Service.drawer'
import { type IService, type IServiceCreate } from '../../interfaces/Service.interface'
import EntityButtonAtom from '../atoms/Forms/EntityButton.atom'

const ManagerOrganism = (): JSX.Element => {
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

  return (
    <div className="w-full h-full border-l-2 ">
      <div className="h-[70px] border-b-2 p-2 flex flex items-center justify-between">
        <h2>
          <strong>Manager</strong>
        </h2>
      </div>

      <EntityButtonAtom name="Service" onClick={createService}/>
      <EntityButtonAtom name="Network" onClick={createService}/>
      <EntityButtonAtom name="Volume" onClick={createService}/>

    </div>
  )
}

ManagerOrganism.propTypes = {}

export default ManagerOrganism
