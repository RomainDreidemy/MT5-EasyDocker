import React from 'react'
import {
  type IServiceEnvVariable,
  type IServiceEnvVariableCreate
} from '../../../interfaces/ServiceVariable/EnvVariable.interface'
import VariableMolecule from './Variable.molecule'
import { type IVariableMolecule } from '../../../interfaces/VariableConfig.interface'

const EnvVariableMolecule = (props: IVariableMolecule<IServiceEnvVariableCreate, IServiceEnvVariable>): JSX.Element => {
  return <VariableMolecule<IServiceEnvVariable, IServiceEnvVariableCreate> {...props} />
}

export default EnvVariableMolecule
