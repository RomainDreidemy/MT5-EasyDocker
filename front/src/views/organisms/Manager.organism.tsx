import React from 'react'
import ServiceDrawer from '../../services/board/drawer/Service.drawer'
import EventsCanvas from '../../services/canvas/Events.canvas'
import { type TServiceDrawer } from '../../types/board/drawer/Service.drawer'
import { type IService } from '../../interfaces/Service.interface'
import EntityButtonAtom from '../atoms/Forms/EntityButton.atom'

const ManagerOrganism = (): JSX.Element => {
  const createService = () => {
    console.log('---')
    const service: IService = { id: 1, positionX: 100, positionY: 20, name: 'Unnamed' }
    const serviceDrawer: TServiceDrawer = ServiceDrawer(service, EventsCanvas.context!)
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
