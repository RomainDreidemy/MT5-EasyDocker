import React from 'react'
import { type IStack } from '../../interfaces/Stack.interface'
import CardOrganism from './Card.organism'

const StackCardOrganism = ({ stack, id, name, description, onEdit, onDelete, onDuplicate }: {
  stack: IStack
  id: string
  name: string
  description: string
  onEdit: (stack: IStack) => void
  onDelete: (id: string) => void
  onDuplicate: (id: string) => void
}): JSX.Element => {
  return (
    <CardOrganism
      id={id}
      name={name}
      description={description}
      linkUrl={'/stacks'}
      isEditable={true}
      onDelete={onDelete}
      onEdit={() => { onEdit(stack) }}
      onDuplicate={onDuplicate}
    />
  )
}

export default StackCardOrganism
