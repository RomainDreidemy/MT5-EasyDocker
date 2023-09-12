import React, { type ReactElement } from 'react'
import ModalOrganism from './Modal.organism'
import Button from '../atoms/forms/Button.atom'
import useDownload from '../../hooks/useDownload'
import { AiOutlineCopy, AiOutlineDownload } from 'react-icons/ai'

interface ComposeFileModalOrganismProps {
  toggle: () => void
  composeFileData: string
}

const ComposeFileModalOrganism = ({ toggle, composeFileData }: ComposeFileModalOrganismProps): ReactElement => {
  const { onDownload } = useDownload(composeFileData)

  const onDownloadClick = (): void => {
    onDownload('docker-compose', 'yml')
  }

  const onCopyClick = async (): Promise<void> => {
    await navigator.clipboard.writeText(composeFileData)
  }

  return (
    <ModalOrganism toggle={toggle}>
      <div className="w-full flex justify-around">
        <Button className="btn-ghost" label="Copy" icon={<AiOutlineCopy />} onClick={onCopyClick}/>
        <Button className="btn-ghost" label="Download" icon={<AiOutlineDownload />} onClick={onDownloadClick}/>
      </div>
      <hr/>
      <textarea className="h-96 w-full" readOnly value={composeFileData}/>

    </ModalOrganism>
  )
}

export default ComposeFileModalOrganism
