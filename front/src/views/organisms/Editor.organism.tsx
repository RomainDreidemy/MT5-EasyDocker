import React, { useState } from 'react'
import useEditor from '../../hooks/useEditor'
import { type TDrawer } from '../../types/Drawer'
import EventsCanvas from '../../services/canvas/Events.canvas'
import Button from '../atoms/Forms/Button.atom'
import { object } from 'yup'
import { type TEntity } from '../../types/Entity'
import { type TOnChange } from '../../interfaces/Forms/Input.interface'
import ServiceEntity from '../../services/entities/Service.entity'
import { type IService, type IServiceCreate } from '../../interfaces/Service.interface'
import { DrawerTypes } from '../../enums/DrawerTypes'
import NetworkEntity from '../../services/entities/Network.entity'
import { type INetwork, type INetworkCreate } from '../../interfaces/Network.interface'
import VolumeEntity from '../../services/entities/Volume.entity'
import { type IVolume, type IVolumeCreate } from '../../interfaces/Volume.interface'
import { Errors } from '../../enums/errors'
import { type AxiosResponse } from 'axios'

const EditorOrganism = ({ drawer, stackId }: { drawer: TDrawer, stackId: string }): JSX.Element => {
  const { fields } = useEditor(drawer)

  const [entityForm, setEntityForm] = useState<TEntity>(drawer.entity!)

  const isCreating: boolean = drawer.isCreatingEntity()
  const submitText: string = isCreating ? 'Create' : 'Update'

  const validatorsSchema = object(fields.reduce((acc, field) =>
    ({ [field.name]: field.validator }), {}))

  const changeValue: (event: TOnChange)
  => void =
    (event: TOnChange): void => {
      setEntityForm({ ...entityForm, [event.target.name]: event.target.value })
    }

  const onClose = (): void => {
    EventsCanvas.clearSelectedDrawer()
    EventsCanvas.updateScreen()
  }

  const onSubmit = async (): Promise<void> => {
    try {
      await validatorsSchema.validate(entityForm)

      entityForm.positionX = drawer.factory!.positionX
      entityForm.positionY = drawer.factory!.positionY

      const response = isCreating
        ? await create()
        : await update()

      const { data: entity } = response
      drawer.entity = entity
      EventsCanvas.updateScreen()
    } catch (err) {
      console.error(err)
    }
  }

  const create = async (): Promise<AxiosResponse<TEntity>> => {
    switch (drawer.type) {
      case DrawerTypes.SERVICE:
        return await ServiceEntity.create(stackId, entityForm as IServiceCreate)

      case DrawerTypes.NETWORK:
        return await NetworkEntity.create(stackId, entityForm as INetworkCreate)

      case DrawerTypes.VOLUME:
        return await VolumeEntity.create(stackId, entityForm as IVolumeCreate)

      default:
        throw new Error(Errors.NOT_IMPLEMENTED)
    }
  }

  const update = async (): Promise<AxiosResponse<TEntity>> => {
    switch (drawer.type) {
      case DrawerTypes.SERVICE:
        return await ServiceEntity.update(entityForm as IService)

      case DrawerTypes.NETWORK:
        return await NetworkEntity.update(entityForm as INetwork)

      case DrawerTypes.VOLUME:
        return await VolumeEntity.update(entityForm as IVolume)

      default:
        throw new Error(Errors.NOT_IMPLEMENTED)
    }
  }

  return (
    <div className="w-full h-full border-l-2 ">
      <div className="h-[70px] border-b-2 p-2 flex flex items-center justify-between">
        <h2><strong>Editor</strong></h2>

        <Button
          className="bg-transparent text-blue-500 hover:text-white font-bold h-2"
          label={'X'}
          onClick={onClose}
        />
      </div>

      <form className="p-2" onSubmit={onSubmit}>

        {fields.map((field, index) => {
          const Component = field.component
          const value = entityForm[field.name as keyof TEntity]

          return (
            <Component
              key={index}
              label={field.label}
              type={field.type}
              name={field.name}
              value={value as string}
              onChange={changeValue}
            />)
        })}

        <div className="mt-5">
          <Button
            label={submitText}
            onClick={onSubmit}
            className={'w-full'}
            direction={'right'}
          />
        </div>

      </form>
    </div>
  )
}

export default EditorOrganism
