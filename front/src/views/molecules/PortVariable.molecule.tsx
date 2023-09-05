import React from 'react'
import { type EditorForm } from '../../forms/editor.structure'
import VariableMolecule from './Variable.molecule'
import { type IVariableRequester } from '../../services/entities/ServiceEnvVariable.entity'
import { type IServicePortVariable, type IServicePortVariableCreate } from '../../interfaces/ServicePort.interface'

const PortVariableMolecule = (props: {
  fields: EditorForm[]
  variable?: IServicePortVariable
  serviceId: string
  addCallback?: (envVariable: IServicePortVariable) => void
  deleteCallback?: (envVariable: IServicePortVariable) => void
  Requester: IVariableRequester<IServicePortVariableCreate, IServicePortVariable>
}): JSX.Element => {
  return <VariableMolecule<IServicePortVariableCreate, IServicePortVariable> {...props} />
}
export default PortVariableMolecule
