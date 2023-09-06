import { type TDrawer } from '../../types/Drawer'
import { useState } from 'react'
import { type IService } from '../../interfaces/Service.interface'
import { type IconType } from 'react-icons'
import { type EditorForm, VOLUME_VARIABLE_STRUCTURE } from '../../forms/editor.structure'
import { type TVariablesEditor } from '../../interfaces/VariableConfig.interface'
import { type IServiceVolume, type IServiceVolumeCreate } from '../../interfaces/ServiceVariable/Volume.interface'
import { FiBox, FiCodesandbox } from 'react-icons/fi'
import VolumeEntity from '../../services/entities/serviceVariables/Volume.entity'
import VolumeVariableMolecule from '../../views/molecules/ServiceVariable/VolumeVariable.molecule'

export type TVolumeVariableEditor = TVariablesEditor<IServiceVolume, IServiceVolumeCreate>

const useEnvVariablesEditor = (drawer: TDrawer): TVolumeVariableEditor => {
  const [structure] = useState<EditorForm[]>(VOLUME_VARIABLE_STRUCTURE)

  const entity: IService = drawer.entity! as IService

  const [volumesVariables, setVolumeVariables] = useState<IServiceVolume[]>(entity.volumes)

  const buttonText =
    (open: boolean): string => {
      return open
        ? 'Hide Volume Vars'
        : 'Reveal Volume Vars'
    }

  const icon =
    (open: boolean): IconType => {
      return open
        ? FiBox
        : FiCodesandbox
    }

  return {
    variables: volumesVariables,
    setVariables: setVolumeVariables,
    buttonText,
    fields: structure,

    icon,
    Component: VolumeVariableMolecule,
    Requester: VolumeEntity
  }
}

export default useEnvVariablesEditor
