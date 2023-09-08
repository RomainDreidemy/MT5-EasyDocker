import React, { type ReactElement } from 'react'
import { type IStack, type IStackCreate } from '../../interfaces/Stack.interface'
import StackFormModalOrganism from './StackFormModal.organism'

const EditStackFormModalOrganism = ({ stack, toggle, onSubmit }: {
  stack: IStack | undefined
  toggle: () => void
  onSubmit: (form: IStackCreate) => Promise<void>
}): ReactElement => {
  return <StackFormModalOrganism
    title="Edit stack"
    buttonText="Edit"
    stack={stack}
    toggle={toggle}
    onSubmit={onSubmit}
  />
}

export default EditStackFormModalOrganism
