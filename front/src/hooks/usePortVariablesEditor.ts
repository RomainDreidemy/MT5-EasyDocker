import { type TDrawer } from '../types/Drawer'
import { useState } from 'react'
import { type IService } from '../interfaces/Service.interface'
import { type EditorForm, PORT_VARIABLE_STRUCTURE } from '../forms/editor.structure'
import { type IVariableRequester } from '../services/entities/ServiceEnvVariable.entity'
import { type TVariableEditorCaller, type TVariablesEditor } from './useEnvVariablesEditor'
import { type IServicePortVariable, type IServicePortVariableCreate } from '../interfaces/ServicePort.interface'
import PortVariableMolecule from '../views/molecules/PortVariable.molecule'
import ServicePortEntity from '../services/entities/ServicePort.entity'
import { TbReportMedical, TbReportSearch } from 'react-icons/tb'
import { type IconType } from 'react-icons'
import { IBoard } from '../interfaces/Board.interface'

export type TServicePortVariable = IServicePortVariable
export type TServicePortVariableCreate = IServicePortVariableCreate

export type TPortEditor = TVariablesEditor<TServicePortVariable, TServicePortVariableCreate>
export type TPortEditorCaller = TVariableEditorCaller<TPortEditor>

const useEnvVariablesEditor = (drawer: TDrawer): TPortEditor => {
  const [structure] = useState<EditorForm[]>(PORT_VARIABLE_STRUCTURE)

  const entity: IService = drawer.entity! as IService

  const [ports, setPorts] = useState<TServicePortVariable[]>(entity.ports)

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
    Requester: ServicePortEntity
  }
}

export default useEnvVariablesEditor
