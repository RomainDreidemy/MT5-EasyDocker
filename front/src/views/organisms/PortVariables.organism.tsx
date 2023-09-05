import React from 'react'
import { type TDrawer } from '../../types/Drawer'
import ServiceVariablesOrganism from './ServiceVariables.organism'
import usePortVariablesEditor from '../../hooks/usePortVariablesEditor'
import { type IServicePortVariable } from '../../interfaces/ServicePort.interface'

const PortVariablesOrganism = ({ entity: drawer }: { entity: TDrawer }): JSX.Element => {
  const editor = usePortVariablesEditor(drawer)

  return <ServiceVariablesOrganism<IServicePortVariable> entity={drawer} editor={editor}/>
}

export default PortVariablesOrganism
