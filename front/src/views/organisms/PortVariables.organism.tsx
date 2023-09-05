import React from 'react'
import { type TDrawer } from '../../types/Drawer'
import ServiceVariablesOrganism from './ServiceVariables.organism'
import usePortVariablesEditor from '../../hooks/usePortVariablesEditor'

const PortVariablesOrganism = ({ entity: drawer }: { entity: TDrawer }): JSX.Element => {
  return <ServiceVariablesOrganism entity={drawer} useEditor={usePortVariablesEditor}/>
}

export default PortVariablesOrganism
