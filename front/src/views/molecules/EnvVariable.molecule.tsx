import React from 'react'
import { type IServiceEnvVariable, type IServiceEnvVariableCreate } from '../../interfaces/ServiceEnvVariable.interface'
import { type EditorForm } from '../../forms/editor.structure'
import type ServiceEnvVariableEntity from '../../services/entities/ServiceEnvVariable.entity'
import VariableMolecule from './Variable.molecule'
import { type IVariableRequester } from '../../services/entities/ServiceEnvVariable.entity'

const EnvVariableMolecule = (props: {
  fields: EditorForm[]
  variable?: IServiceEnvVariable
  serviceId: string
  addCallback?: (envVariable: IServiceEnvVariable) => void
  deleteCallback?: (envVariable: IServiceEnvVariable) => void
  Requester: IVariableRequester<IServiceEnvVariableCreate, IServiceEnvVariable>
}): JSX.Element => {
  return <VariableMolecule<IServiceEnvVariableCreate, IServiceEnvVariable> {...props} />
}

export default EnvVariableMolecule
