import React from 'react'
import VariableMolecule from './Variable.molecule'
import { type IVariableMolecule } from '../../../interfaces/VariableConfig.interface'
import { type IServiceVolume, type IServiceVolumeCreate } from '../../../interfaces/ServiceVariable/Volume.interface'

const VolumeVariableMolecule = (props: IVariableMolecule<IServiceVolumeCreate, IServiceVolume>): JSX.Element => {
  return <VariableMolecule<IServiceVolume, IServiceVolumeCreate> {...props} />
}

export default VolumeVariableMolecule
