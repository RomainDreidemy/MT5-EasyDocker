import React, { useState } from 'react'
import { STACK_STRUCTURE, type IStackCreate } from '../../interfaces/Stack.interface'
import Button from '../atoms/forms/Button.atom'
import Input from '../atoms/forms/Input.atom'
import StackEntity from '../../services/entities/Stack.entity'
import useForm from '../../hooks/useForm'
import { type EditorForm } from '../../forms/editor.structure'

const CreateStackModal = (stacks, setStacks): JSX.Element => {
  const [structure] = useState<EditorForm[]>(STACK_STRUCTURE)
  const { form: StackEntityForm, setForm: setStackEntityForm, onChange, validatorsSchema } = useForm<IStackCreate>(
    {
      name: '',
      description: ''
    }, structure)

  const createStack = async (): Promise<void> => {
    await validatorsSchema.validate(StackEntityForm)

    try {
      const stacksResponse = await StackEntity.create(StackEntityForm)

      setStacks([...stacks, stacksResponse.data])
    } catch (e: any) {
      console.log(e)
    }
  }

  return (
    <dialog id="create_stack_modal" className="modal">
  <div className="modal-box">
    <form method="dialog">
        <Input
          label="Name"
          type="text"
          name="name"
          onChange={onChange}
        />

        <Input
          label="Description"
          type="textarea"
          name="description"
          onChange={onChange}
          onKeyDown={async (e) => await (e.key === 'Enter' && createStack())}
        />

        <Button
          label={'Create stack +'}
          onClick={async () => { createStack() }}
          direction={'right'}
        />
        <button className="btn">Close</button>
      </form>
  </div>
</dialog>
  )
}

export default CreateStackModal
