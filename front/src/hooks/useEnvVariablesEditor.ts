import { type TDrawer } from '../types/Drawer'
import { useState } from 'react'
import { type IServiceEnvVariable, type IServiceEnvVariableCreate } from '../interfaces/ServiceEnvVariable.interface'
import { type IService } from '../interfaces/Service.interface'
import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai'
import EnvVariableMolecule from '../views/molecules/EnvVariable.molecule'
import { type IconType } from 'react-icons'
import { type EditorForm, ENV_VARIABLE_STRUCTURE } from '../forms/editor.structure'
import ServiceEnvVariableEntity from '../services/entities/ServiceEnvVariable.entity'
import { type TVariablesEditor } from '../interfaces/VariableConfig.interface'

export type TServiceEnvVariable = IServiceEnvVariable
export type TServiceEnvVariableCreate = IServiceEnvVariableCreate

export type TEnvVariableEditor = TVariablesEditor<TServiceEnvVariable, TServiceEnvVariableCreate>

const useEnvVariablesEditor = (drawer: TDrawer): TEnvVariableEditor => {
  const [structure] = useState<EditorForm[]>(ENV_VARIABLE_STRUCTURE)

  const entity: IService = drawer.entity! as IService

  const [envVariables, setEnvVariables] = useState<TServiceEnvVariable[]>(entity.envVariables)

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
