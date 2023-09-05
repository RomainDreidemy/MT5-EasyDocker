import Input from '../atoms/forms/Input.atom'
import Button from '../atoms/forms/Button.atom'
import React, { useState } from 'react'
import StackEntity from '../../services/entities/Stack.entity'
import { useNavigate } from 'react-router-dom'

const NewStackOrganism = () => {
  const [name, setName] = useState('')

  const navigate = useNavigate()

  const onSubmit = async (): Promise<void> => {
    const { data } = await StackEntity.create(name)
    console.log(data)
    navigate(`/stacks/${data.id}`)
  }

  return (
    <div
      className="card shadow-md mb-2 rounded bg-blue-100 border border-blue-100 hover:border-blue-200">
      <div className="card-body">
        <Input type="text"
               placeholder="Stack name"
               onChange={(e) => { setName(e.target.value) }}
        />
        <Button
          className="bg-transparent text-blue-500 hover:text-white font-bold h-2"
          label="Create a new stack"
          onClick={onSubmit}
        />
      </div>
    </div>
  )
}

export default NewStackOrganism
