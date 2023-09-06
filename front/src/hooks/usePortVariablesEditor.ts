import { type TDrawer } from '../types/Drawer'
import { useState } from 'react'
import { type IService } from '../interfaces/Service.interface'
import { type EditorForm, PORT_VARIABLE_STRUCTURE } from '../forms/editor.structure'
import { type IServicePortVariable, type IServicePortVariableCreate } from '../interfaces/ServicePort.interface'
import PortVariableMolecule from '../views/molecules/ServiceVariable/PortVariable.molecule'
import PortEntity from '../services/entities/serviceVariables/Port.entity'
import { TbReportMedical, TbReportSearch } from 'react-icons/tb'
import { type IconType } from 'react-icons'
import { type TVariablesEditor } from '../interfaces/VariableConfig.interface'

export type TPortEditor = TVariablesEditor<IServicePortVariable, IServicePortVariableCreate>

const useEnvVariablesEditor = (drawer: TDrawer): TPortEditor => {
  const [structure] = useState<EditorForm[]>(PORT_VARIABLE_STRUCTURE)

  const entity: IService = drawer.entity! as IService

  const [ports, setPorts] = useState<IServicePortVariable[]>(entity.ports)

  const buttonText =
    (open: boolean): string => {
      return open
        ? 'Hide Port Vars'
        : 'Reveal Port Vars'
    }

  const Icon =
    (open: boolean): IconType => {
      return open
        ? TbReportSearch
        : TbReportMedical
    }

  return {
    variables: ports,
    setVariables: setPorts,
    buttonText,
    fields: structure,

    icon: Icon,
    Component: PortVariableMolecule,
    Requester: PortEntity
  }
}

export default useEnvVariablesEditor
