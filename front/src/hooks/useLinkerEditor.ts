import { useState } from 'react'
import { type EditorForm, LINKER_STRUCTURE } from '../forms/editor.structure'
import EventsCanvas from '../services/canvas/Events.canvas'
import { type TEditor } from '../types/board/drawer/Common.bases'
import useForm from './useForm'
import { type TBaseLinker } from '../types/board/drawer/linkers/Base.linker'
import { type TLinkEntity } from '../types/Linker'

const useDrawerEditor = (linker: TBaseLinker, _: string): TEditor<TLinkEntity> => {
  const [structure] = useState<EditorForm[]>(LINKER_STRUCTURE)
  const {
    form: linkerForm,
    setForm: setLinkerForm,
    onChange, validatorsSchema
  } = useForm<TLinkEntity>(linker.entity!, structure)

  console.log(linker.entity!)

  const onSubmit = async (): Promise<void> => {
    try {
      await validatorsSchema.validate(linkerForm)

      // const response =
      //   await updateEntity(entityForm, linker.type!)
      //
      // const { data: entity } = response
      //
      // linker.update(entity)
      // setEntityForm(entity)
      //
      // EventsCanvas.updateScreen()
    } catch (err) {
      console.error(err)
    }
  }

  const onClose = (): void => {
    EventsCanvas.clearSelectedLinker()
    EventsCanvas.updateScreen()
  }

  return {
    fields: structure,
    entityForm: linkerForm,
    onSubmit,
    onChange,
    onClose
  }
}

export default useDrawerEditor
