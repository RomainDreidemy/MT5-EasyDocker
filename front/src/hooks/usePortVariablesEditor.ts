import { type TDrawer } from '../types/Drawer'
import { useState } from 'react'
import { type IService } from '../interfaces/Service.interface'
import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai'
import { type EditorForm, PORT_VARIABLE_STRUCTURE } from '../forms/editor.structure'
import { type IVariableRequester } from '../services/entities/ServiceEnvVariable.entity'
import { type TVariablesEditor } from './useEnvVariablesEditor'
import { type IServicePortVariable, type IServicePortVariableCreate } from '../interfaces/ServicePort.interface'
import PortVariableMolecule from '../views/molecules/PortVariable.molecule'
import ServicePortEntity from '../services/entities/ServicePort.entity'
import { TbReportMedical, TbReportSearch } from 'react-icons/tb'

const useEnvVariablesEditor = (drawer: TDrawer, open: boolean): TVariablesEditor<IServicePortVariable, typeof PortVariableMolecule, IVariableRequester<IServicePortVariableCreate, IServicePortVariable>> => {
  const [structure] = useState<EditorForm[]>(PORT_VARIABLE_STRUCTURE)

  const entity: IService = drawer.entity! as IService

  const [ports, setPorts] = useState<IServicePortVariable[]>(entity.ports)

  const buttonText =
    open
      ? 'Hide Port Vars'
      : 'Reveal Port Vars'

  const Icon =
    open
      ? TbReportSearch
      : TbReportMedical

  return {
    variables: ports,
    setVariables: setPorts,
    buttonText,
    fields: structure,

    Icon,
    Component: PortVariableMolecule,
    Requester: ServicePortEntity
  }
}

export default useEnvVariablesEditor
