import React, { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { type IServiceEnvVariable, type IServiceEnvVariableCreate } from '../../interfaces/ServiceEnvVariable.interface'
import Input from '../atoms/forms/Input.atom'
import useForm from '../../hooks/useForm'
import { string } from 'yup'
import { type EditorForm, TypeList } from '../../forms/editor.structure'
import Button from '../atoms/forms/Button.atom'
import { GoPencil } from 'react-icons/go'
import ServiceEnvVariableEntity from '../../services/entities/ServiceEnvVariable.entity'
import { AiOutlineDelete } from 'react-icons/ai'

const EnvVariableMolecule = ({ envVariable, serviceId, addCallback, deleteCallback }: {
  envVariable?: IServiceEnvVariable
  serviceId: string
  addCallback?: (envVariable: IServiceEnvVariable) => void
  deleteCallback?: (envVariable: IServiceEnvVariable) => void
}): JSX.Element => {
  const fields: EditorForm[] = [
    {
      label: 'Key',
      key: 'key',
      type: TypeList.TEXT,
      component: Input,
      validator: string().nullable()
    },
    {
      label: 'Value',
      key: 'value',
      type: TypeList.TEXT,
      component: Input,
      validator: string().nullable()
    }
  ]

  const initialForm = {
    key: '',
    value: ''
  }

  const {
    form,
    setForm,
    onChange,
    validatorsSchema
  } = useForm<IServiceEnvVariable | IServiceEnvVariableCreate>(envVariable ?? initialForm, fields)

  const isCreating = envVariable?.id == null

  const buttonText =
    isCreating ? 'Add' : <GoPencil/>

  const onSubmit = async (): Promise<void> => {
    try {
      await validatorsSchema.validate(form)

      const response =
        isCreating
          ? await ServiceEnvVariableEntity.create(serviceId, form as IServiceEnvVariableCreate)
          : await ServiceEnvVariableEntity.update(form as IServiceEnvVariable)

      const { data: envVariable } = response

      if (isCreating && (addCallback != null)) {
        addCallback(envVariable)
        setForm(initialForm)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const onDelete = async (): Promise<any> => {
    try {
      if (isCreating) return

      await ServiceEnvVariableEntity.delete(envVariable.id)

      if (deleteCallback == null) return

      deleteCallback(envVariable)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <article className="flex">

      {fields.map((field, index) => {
        const Component = field.component
        const value =
          (form != null)
            ? form[field.key as keyof IServiceEnvVariable & keyof IServiceEnvVariableCreate]
            : ''

        return (
          <Component
            key={index}
            type={field.type}
            name={field.key}
            value={value}
            onChange={onChange}
          />)
      })}
      <Button label={buttonText} onClick={onSubmit} variant="ghost"/>
      {!isCreating && (<Button label={<AiOutlineDelete />} onClick={onDelete} variant="ghost"/>)}
    </article>
  )
}

export default EnvVariableMolecule
