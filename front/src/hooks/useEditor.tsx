import { type TDrawer } from '../types/Drawer'
import { useState } from 'react'
import { type EditorForm, TYPE_STRUCTURES } from '../forms/editor.structure'
import EventsCanvas from '../services/canvas/Events.canvas'
import { type AxiosResponse } from 'axios'
import { type TEntity } from '../types/Entity'
import { DrawerTypes } from '../enums/DrawerTypes'
import ServiceEntity from '../services/entities/Service.entity'
import { type IService } from '../interfaces/Service.interface'
import NetworkEntity from '../services/entities/Network.entity'
import { type INetwork } from '../interfaces/Network.interface'
import { type IVolume } from '../interfaces/Volume.interface'
import { Errors } from '../enums/errors'
import { object } from 'yup'
import { type TOnChange } from '../interfaces/Forms/Input.interface'
import useDrawerManager from './useDrawerManager'
import ManagedVolumeEntity from "../services/entities/Volume.entity";

const useEditor = (drawer: TDrawer, stackId: string): {
  fields: EditorForm[]
  onSubmit: () => void
  onChange: (event: TOnChange) => void
  onDelete: () => void
  entityForm: TEntity
} => {
  const { createEntity } = useDrawerManager(stackId)
  const [entityForm, setEntityForm] = useState<TEntity>(drawer.entity!)
  const [structure] = useState<EditorForm[]>(TYPE_STRUCTURES[drawer.type!])

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
        : await updateEntity()

      const { data: entity } = response

      drawer.update(entity)
      setEntityForm(entity)

      EventsCanvas.updateScreen()
    } catch (err) {
      console.error(err)
    }
  }

  const updateEntity = async (): Promise<AxiosResponse<TEntity>> => {
    switch (drawer.type) {
      case DrawerTypes.SERVICE:
        return await ServiceEntity.update(entityForm as IService)

      case DrawerTypes.NETWORK:
        return await NetworkEntity.update(entityForm as INetwork)

      case DrawerTypes.VOLUME:
        return await ManagedVolumeEntity.update(entityForm as IVolume)

      default:
        throw new Error(Errors.NOT_IMPLEMENTED)
    }
  }

  const deleteEntity = async (): Promise<AxiosResponse<any>> => {
    switch (drawer.type) {
      case DrawerTypes.SERVICE:
        return await ServiceEntity.delete(entityForm.id)

      case DrawerTypes.NETWORK:
        return await NetworkEntity.delete(entityForm.id)

      case DrawerTypes.VOLUME:
        return await ManagedVolumeEntity.delete(entityForm.id)

      default:
        throw new Error(Errors.NOT_IMPLEMENTED)
    }
  }

  const onDelete = async (): Promise<void> => {
    if (!isCreating) {
      await deleteEntity()
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
