import { type TDrawer } from '../types/Drawer'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { type IServiceEnvVariable } from '../interfaces/ServiceEnvVariable.interface'
import { type IService } from '../interfaces/Service.interface'
import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai'
import EnvVariableMolecule from '../views/molecules/EnvVariable.molecule'
import { type IconType } from 'react-icons'
import { type EditorForm, ENV_VARIABLE_STRUCTURE, LINKER_STRUCTURE } from '../forms/editor.structure'
import ServiceEnvVariableEntity from '../services/entities/ServiceEnvVariable.entity'

export interface TVariablesEditor<IVariable, Component, Requester> {
  variables: IVariable[]
  setVariables: Dispatch<SetStateAction<IVariable[]>>
  buttonText: string
  fields: EditorForm[]

  Icon: IconType
  Component: Component

  Requester: Requester
}

const useEnvVariablesEditor = (drawer: TDrawer, open: boolean): TVariablesEditor<IServiceEnvVariable, typeof EnvVariableMolecule, typeof ServiceEnvVariableEntity> => {
  const [structure] = useState<EditorForm[]>(ENV_VARIABLE_STRUCTURE)

  const entity: IService = drawer.entity! as IService

  const [envVariables, setEnvVariables] = useState<IServiceEnvVariable[]>(entity.envVariables)

  const buttonText =
    open
      ? 'Hide Config Vars'
      : 'Reveal config Vars'

  const Icon =
    open
      ? AiOutlineUnlock
      : AiOutlineLock

  return {
    variables: envVariables,
    setVariables: setEnvVariables,
    buttonText,
    fields: structure,

    Icon,
    Component: EnvVariableMolecule,
    Requester: ServiceEnvVariableEntity
  }
}

export default useEnvVariablesEditor
