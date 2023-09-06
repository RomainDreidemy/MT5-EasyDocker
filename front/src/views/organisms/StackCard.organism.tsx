import React from 'react'
import { Link } from 'react-router-dom'
import { type IStack } from '../../interfaces/Stack.interface'
import Button from '../atoms/forms/Button.atom'

const StackCardOrganism = ({ stack, id, name, description, onEdit }: {
  stack: IStack
  id: number
  name: string
  description: string
  onEdit: (stack: IStack) => void
}): JSX.Element => {
  return (
    <div className="card shadow-md mb-2 rounded border border-blue-100 hover:border-blue-200">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="truncate">{description}</p>
      </div>

      <Link to={`/stacks/${id}`} key={id}>
        <Button label="View" variant="ghost" />
      </Link>

      <Button label="Edit" variant="ghost" onClick={() => { onEdit(stack) }} />
    </div>
  )
}

export default StackCardOrganism
