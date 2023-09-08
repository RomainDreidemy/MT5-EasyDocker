import React from 'react'
import { Link } from 'react-router-dom'
import { type IStack } from '../../interfaces/Stack.interface'
import Button from '../atoms/forms/Button.atom'
import { BiTrash, BiEdit, BiCopy } from 'react-icons/bi'

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
    <div className="card shadow-md mb-2 rounded border border-blue-100 hover:border-blue-200">
      <Link to={`/stacks/${id}`} key={id}>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p className="truncate">{description}</p>
        </div>
      </Link>
      <div className="card-actions justify-end">
        <Button className="btn-ghost" icon={<BiTrash/>} onClick={() => { onDelete(id) }} />

        <Button className="btn-ghost" icon={<BiEdit/>} onClick={() => { onEdit(stack) }} />

        <Button className="btn-ghost" icon={<BiCopy/>} onClick={() => { onDuplicate(id) }} />
      </div>
    </div>
  )
}

export default StackCardOrganism
