import React from 'react'
import useEditor from '../../hooks/useEditor'
import { type TDrawer } from '../../types/Drawer'
import EventsCanvas from '../../services/canvas/Events.canvas'
import Button from '../atoms/Forms/Button.atom'
import { type TEntity } from '../../types/Entity'

const EditorOrganism = ({ drawer, stackId }: { drawer: TDrawer, stackId: string }): JSX.Element => {
  const { fields, onSubmit, onChange, entityForm } = useEditor(drawer, stackId)

  const submitText: string = drawer.isCreatingEntity() ? 'Create' : 'Update'

  const onClose = (): void => {
    EventsCanvas.clearSelectedDrawer()
    EventsCanvas.updateScreen()
  }

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
          const value = entityForm[field.name as keyof TEntity]

          return (
            <Component
              key={index}
              label={field.label}
              type={field.type}
              name={field.name}
              value={value as string}
              onChange={onChange}
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
