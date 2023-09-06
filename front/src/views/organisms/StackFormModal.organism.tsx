import React, { type Dispatch, type SetStateAction, useState } from 'react'
import { type IStack, type IStackCreate, STACK_STRUCTURE } from '../../interfaces/Stack.interface'
import Button from '../atoms/forms/Button.atom'
import Input from '../atoms/forms/Input.atom'
import StackEntity from '../../services/entities/Stack.entity'
import useForm from '../../hooks/useForm'
import { type EditorForm } from '../../forms/editor.structure'

const CreateStackModal = ({ stack, stacks, setStacks }: {
  stack?: IStack
  stacks: IStack[]
  setStacks: Dispatch<SetStateAction<IStack[]>>
}): JSX.Element => {
  const [structure] = useState<EditorForm[]>(STACK_STRUCTURE)

  const initialForm: IStackCreate = {
    name: '',
    description: ''
  }

  const { form: StackEntityForm, onChange, validatorsSchema } = useForm<IStackCreate>(stack ?? initialForm, structure)

  const isCreating = stack?.id == null

  const onSubmit = async (): Promise<void> => {
    await validatorsSchema.validate(StackEntityForm)

    const stacksResponse =
      isCreating
        ? await StackEntity.create(StackEntityForm)
        : await StackEntity.update(StackEntityForm as IStack)

    setStacks([...stacks, stacksResponse.data])
  }

  const onDelete = async (): Promise<void> => {
    if (isCreating) return

    await StackEntity.delete(StackEntityForm as IStack)

    const filtered: IStack[] = stacks.filter(s => s.id !== stack.id)

    setStacks(filtered)
  }

  const buttonText =
    isCreating
      ? 'Create stack +'
      : 'Edit'

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
          />

          <Button
            label={buttonText}
            onClick={onSubmit}
            direction={'right'}
          />

          {!isCreating && (<Button
            label={'Delete'}
            onClick={onDelete}
            direction={'left'}
          />)}

          <button className="btn">Close</button>
        </form>
      </div>
    </dialog>
  )
}

export default CreateStackModal
