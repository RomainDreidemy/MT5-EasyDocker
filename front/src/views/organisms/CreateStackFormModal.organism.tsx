import React, { type ReactElement } from 'react'
import { type IStackCreate } from '../../interfaces/Stack.interface'
import StackFormModalOrganism from './StackFormModal.organism'

const CreateStackFormModalOrganism = ({ toggle, onSubmit }: {
  toggle: () => void
  onSubmit: (form: IStackCreate) => Promise<void>
}): ReactElement => {
  return <StackFormModalOrganism
    title='Create a new stack'
    buttonText='Create stack +'
    stack={undefined}
    toggle={toggle}
    onSubmit={onSubmit}
  />
}

export default CreateStackFormModalOrganism
