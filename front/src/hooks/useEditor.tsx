import { type TDrawer } from '../types/Drawer'
import { useState } from 'react'
import { DRAWER_TYPE_STRUCTURES, type EditorForm } from '../forms/editor.structure'
import EventsCanvas from '../services/canvas/Events.canvas'
import { type TEntity } from '../types/Entity'
import { object } from 'yup'
import { type TOnChange } from '../interfaces/Forms/Input.interface'
import useDrawerManager from './useDrawerManager'

const useEditor = (drawer: TDrawer, stackId: string): {
  fields: EditorForm[]
  onSubmit: () => void
  onChange: (event: TOnChange) => void
  onDelete: () => void
  entityForm: TEntity
} => {
  const { createEntity, updateEntity, deleteEntity } = useDrawerManager(stackId)
  const [entityForm, setEntityForm] = useState<TEntity>(drawer.entity!)
  const [structure] = useState<EditorForm[]>(DRAWER_TYPE_STRUCTURES[drawer.type!])

  const isCreating: boolean = drawer.isCreatingEntity()

  const validatorsSchema = object(structure.reduce((acc, field) =>
    ({ [field.name]: field.validator }), {}))

  const onChange: (event: TOnChange)
  => void =
    (event: TOnChange): void => {
      setEntityForm({ ...entityForm, [event.target.name]: event.target.value })
    }

  const onSubmit = async (): Promise<void> => {
    try {
      await validatorsSchema.validate(entityForm)

      entityForm.positionX = drawer.factory!.positionX
      entityForm.positionY = drawer.factory!.positionY

      const response = isCreating
        ? await createEntity(entityForm, drawer.type!)
        : await updateEntity(entityForm, drawer.type!)

      const { data: entity } = response

      drawer.update(entity)
      setEntityForm(entity)

      EventsCanvas.updateScreen()
    } catch (err) {
      console.error(err)
    }
  }

  const onDelete = async (): Promise<void> => {
    if (!isCreating) {
      await deleteEntity(entityForm, drawer.type!)
    }

    EventsCanvas.deleteDrawer(drawer)
    EventsCanvas.clearSelectedDrawer()
  }

  return {
    fields: structure,
    entityForm,
    onSubmit,
    onChange,
    onDelete
  }
}

export default useEditor
