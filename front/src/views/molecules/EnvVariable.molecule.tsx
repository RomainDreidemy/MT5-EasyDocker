import React from 'react'
import { type IServiceEnvVariable, type IServiceEnvVariableCreate } from '../../interfaces/ServiceEnvVariable.interface'
import { type EditorForm } from '../../forms/editor.structure'
import { type IVariableRequester } from '../../services/entities/ServiceEnvVariable.entity'
import VariableMolecule from './Variable.molecule'
import { type IVariableMolecule } from '../../hooks/useEnvVariablesEditor'

const EnvVariableMolecule = (props: IVariableMolecule<IServiceEnvVariableCreate, IServiceEnvVariable>): JSX.Element => {
  return <VariableMolecule<IServiceEnvVariableCreate, IServiceEnvVariable> {...props} />
}

export default EnvVariableMolecule
