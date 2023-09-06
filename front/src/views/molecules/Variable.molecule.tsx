import React from 'react'
import useForm from '../../hooks/useForm'
import { type EditorForm } from '../../forms/editor.structure'
import Button from '../atoms/forms/Button.atom'
import { GoPencil } from 'react-icons/go'
import type { IVariableRequester } from '../../services/entities/ServiceEnvVariable.entity'
import { AiOutlineDelete } from 'react-icons/ai'
import { type IVariableMolecule } from '../../hooks/useEnvVariablesEditor'

function VariableMolecule<ICreate, IEntity> ({ variable, serviceId, addCallback, deleteCallback, fields, Requester }:
IVariableMolecule<ICreate, IEntity>): JSX.Element {
  console.log(fields)
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

  const isCreating: boolean = variable?.id == null

  const buttonText =
    isCreating ? 'Add' : <GoPencil size={15}/>

  const onSubmit = async (): Promise<void> => {
    try {
      await validatorsSchema.validate(form)

      const response =
        isCreating
          ? await Requester.create(serviceId, form as ICreate)
          : await Requester.update(form as IEntity)

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

      await Requester.delete(variable!.id!)

      if (deleteCallback == null) return

      deleteCallback(variable as IEntity)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {fields.map((field, index) => {
        const Component = field.component
        const value = form[field.key]

        return (
          <div className="w-1/3 flex items-center" key={index}>
            <div className="mr-1">
              <Component
                type={field.type}
                name={field.key}
                value={value}
                onChange={onChange}
              />
            </div>
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

export default VariableMolecule
