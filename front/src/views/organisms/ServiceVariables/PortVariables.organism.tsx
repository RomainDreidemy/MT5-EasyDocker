import React from 'react'
import { type TDrawer } from '../../../types/Drawer'
import ServiceVariablesOrganism from './ServiceVariables.organism'
import usePortVariablesEditor from '../../../hooks/ServiceVariables/usePortVariablesEditor'
import { type IServicePortVariable, type IServicePortVariableCreate } from '../../../interfaces/ServiceVariable/Port.interface'

const PortVariablesOrganism = ({ entity: drawer }: { entity: TDrawer }): JSX.Element => {
  const editor = usePortVariablesEditor(drawer)

  return <ServiceVariablesOrganism<IServicePortVariable, IServicePortVariableCreate>
    entity={drawer} editor={editor}/>
}

export default PortVariablesOrganism
