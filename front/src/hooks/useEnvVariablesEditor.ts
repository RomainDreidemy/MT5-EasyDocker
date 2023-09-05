import { type TDrawer } from '../types/Drawer'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { type IServiceEnvVariable } from '../interfaces/ServiceEnvVariable.interface'
import { type IService } from '../interfaces/Service.interface'
import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai'
import EnvVariableMolecule from '../views/molecules/EnvVariable.molecule'
import { type IconType } from 'react-icons'

export interface TVariablesEditor<T, C> {
  variables: T[]
  setVariables: Dispatch<SetStateAction<T[]>>
  buttonText: string
  Icon: IconType
  Component: C
}

const useEnvVariablesEditor = (drawer: TDrawer, open: boolean): TVariablesEditor<IServiceEnvVariable, typeof EnvVariableMolecule> => {
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
    Icon,
    Component: EnvVariableMolecule
  }
}

export default useEnvVariablesEditor
