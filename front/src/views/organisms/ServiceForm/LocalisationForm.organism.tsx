import React from 'react'
import Input from '../../atoms/forms/Input.atom'
import { type IService } from '../../../interfaces/Service.interface'
import { type TEditor } from '../../../types/board/drawer/Common.bases'
import { type TEntity } from '../../../types/Entity'
import { type EditorForm, TypeList } from '../../../forms/editor.structure'
import { string } from 'yup'
import Radio from '../../atoms/forms/RadioButton.atom'
import useToggle from '../../../hooks/useToggle'
import { type TOnChange } from '../../../interfaces/Forms/Input.interface'

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

  const REMOTE_FIELDS: EditorForm[] = [
    {
      label: 'Docker image',
      key: 'dockerImage',
      type: TypeList.TEXT,
      component: Input,
      validator: string().nullable(),
      disabled: serviceForm.imageSelectionType !== REMOTE_RADIO_NAME
    },
    {
      label: 'Docker tag',
      key: 'dockerTag',
      type: TypeList.TEXT,
      component: Input,
      validator: string().nullable(),
      disabled: serviceForm.imageSelectionType !== REMOTE_RADIO_NAME
    }
  ]

  const LOCAL_FIELDS: EditorForm[] = [
    {
      label: 'Context',
      key: 'context',
      type: TypeList.TEXT,
      component: Input,
      validator: string().nullable(),
      disabled: serviceForm.imageSelectionType !== LOCAL_RADIO_NAME
    },
    {
      label: 'Docker file',
      key: 'dockerFile',
      type: TypeList.TEXT,
      component: Input,
      validator: string().nullable(),
      disabled: serviceForm.imageSelectionType !== LOCAL_RADIO_NAME
    }
  ]

  const LOCALISATION_FIELDS: EditorForm[][] = [
    REMOTE_FIELDS,
    LOCAL_FIELDS
  ]

  const onRadioChange = (event: TOnChange): void => {
    event.target.value = event.target.name
    event.target.name = 'imageSelectionType'
    onChange(event)
  }

  const generateFields = (fields: EditorForm[]): JSX.Element[] => {
    return fields.map((field, index) => {
      const Component = field.component
      const value = serviceForm[field.key as keyof TEntity]

      return (
        <div className="mt-2" key={index}>
          <Component
            label={field.label}
            type={field.type}
            name={field.key}
            maxLength={field.maxLength}
            entity={serviceForm}
            value={value}
            disabled={field.disabled}
            onChange={onChange}
          />
        </div>)
    })
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap -mx-2 p-2 ">
        <div className="w-1/2">
          <Radio label="Remote" value={serviceForm.imageSelectionType === 'remote'} onChange={onRadioChange} name={REMOTE_RADIO_NAME}/>
        </div>
        <div className="w-1/2">
          <Radio label="Local" value={serviceForm.imageSelectionType === 'local'} onChange={onRadioChange} name={LOCAL_RADIO_NAME}/>
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
