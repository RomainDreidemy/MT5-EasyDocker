import { type TDrawer } from '../types/Drawer'
import { useState } from 'react'
import { DRAWER_TYPE_STRUCTURES, type EditorForm } from '../forms/editor.structure'
import EventsCanvas from '../services/canvas/Events.canvas'
import useDrawerManager from './useDrawerManager'
import { type TEditor } from '../types/board/drawer/Common.bases'
import useForm from './useForm'
import { type TEntity } from '../types/Entity'

const useDrawerEditor = (drawer: TDrawer, stackId: string): TEditor<TEntity> => {
  const { updateEntity, deleteEntity } = useDrawerManager(stackId)
  const [structure] = useState<EditorForm[]>(DRAWER_TYPE_STRUCTURES[drawer.type!])
  const {
    form: entityForm,
    setForm: setEntityForm,
    onChange, validatorsSchema
  } = useForm<TEntity>(drawer.entity!, structure)

  const onSubmit = async (): Promise<void> => {
    try {
      await validatorsSchema.validate(entityForm)

      entityForm.positionX = drawer.factory!.positionX
      entityForm.positionY = drawer.factory!.positionY

      const response =
        await updateEntity(entityForm, drawer.type!)

      const { data: entity } = response

      drawer.update(entity)
      setEntityForm(entity)

      EventsCanvas.updateScreen()
    } catch (err) {
      console.error(err)
    }
  }

  const onDelete = async (): Promise<void> => {
    if (drawer.isCreatingEntity()) return

    await deleteEntity(entityForm, drawer.type!)

    EventsCanvas.deleteDrawer(drawer)
    EventsCanvas.clearSelectedDrawer()
  }

  const onClose = (): void => {
    EventsCanvas.clearSelectedDrawer()
    EventsCanvas.updateScreen()
  }

  return {
    fields: structure,
    entityForm,
    onForm: setEntityForm,
    onSubmit,
    onChange,
    onDelete,
    onClose
  }
}

export default useDrawerEditor
