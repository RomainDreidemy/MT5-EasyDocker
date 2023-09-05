import React from 'react'
import { type TDrawer } from '../../types/Drawer'
import ServiceVariablesOrganism from './ServiceVariables.organism'
import useEnvVariablesEditor from '../../hooks/useEnvVariablesEditor'

const EnvVariablesOrganism = ({ entity: drawer }: { entity: TDrawer }): JSX.Element => {
  return <ServiceVariablesOrganism entity={drawer} useEditor={useEnvVariablesEditor}/>
}

export default EnvVariablesOrganism
