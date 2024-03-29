import React, { useState } from 'react'
import EntityButtonAtom from '../atoms/forms/EntityButton.atom'
import { DrawerTypes } from '../../enums/DrawerTypes'
import useDrawerManager from '../../hooks/useDrawerManager'
import Button from '../atoms/forms/Button.atom'
import BoardEntity from '../../services/entities/Board.entity'
import ComposeFileModalOrganism from './ComposeFileModal.organism'
import useToggle from '../../hooks/useToggle'

const ManagerOrganism = ({ stackId }: { stackId: string }): JSX.Element => {
  const { createEntityAndDraw, loading } = useDrawerManager(stackId)
  const [composeFileData, setComposeFileData] = useState<string>('')
  const [open, toggle] = useToggle()

  const createService = async (): Promise<void> => {
    await createEntityAndDraw(DrawerTypes.SERVICE)
  }
  const createNetwork = async (): Promise<void> => {
    await createEntityAndDraw(DrawerTypes.NETWORK)
  }
  const createVolume = async (): Promise<void> => {
    await createEntityAndDraw(DrawerTypes.VOLUME)
  }

  const openModal = (): void => {
    toggle()
  }

  const generateYaml = async (): Promise<void> => {
    try {
      const { data: yaml } = await BoardEntity.generateComposeFile(stackId)
      setComposeFileData(yaml)
      openModal()
    } catch (e: any) {
      console.error(e)
    }
  }

  return (
    <div className="w-full h-full border-l-2 flex flex-col">
      <div className="h-[70px] border-b-2 p-2 flex items-center justify-between">
        <h2>
          <strong>Manager</strong>
        </h2>
      </div>

        <EntityButtonAtom name="Service" onClick={createService} disabled={loading}/>
        <EntityButtonAtom name="Network" onClick={createNetwork} disabled={loading}/>
        <EntityButtonAtom name="Volume" onClick={createVolume} disabled={loading}/>

        <div className='mt-auto mb-4 flex justify-center'>
          <Button label={'Generate yaml file'} className='w-auto' variant='ghost' onClick={async () => { await generateYaml() }}/>
        </div>

        {open && <ComposeFileModalOrganism composeFileData={composeFileData} toggle={toggle} />}
    </div>
  )
}

export default ManagerOrganism
