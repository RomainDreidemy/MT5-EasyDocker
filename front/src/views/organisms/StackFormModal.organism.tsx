import React, { type Dispatch, type SetStateAction, useState } from 'react'
import { type IStack, type IStackCreate, STACK_STRUCTURE } from '../../interfaces/Stack.interface'
import Button from '../atoms/forms/Button.atom'
import Input from '../atoms/forms/Input.atom'
import StackEntity from '../../services/entities/Stack.entity'
import useForm from '../../hooks/useForm'
import { type EditorForm } from '../../forms/editor.structure'
import TextArea from '../atoms/forms/TextArea.atom'

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

  const onDelete = async (): Promise<void> => {
    if (isCreating) return

    console.log(stackEntityForm)
    await StackEntity.delete(stackEntityForm as IStack)

    const filtered: IStack[] = stacks.filter(s => s.id !== stack.id)

    setStacks(filtered)
  }

  const buttonText =
    isCreating
      ? 'Create stack +'
      : 'Edit'

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-96 my-6 mx-auto max-w-3xl">
          {/* content */}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* header */}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                Create a new stack
              </h3>
            </div>
            {/* body */}
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
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
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
              <Button className='btn-ghost ml-4' onClick={toggle} label={'Close'} />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default StackFormModalOrganism
