import React, { useState } from 'react'
import { type IStack, type IStackCreate, STACK_STRUCTURE } from '../../interfaces/Stack.interface'
import Input from '../atoms/forms/Input.atom'
import useForm from '../../hooks/useForm'
import { type EditorForm } from '../../forms/editor.structure'
import TextArea from '../atoms/forms/TextArea.atom'
import ModalOrganism from './Modal.organism'

const StackFormModalOrganism = ({ title, buttonText, stack, toggle, onSubmit }: {
  title: string
  buttonText: string
  toggle: () => void
  stack?: IStack
  onSubmit: (form: IStackCreate) => Promise<void>
}): JSX.Element => {
  const [structure] = useState<EditorForm[]>(STACK_STRUCTURE)

  const initialForm: IStackCreate = {
    name: '',
    description: '',
    file: null
  }

  const { form: stackEntityForm, onChange, validatorsSchema } = useForm<IStackCreate>(stack ?? initialForm, structure)

  const onSubmitWithValidation = async (): Promise<void> => {
    await validatorsSchema.validate(stackEntityForm)

    await onSubmit(stackEntityForm)
  }

  return (
    <ModalOrganism toggle={toggle} onSubmit={onSubmitWithValidation} buttonText={buttonText} title={title}>
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

          <input type="file" name="file" id="file" className="inputfile" onChange={onChange} />
        </form>
      </div>
    </ModalOrganism>
  )
}

export default StackFormModalOrganism
