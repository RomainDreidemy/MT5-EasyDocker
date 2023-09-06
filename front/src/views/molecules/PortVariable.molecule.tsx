import React from 'react'
import VariableMolecule from './Variable.molecule'
import { type IServicePortVariable, type IServicePortVariableCreate } from '../../interfaces/ServicePort.interface'
import { type IVariableMolecule } from '../../hooks/useEnvVariablesEditor'
import { type TServicePortVariable, type TServicePortVariableCreate } from '../../hooks/usePortVariablesEditor'

const PortVariableMolecule = (props: IVariableMolecule<TServicePortVariableCreate, TServicePortVariable>): JSX.Element => {
  return <VariableMolecule<IServicePortVariableCreate, IServicePortVariable> {...props} />
}
export default PortVariableMolecule
