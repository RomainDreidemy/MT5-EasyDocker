import React from 'react'
import VariableMolecule from './Variable.molecule'
import { type IServicePortVariable, type IServicePortVariableCreate } from '../../../interfaces/ServiceVariable/Port.interface'
import { type IVariableMolecule } from '../../../interfaces/VariableConfig.interface'

const PortVariableMolecule = (props: IVariableMolecule<IServicePortVariableCreate, IServicePortVariable>): JSX.Element => {
  return <VariableMolecule<IServicePortVariable, IServicePortVariableCreate> {...props} />
}
export default PortVariableMolecule
