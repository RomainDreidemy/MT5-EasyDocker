import React from 'react'
import useForm from '../../../hooks/useForm'
import Button from '../../atoms/forms/Button.atom'
import { GoPencil } from 'react-icons/go'
import { AiOutlineDelete } from 'react-icons/ai'
import {
  type IServicePortVariable,
  type IServicePortVariableCreate
} from '../../../interfaces/ServiceVariable/Port.interface'
import {
  type IServiceEnvVariable,
  type IServiceEnvVariableCreate
} from '../../../interfaces/ServiceVariable/EnvVariable.interface'
import { type IVariableMolecule } from '../../../interfaces/VariableConfig.interface'
import { type IServiceVolume, type IServiceVolumeCreate } from '../../../interfaces/ServiceVariable/Volume.interface'
import { TypeList } from '../../../forms/editor.structure'

function VariableMolecule<
  IVariable extends IServicePortVariable | IServiceEnvVariable | IServiceVolume,
  IVariableCreate extends IServicePortVariableCreate | IServiceEnvVariableCreate | IServiceVolumeCreate
> ({ variable, serviceId, addCallback, deleteCallback, onDrawerUpdate, fields, Requester }:
IVariableMolecule<IVariableCreate, IVariable>): JSX.Element {
  const defaultByType = {
    [TypeList.TEXT]: '',
    [TypeList.NUMBER]: 0,
    [TypeList.CUSTOM]: undefined,
    [TypeList.CHECKBOX]: undefined,
    [TypeList.FILE]: undefined
  }

  const keyList = fields.map(({ key, type }) => ({ [key]: defaultByType[type] }))
  const initialForm = Object.assign({}, ...keyList)

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
          ? await Requester.create(serviceId, form as IVariableCreate)
          : await Requester.update(form as IVariable)

      const { data: variable } = response

      if (isCreating && (addCallback != null)) {
        addCallback(variable)

        setForm(initialForm)
      }

      onDrawerUpdate()
    } catch (err) {
      console.error(err)
    }
  }

  const onDelete = async (): Promise<any> => {
    try {
      if (isCreating) return

      await Requester.delete(variable!.id)
      onDrawerUpdate()

      if (deleteCallback == null) return

      deleteCallback(variable as IVariable)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {fields.map((field, index) => {
        const Component = field.component
        const value = form[field.key as keyof IVariable]

        return (
          <div className="w-1/3 flex items-center" key={index}>
            <div className="mr-1">
              <Component
                type={field.type}
                name={field.key}
                placeholder={field.label}
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
