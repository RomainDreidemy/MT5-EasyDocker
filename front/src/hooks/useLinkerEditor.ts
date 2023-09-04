import { useState } from 'react'
import { type EditorForm, LINKER_STRUCTURE } from '../forms/editor.structure'
import EventsCanvas from '../services/canvas/Events.canvas'
import { type TEditor } from '../types/board/drawer/Common.bases'
import useForm from './useForm'
import { type TLinkEntity } from '../types/Linker'
import BoardEntity from '../services/entities/Board.entity'
import { type TBaseLinker } from '../types/board/drawer/linkers/Base.linker'

const useDrawerEditor = (linker: TBaseLinker, _: string): TEditor<TLinkEntity> => {
  const [structure] = useState<EditorForm[]>(LINKER_STRUCTURE)
  const {
    form: linkerForm,
    setForm: setLinkerForm,
    onChange, validatorsSchema
  } = useForm<TLinkEntity>(linker.entity!, structure)

  const onSubmit = async (): Promise<void> => {
    try {
      await validatorsSchema.validate(linkerForm)

      const response =
        await BoardEntity.updateServiceVolumeLink(linkerForm)

      const { data: link } = response

      linker.update(link as TLinkEntity)
      setLinkerForm(link as TLinkEntity)

      EventsCanvas.updateScreen()
    } catch (err) {
      console.error(err)
    }
  }

  const onDelete = async (): Promise<void> => {
    EventsCanvas.deleteLinker(linker.drawer!, linker)
    EventsCanvas.updateScreen()
  }

  const onClose = (): void => {
    EventsCanvas.clearSelectedLinker()
    EventsCanvas.updateScreen()
  }

  return {
    fields: structure,
    entityForm: linkerForm,
    onSubmit,
    onDelete,
    onChange,
    onClose
  }
}

export default useDrawerEditor
