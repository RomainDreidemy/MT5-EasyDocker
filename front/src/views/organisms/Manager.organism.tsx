import React from 'react'
import EntityButtonAtom from '../atoms/forms/EntityButton.atom'
import { DrawerTypes } from '../../enums/DrawerTypes'
import useDrawerManager from '../../hooks/useDrawerManager'

const ManagerOrganism = ({ stackId }: { stackId: string }): JSX.Element => {
  const { createEntityAndDraw, loading } = useDrawerManager(stackId)

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

      <EntityButtonAtom name="Service" onClick={createService} disabled={loading}/>
      <EntityButtonAtom name="Network" onClick={createNetwork} disabled={loading}/>
      <EntityButtonAtom name="Volume" onClick={createVolume} disabled={loading}/>

    </div>
  )
}

export default ManagerOrganism
