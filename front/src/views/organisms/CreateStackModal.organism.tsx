import React, { useState } from "react";
import { object, string } from 'yup'
import { IStackEntity } from '../../interfaces/Stack.interface'
import Button from '../atoms/forms/Button.atom'
import Input from '../atoms/forms/Input.atom'
import { BiRightArrowAlt } from 'react-icons/bi'
import { validateSchema } from '../../services/utils/validation.util'
import StackEntity from '../../services/entities/Stack.entity'
import { IStack } from "../../interfaces/Stack.interface";

const CreateStackModal = (stacks, setStacks):JSX.Element => {
  const [form, setForm] = useState<IStackEntity>({ name: '', description: '' })

  const stackSchema = object({
    name: string().required(),
    description: string().nullable(),
  })

  const changeValue = (e: React.ChangeEvent<any>): void => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const createStack = async (): Promise<void> => {
    const isSchemaValid = (await validateSchema(stackSchema, form))
    if (!isSchemaValid) return

    try {
      const stacksResponse = await StackEntity.createStack(form)

       setStacks((stacks:IStack[]) => [...stacks, stacksResponse.data])

    } catch (e: any) {
      // setStatus({ ...status, errors: [{ path: e.response.data.status, message: e.response.data.message }] })
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
          onChange={(e) => {
            changeValue(e)
          }}
        />

        <Input
          label="Description"
          type="textarea"
          name="description"
          onChange={(e) => {
            changeValue(e)
          }}
          onKeyDown={async (e) => await (e.key === 'Enter' && createStack())}
        />

        <Button
          label={'Create stack +'}
          onClick={async () => { createStack() }}
          direction={'right'}
        />
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
  </div>
</dialog>
  )
}

export default CreateStackModal
