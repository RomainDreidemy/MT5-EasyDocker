import React, { type ReactElement } from 'react'
import ModalOrganism from './Modal.organism'
import Button from '../atoms/forms/Button.atom'
import useDownload from '../../hooks/useDownload'

interface ComposeFileModalOrganismProps {
  toggle: () => void
  composeFileData: string
}

const ComposeFileModalOrganism = ({ toggle, composeFileData }: ComposeFileModalOrganismProps): ReactElement => {
  const { onDownload } = useDownload(composeFileData)

  const onDownloadClick = (): void => {
    onDownload('docker-compose', 'yml')
  }

  return (
    <ModalOrganism toggle={toggle}>
        <textarea className="h-96 w-full" readOnly value={composeFileData} />

        <Button label={'Download'} className='w-auto' variant='ghost' onClick={onDownloadClick}/>
    </ModalOrganism>
  )
}

export default ComposeFileModalOrganism
