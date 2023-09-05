import React from 'react'
import { type IServiceEnvVariable, type IServiceEnvVariableCreate } from '../../interfaces/ServiceEnvVariable.interface'
import useForm from '../../hooks/useForm'
import { type EditorForm } from '../../forms/editor.structure'
import Button from '../atoms/forms/Button.atom'
import { GoPencil } from 'react-icons/go'
import type ServiceEnvVariableEntity from '../../services/entities/ServiceEnvVariable.entity'
import { AiOutlineDelete } from 'react-icons/ai'

const EnvVariableMolecule = ({ variable, serviceId, addCallback, deleteCallback, fields, Requester }: {
  fields: EditorForm[]
  variable?: IServiceEnvVariable
  serviceId: string
  addCallback?: (envVariable: IServiceEnvVariable) => void
  deleteCallback?: (envVariable: IServiceEnvVariable) => void
  Requester: typeof ServiceEnvVariableEntity
}): JSX.Element => {
  const keyList =
    fields.map(({ key }) => ({ [key]: '' }))
  const initialForm = keyList.reduce((result, currentObj) => {
    return { ...result, ...currentObj }
  }, {})

  const {
    form,
    setForm,
    onChange,
    validatorsSchema
  } = useForm(variable ?? initialForm, fields)

  const isCreating = variable?.id == null

  const buttonText =
    isCreating ? 'Add' : <GoPencil size={15}/>

  const onSubmit = async (): Promise<void> => {
    try {
      await validatorsSchema.validate(form)

      const response =
        isCreating
          ? await Requester.create(serviceId, form as IServiceEnvVariableCreate)
          : await Requester.update(form as IServiceEnvVariable)

      const { data: variable } = response

      if (isCreating && (addCallback != null)) {
        addCallback(variable)
        setForm(initialForm)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const onDelete = async (): Promise<any> => {
    try {
      if (isCreating) return

      await Requester.delete(variable.id)

      if (deleteCallback == null) return

      deleteCallback(variable)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {fields.map((field, index) => {
        const Component = field.component
        const value = form[field.key as keyof IServiceEnvVariable & keyof IServiceEnvVariableCreate]

        return (
          <div className="w-1/3 flex items-center" key={index}>
            <div className="mr-1">
              <Component
                type={field.type}
                name={field.key}
                value={value}
                onChange={onChange}
              /></div>
          </div>)
      })}

      <div className="w-1/3 flex items-center">
        <div className="flex">
          <Button label={buttonText} onClick={onSubmit} variant="ghost"/>
          {!isCreating && (<Button label={<AiOutlineDelete size={15}/>} onClick={onDelete} variant="ghost"/>)}
        </div>
      </div>
    </>
  )
}

export default EnvVariableMolecule
