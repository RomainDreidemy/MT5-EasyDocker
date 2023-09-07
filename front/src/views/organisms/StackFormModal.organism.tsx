import React, { type Dispatch, type SetStateAction, useState } from 'react'
import { type IStack, type IStackCreate, STACK_STRUCTURE } from '../../interfaces/Stack.interface'
import Input from '../atoms/forms/Input.atom'
import StackEntity from '../../services/entities/Stack.entity'
import useForm from '../../hooks/useForm'
import { type EditorForm } from '../../forms/editor.structure'
import TextArea from '../atoms/forms/TextArea.atom'
import ModalOrganism from './Modal.organism'
import Button from '../atoms/forms/Button.atom'

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

    const { data: stackResponse} =
      isCreating
        ? await StackEntity.create(stackEntityForm)
        : await StackEntity.update(stackEntityForm as IStack)

    toggle()
    const filteredStacks = stacks.filter((s) => s.id !== stackResponse.id)
    
    if (!isCreating) {
      const indexOfEditedStack = stacks.findIndex((s) => s.id === stackResponse.id)
      filteredStacks.splice(indexOfEditedStack, 0, stackResponse)
      setStacks(filteredStacks)
      return
    }

    setStacks([...filteredStacks, stackResponse])
  }

  const buttonText =
    isCreating
      ? 'Create stack +'
      : 'Edit'

  const title = isCreating ? 'Create a new stack' : 'Edit stack'

  return (
    <ModalOrganism toggle={toggle} onSubmit={onSubmit} buttonText={buttonText} title={title}>
      <div className="relative p-6 flex-auto">
        <form>
          <Input
            label="Name"
            type="text"
            name="name"
            className='mb-4'
            value={stackEntityForm.name}
            onChange={onChange}
          />

          <TextArea
            label="Description"
            type="textarea"
            name="description"
            className='h-32'
            value={stackEntityForm.description}
            onChange={onChange}
          />
        </form>
        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
          <Button
            label={buttonText}
            onClick={onSubmit}
            direction={'right'}
          />

          <Button className='btn-ghost ml-4' onClick={toggle} label={'Close'} />
        </div>
      </div>
    </ModalOrganism>
  )
}

export default StackFormModalOrganism
