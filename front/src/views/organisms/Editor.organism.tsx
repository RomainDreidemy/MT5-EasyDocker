import React from 'react'
import Button from '../atoms/forms/Button.atom'
import { type TEntity } from '../../types/Entity'
import type useDrawerEditor from '../../hooks/useDrawerEditor'
import type useLinkerEditor from '../../hooks/useLinkerEditor'
import { type TLinkEntity } from '../../types/Linker'
import { AiOutlineClose } from 'react-icons/ai'

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
          icon={<AiOutlineClose/>}
          variant={'ghost'}
          onClick={onClose}
        />
      </div>

      <form className="p-2" onSubmit={onSubmit}>

        {fields.map((field, index) => {
          const Component = field.component
          const value = entityForm[field.key as keyof TEntity & keyof TLinkEntity]

          return (
            <div className="mt-2" key={index}>
              <Component
                label={field.label}
                type={field.type}
                name={field.key}
                entity={entity}
                value={value}
                onChange={onChange}
              />
            </div>)
        })}

        <hr/>

        <div className="mt-5 w-full flex space-x-4">
          <Button
            label="Update"
            onClick={onSubmit}
            className="flex-grow"
          />

          {(onDelete != null) && (<Button
            label="Delete"
            onClick={onDelete}
            className="flex-grow bg-red-500 hover:bg-red-700 border border-red-500 text-white font-bold"
          />)}
        </div>

      </form>
    </div>
  )
}

export default EditorOrganism
