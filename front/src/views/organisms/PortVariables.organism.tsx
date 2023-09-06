import React from 'react'
import { type TDrawer } from '../../types/Drawer'
import ServiceVariablesOrganism from './ServiceVariables.organism'
import usePortVariablesEditor, {
  type TServicePortVariable,
  type TServicePortVariableCreate
} from '../../hooks/usePortVariablesEditor'

const PortVariablesOrganism = ({ entity: drawer }: { entity: TDrawer }): JSX.Element => {
  const editor = usePortVariablesEditor(drawer)

  return <ServiceVariablesOrganism<TServicePortVariable, TServicePortVariableCreate>
    entity={drawer} editor={editor}/>
}

export default PortVariablesOrganism
