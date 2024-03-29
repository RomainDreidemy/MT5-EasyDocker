import React from 'react'
import { type TDrawer } from '../../../types/Drawer'
import ServiceVariablesOrganism from './ServiceVariables.organism'
import useEnvVariablesEditor from '../../../hooks/ServiceVariables/useEnvVariablesEditor'
import { type IServiceEnvVariable, type IServiceEnvVariableCreate } from '../../../interfaces/ServiceVariable/EnvVariable.interface'

const EnvVariablesOrganism = ({ entity: drawer }: { entity: TDrawer }): JSX.Element => {
  const editor = useEnvVariablesEditor(drawer)

  return <ServiceVariablesOrganism<IServiceEnvVariable, IServiceEnvVariableCreate>
    entity={drawer} editor={editor}/>
}

export default EnvVariablesOrganism
