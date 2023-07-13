import React, { type ChangeEvent, useState } from 'react'
import useEditor from '../../hooks/useEditor'
import { type TDrawer } from '../../types/Drawer'
import EventsCanvas from '../../services/canvas/Events.canvas'
import Button from '../atoms/Forms/Button.atom'
import { object } from 'yup'
import { type TEntity } from '../../types/Entity'
import { type TOnChange } from '../../interfaces/Forms/Input.interface'

const EditorOrganism = ({ drawer }: { drawer: TDrawer }): JSX.Element => {
  const { fields } = useEditor(drawer)

  const [drawerForm, setDrawerForm] = useState<TEntity>(drawer.entity!)

  const validatorsSchema = object(fields.reduce((acc, field) =>
    ({ [field.name]: field.validator }), {}))

  const changeValue: (event: TOnChange)
  => void =
    (event: TOnChange): void => {
      setDrawerForm({ ...drawerForm, [event.target.name]: event.target.value })
    }

  const onClose = (): void => {
    EventsCanvas.clearSelectedDrawer()
    EventsCanvas.updateScreen()
  }

  const onSubmit = async (): Promise<void> => {
    try {
      console.log(await validatorsSchema.validate(drawerForm))
    } catch (err) {
      console.error(err)
    }
  }

  const isCreating: boolean = drawer?.entity?.id !== null
  const submitText: string = isCreating ? 'Update' : 'Create'

  return (
    <div className="w-full h-full border-l-2 ">
      <div className="h-[70px] border-b-2 p-2 flex flex items-center justify-between">
        <h2><strong>Editor</strong></h2>

        <Button
          className="bg-transparent text-blue-500 hover:text-white font-bold h-2"
          label={'X'}
          onClick={onClose}
        />
      </div>

      <form className="p-2" onSubmit={onSubmit}>

        {fields.map((field, index) => {
          const Component = field.component
          // const value = drawerForm[field.name]

          return (
            <Component
              key={index}
              label={field.label}
              type={field.type}
              name={field.name}
              // value={value}
              onChange={changeValue}
            />)
        })}

        <div className="mt-5">
          <Button
            label={submitText}
            onClick={onSubmit}
            className={'w-full'}
            direction={'right'}
          />
        </div>

      </form>
    </div>
  )
}

export default EditorOrganism
