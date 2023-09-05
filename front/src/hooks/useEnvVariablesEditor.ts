import { type TDrawer } from '../types/Drawer'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { type IServiceEnvVariable, type IServiceEnvVariableCreate } from '../interfaces/ServiceEnvVariable.interface'
import { type IService } from '../interfaces/Service.interface'
import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai'
import EnvVariableMolecule from '../views/molecules/EnvVariable.molecule'
import { type IconType } from 'react-icons'
import { type EditorForm, ENV_VARIABLE_STRUCTURE } from '../forms/editor.structure'
import ServiceEnvVariableEntity, { type IVariableRequester } from '../services/entities/ServiceEnvVariable.entity'
import { TbReportMedical, TbReportSearch } from 'react-icons/tb'

export interface TVariablesEditor<IVariable, Component, Requester> {
  variables: IVariable[]
  setVariables: Dispatch<SetStateAction<IVariable[]>>
  buttonText: (open: boolean) => string
  fields: EditorForm[]

  icon: (open: boolean) => IconType
  Component: Component

  Requester: Requester
}

export type TVariableEditorCaller<C> = (drawer: TDrawer) => C
export type TEnvVariableEditor = TVariablesEditor<IServiceEnvVariable, typeof EnvVariableMolecule, IVariableRequester<IServiceEnvVariableCreate, IServiceEnvVariable>>
export type TEnvVariableEditorCaller = TVariableEditorCaller<TEnvVariableEditor>

const useEnvVariablesEditor = (drawer: TDrawer): TEnvVariableEditor => {
  const [structure] = useState<EditorForm[]>(ENV_VARIABLE_STRUCTURE)

  const entity: IService = drawer.entity! as IService

  const [envVariables, setEnvVariables] = useState<IServiceEnvVariable[]>(entity.envVariables)

  const buttonText =
    (open: boolean): string => {
      return open
        ? 'Hide Config Vars'
        : 'Reveal config Vars'
    }

  const icon =
    (open: boolean): IconType => {
      return open
        ? AiOutlineUnlock
        : AiOutlineLock
    }

  return {
    variables: envVariables,
    setVariables: setEnvVariables,
    buttonText,
    fields: structure,

    icon,
    Component: EnvVariableMolecule,
    Requester: ServiceEnvVariableEntity
  }
}

export default useEnvVariablesEditor
