import React from 'react'
import Button from '../atoms/forms/Button.atom'
import { type TEntity } from '../../types/Entity'
import type useDrawerEditor from '../../hooks/useDrawerEditor'
import type useLinkerEditor from '../../hooks/useLinkerEditor'
import { type TLinkEntity } from '../../types/Linker'

const EditorOrganism = ({ entity, stackId, useEditor }: {
  entity: any
  stackId: string
  useEditor: typeof useDrawerEditor | typeof useLinkerEditor
}): JSX.Element => {
  const { fields, onSubmit, onChange, entityForm, onDelete, onClose } = useEditor(entity, stackId)

  return (
    <div className="w-full h-full border-l-2 bg-white">
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
          const value = entityForm[field.key as keyof TEntity & keyof TLinkEntity]

          return (
            <Component
              key={index}
              label={field.label}
              type={field.type}
              name={field.key}
              entity={entity}
              value={value}
              onChange={onChange}
            />)
        })}

        <div className="mt-5">
          <Button
            label="Update"
            onClick={onSubmit}
            className="w-full"
          />

          {(onDelete != null) && (<Button
            label="Delete"
            onClick={onDelete}
            className="w-full bg-red-500 hover:bg-red-700 border border-red-500 text-white font-bold py-2 px-4 mt-5"
          />)}
        </div>

      </form>
    </div>
  )
}

export default EditorOrganism
