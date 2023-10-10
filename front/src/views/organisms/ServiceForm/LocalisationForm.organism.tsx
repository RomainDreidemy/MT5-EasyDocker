import React, { useEffect } from 'react'
import Radio from '../../atoms/forms/RadioButton.atom'
import Input from '../../atoms/forms/Input.atom'
import { type TDrawer } from '../../../types/Drawer'
import { type IService } from '../../../interfaces/Service.interface'
import { type TEditor } from '../../../types/board/drawer/Common.bases'
import { type TEntity } from '../../../types/Entity'
import { type EditorForm } from '../../../forms/editor.structure'
import { string } from 'yup'

export enum TypeList {
  TEXT = 'text',
  CHECKBOX = 'checkbox',
  NUMBER = 'number',
  FILE = 'file',
  CUSTOM = 'custom',
}

const REMOTE_FIELDS: EditorForm[] = [
  {
    label: 'Docker image',
    key: 'dockerImage',
    type: TypeList.TEXT,
    component: Input,
    validator: string().nullable()
  },
  {
    label: 'Docker tag',
    key: 'dockerTag',
    type: TypeList.TEXT,
    component: Input,
    validator: string().nullable()
  }
]

const LOCAL_FIELDS: EditorForm[] = [
  {
    label: 'Context',
    key: 'context',
    type: TypeList.TEXT,
    component: Input,
    validator: string().nullable()
  },
  {
    label: 'Docker file',
    key: 'dockerFile',
    type: TypeList.TEXT,
    component: Input,
    validator: string().nullable()
  }
]

const LOCALISATION_FIELDS: EditorForm[][] = [
  REMOTE_FIELDS,
  LOCAL_FIELDS
]

const LocalisationFormOrganism = ({ entity: drawer, onChange }: {
  entity: TDrawer
  onChange: TEditor<TEntity>['onChange']
}): JSX.Element => {
  const entity: IService = drawer.entity! as IService

  const hasSelectedRemote = (entity.dockerImage !== '') && (entity.dockerTag !== '')
  const hasSelectedLocal = (entity.context !== '') && (entity.dockerFile !== '')

  const isEmptyFields = !hasSelectedRemote && !hasSelectedLocal

  useEffect(() => {
    // console.log('entity', entity)
    console.log(hasSelectedRemote)
  }, [drawer])

  const generateFields = (fields: EditorForm[]): JSX.Element[] => {
    return fields.map((field, index) => {
      const Component = field.component
      const value = entity[field.key as keyof TEntity]

      return (
        <Component
          label={field.label}
          type={field.type}
          name={field.key}
          maxLength={field.maxLength}
          entity={entity}
          value={value}
          onChange={onChange}
          key={index}
        />)
    })
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap -mx-2 p-2 ">
        <div className="w-1/2">
          <Radio label="Remote" value={isEmptyFields && hasSelectedRemote} name="remote"/>
        </div>
        <div className="w-1/2">
          <Radio label="Local" value={isEmptyFields && !hasSelectedLocal} name="local"/>
        </div>

        {LOCALISATION_FIELDS.map((editor, index) => {
          return (
            <div className="w-1/2 flex items-center" key={index}>
              <div className="mr-1">
                {generateFields(editor)}
              </div>
            </div>)
        })}
      </div>
    </div>
  )
}

export default LocalisationFormOrganism
