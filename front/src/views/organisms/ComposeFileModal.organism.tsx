import React, { type ReactElement } from 'react'
import ModalOrganism from './Modal.organism'

interface ComposeFileModalOrganismProps {
  toggle: () => void
  composeFileData: string
}

const ComposeFileModalOrganism = ({ toggle, composeFileData }: ComposeFileModalOrganismProps): ReactElement => {
  return (
    <ModalOrganism toggle={toggle}>
        <textarea className="h-96 w-full" readOnly defaultValue={composeFileData} />
    </ModalOrganism>
  )
}

export default ComposeFileModalOrganism
