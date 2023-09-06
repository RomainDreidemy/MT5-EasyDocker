import React, { type ReactElement } from 'react'

interface ComposeFileModalOrganismProps {
  composeFileData: string
}

const ComposeFileModalOrganism = ({ composeFileData }: ComposeFileModalOrganismProps): ReactElement => {
  return (
    <dialog id="compose_file_modal" className="modal">
      <div className="modal-box">
        <textarea className="h-96 w-full" readOnly defaultValue={composeFileData} />
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default ComposeFileModalOrganism
