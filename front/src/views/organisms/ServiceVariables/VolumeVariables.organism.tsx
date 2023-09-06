import React from 'react'
import { type TDrawer } from '../../../types/Drawer'
import ServiceVariablesOrganism from './ServiceVariables.organism'
import useVolumeVariablesEditor from '../../../hooks/ServiceVariables/useVolumeVariablesEditor'
import { type IServiceVolume, type IServiceVolumeCreate } from '../../../interfaces/ServiceVariable/Volume.interface'

const VolumeVariablesOrganism = ({ entity: drawer }: { entity: TDrawer }): JSX.Element => {
  const editor = useVolumeVariablesEditor(drawer)

  return <ServiceVariablesOrganism<IServiceVolume, IServiceVolumeCreate>
    entity={drawer} editor={editor}/>
}

export default VolumeVariablesOrganism
