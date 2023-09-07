import React, { type Dispatch, type SetStateAction, useState } from 'react'
import { type IStack, type IStackCreate, STACK_STRUCTURE } from '../../interfaces/Stack.interface'
import Input from '../atoms/forms/Input.atom'
import StackEntity from '../../services/entities/Stack.entity'
import useForm from '../../hooks/useForm'
import { type EditorForm } from '../../forms/editor.structure'
import TextArea from '../atoms/forms/TextArea.atom'
import ModalOrganism from './Modal.organism'

const StackFormModalOrganism = ({ stack, stacks, setStacks, toggle }: {
  toggle: () => void
  stack?: IStack
  stacks: IStack[]
  setStacks: Dispatch<SetStateAction<IStack[]>>
}): JSX.Element => {
  const [structure] = useState<EditorForm[]>(STACK_STRUCTURE)

  const initialForm: IStackCreate = {
    name: '',
    description: ''
  }

  const { form: stackEntityForm, onChange, validatorsSchema } = useForm<IStackCreate>(stack ?? initialForm, structure)

  const isCreating = stack?.id == null

  const onSubmit = async (): Promise<void> => {
    await validatorsSchema.validate(stackEntityForm)

    const stacksResponse =
      isCreating
        ? await StackEntity.create(stackEntityForm)
        : await StackEntity.update(stackEntityForm as IStack)

    if (!isCreating) return

    setStacks([...stacks, stacksResponse.data])
    toggle()
  }

  const buttonText =
    isCreating
      ? 'Create stack +'
      : 'Edit'

  return (
    <ModalOrganism toggle={toggle} onSubmit={onSubmit} buttonText={buttonText}>
      <div className="relative p-6 flex-auto">
        <form>
          <Input
            label="Name"
            type="text"
            name="name"
            className='mb-4'
            onChange={onChange}
          />

          <TextArea
            label="Description"
            type="textarea"
            name="description"
            className='h-32'
            onChange={onChange}
          />
        </form>
      </div>
    </ModalOrganism>

  )
}

export default StackFormModalOrganism
