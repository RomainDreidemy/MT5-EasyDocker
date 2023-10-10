import React, { type ChangeEvent, useEffect } from 'react'
import Input from '../../atoms/forms/Input.atom'
import { type IService } from '../../../interfaces/Service.interface'
import { type TEditor } from '../../../types/board/drawer/Common.bases'
import { type TEntity } from '../../../types/Entity'
import { type EditorForm } from '../../../forms/editor.structure'
import { string } from 'yup'
import Radio from '../../atoms/forms/RadioButton.atom'
import useToggle from '../../../hooks/useToggle'
import { Errors } from '../../../enums/errors'

export enum TypeList {
  TEXT = 'text',
  CHECKBOX = 'checkbox',
  NUMBER = 'number',
  FILE = 'file',
  CUSTOM = 'custom',
}

const isDefined = (value: string): boolean =>
  value !== undefined && value !== null && value !== ''

const keys = (fields: EditorForm[]): string[] => fields.map((field) => field.key)

const LOCAL_RADIO_NAME: string = 'local'
const REMOTE_RADIO_NAME: string = 'remote'

const LocalisationFormOrganism = ({ entityForm: serviceForm, onChange, onForm }: {
  entityForm: IService
  onChange: TEditor<TEntity>['onChange']
  onForm: TEditor<TEntity>['onForm']
}): JSX.Element => {
  const [hasSelectedRemote, toggleSelectedRemote] = useToggle(
    isDefined(serviceForm.dockerImage) && isDefined(serviceForm.dockerTag)
  )

  const [hasSelectedLocal, toggleSelectedLocal] = useToggle(
    isDefined(serviceForm.context) && isDefined(serviceForm.dockerFile)
  )

  const isEmptyFields = !hasSelectedRemote && !hasSelectedLocal

  const remoteFieldsDisabled = hasSelectedLocal || isEmptyFields
  const REMOTE_FIELDS: EditorForm[] = [
    {
      label: 'Docker image',
      key: 'dockerImage',
      type: TypeList.TEXT,
      component: Input,
      validator: string().nullable(),
      disabled: remoteFieldsDisabled
    },
    {
      label: 'Docker tag',
      key: 'dockerTag',
      type: TypeList.TEXT,
      component: Input,
      validator: string().nullable(),
      disabled: remoteFieldsDisabled
    }
  ]

  const localFieldsDisabled = hasSelectedRemote || isEmptyFields
  const LOCAL_FIELDS: EditorForm[] = [
    {
      label: 'Context',
      key: 'context',
      type: TypeList.TEXT,
      component: Input,
      validator: string().nullable(),
      disabled: localFieldsDisabled
    },
    {
      label: 'Docker file',
      key: 'dockerFile',
      type: TypeList.TEXT,
      component: Input,
      validator: string().nullable(),
      disabled: localFieldsDisabled
    }
  ]

  const LOCALISATION_FIELDS: EditorForm[][] = [
    REMOTE_FIELDS,
    LOCAL_FIELDS
  ]

  useEffect(() => {
    console.log('--- local')
    console.log({ hasSelectedLocal })
    console.log(serviceForm.dockerImage, serviceForm.dockerTag)
    console.log(isDefined(serviceForm.dockerImage), isDefined(serviceForm.dockerTag))

    console.log('--- remote')
    console.log({ hasSelectedRemote })
    console.log(serviceForm.context, serviceForm.dockerFile)
    console.log(isDefined(serviceForm.context), isDefined(serviceForm.dockerFile))
  }, [])

  const onKeyFormReset = (key: keyof TEntity): void => {
    serviceForm[key] = ''
  }

  const emptyFieldsRadioSelection = (name: string): void => {
    if (name === 'local') {
      toggleSelectedLocal()
    } else if (name === 'remote') {
      toggleSelectedRemote()
    } else {
      throw new Error(Errors.NOT_IMPLEMENTED)
    }
  }

  const onEntityRadioChange = (name: string): void => {
    if (name === 'local') {
      keys(REMOTE_FIELDS).forEach((key) => {
        onKeyFormReset(key as keyof TEntity)
      })
    } else if (name === 'remote') {
      keys(LOCAL_FIELDS).forEach((key) => {
        onKeyFormReset(key as keyof TEntity)
      })
    } else {
      throw new Error(Errors.NOT_IMPLEMENTED)
    }

    toggleSelectedRemote()
    toggleSelectedLocal()
    onForm({ ...serviceForm })
  }

  const onRadioChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target

    if (value !== 'on') return

    if (isEmptyFields) {
      emptyFieldsRadioSelection(name)
    } else {
      onEntityRadioChange(name)
    }
  }

  const generateFields = (fields: EditorForm[]): JSX.Element[] => {
    return fields.map((field, index) => {
      const Component = field.component
      const value = serviceForm[field.key as keyof TEntity]

      return (
        <Component
          label={field.label}
          type={field.type}
          name={field.key}
          maxLength={field.maxLength}
          entity={serviceForm}
          value={value}
          disabled={field.disabled}
          onChange={onChange}
          key={index}
        />)
    })
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap -mx-2 p-2 ">
        <div className="w-1/2">
          <Radio label="Remote" value={hasSelectedRemote} onChange={onRadioChange} name={REMOTE_RADIO_NAME}/>
        </div>
        <div className="w-1/2">
          <Radio label="Local" value={hasSelectedLocal} onChange={onRadioChange} name={LOCAL_RADIO_NAME}/>
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
