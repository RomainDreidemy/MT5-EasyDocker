import React from 'react'
import { type TDrawer } from '../../types/Drawer'
import ServiceVariablesOrganism from './ServiceVariables.organism'
import useEnvVariablesEditor, {
  type TServiceEnvVariableCreate
} from '../../hooks/useEnvVariablesEditor'
import { type IServiceEnvVariable } from '../../interfaces/ServiceEnvVariable.interface'

const EnvVariablesOrganism = ({ entity: drawer }: { entity: TDrawer }): JSX.Element => {
  const editor = useEnvVariablesEditor(drawer)

  return <ServiceVariablesOrganism<IServiceEnvVariable, TServiceEnvVariableCreate>
    entity={drawer} editor={editor}/>
}

export default EnvVariablesOrganism
