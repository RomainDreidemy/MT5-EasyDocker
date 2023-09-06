import React from 'react'
import { type TDrawer } from '../../types/Drawer'
import ServiceVariablesOrganism from './ServiceVariables.organism'
import useEnvVariablesEditor, {
  type TServiceEnvVariable,
  type TServiceEnvVariableCreate
} from '../../hooks/useEnvVariablesEditor'
import { type IVariableRequester } from '../../services/entities/ServiceEnvVariable.entity'

const EnvVariablesOrganism = ({ entity: drawer }: { entity: TDrawer }): JSX.Element => {
  const editor = useEnvVariablesEditor(drawer)

  return <ServiceVariablesOrganism<TServiceEnvVariable, TServiceEnvVariableCreate>
    entity={drawer} editor={editor}/>
}

export default EnvVariablesOrganism
