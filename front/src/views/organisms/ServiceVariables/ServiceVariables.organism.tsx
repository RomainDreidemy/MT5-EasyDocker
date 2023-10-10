import React from 'react'
import useToggle from '../../../hooks/useToggle'
import Button from '../../atoms/forms/Button.atom'
import { type TDrawer } from '../../../types/Drawer'
import { type IServicePortVariable, type IServicePortVariableCreate } from '../../../interfaces/ServiceVariable/Port.interface'
import { type IServiceEnvVariable, type IServiceEnvVariableCreate } from '../../../interfaces/ServiceVariable/EnvVariable.interface'
import { type TVariablesEditor } from '../../../interfaces/VariableConfig.interface'
import { type IServiceVolume, type IServiceVolumeCreate } from '../../../interfaces/ServiceVariable/Volume.interface'
import { EventEmitters } from '../../../enums/eventEmitters'
import eventEmitter from '../../../services/apps/Event.emitter'
import { type EventListenerCallback } from '../../../interfaces/EventListener.interface'

function ServiceVariablesOrganism<
  IVariable extends IServicePortVariable | IServiceEnvVariable | IServiceVolume,
  IVariableCreate extends IServicePortVariableCreate | IServiceEnvVariableCreate | IServiceVolumeCreate
> ({
  entity: drawer,
  editor
}: {
  entity: TDrawer
  editor: TVariablesEditor<IVariable, IVariableCreate>
}): JSX.Element {
  const [open, toggle] = useToggle()

  const {
    variables,
    setVariables,
    buttonText,
    icon,
    Component
  } = editor

  const addCallback = (variable: IVariable): void => {
    setVariables([...variables, variable])
  }

  const onDrawerUpdate = (): void => { eventEmitter.emit<EventListenerCallback<TDrawer>>(EventEmitters.ON_UPDATED_DRAWER, drawer) }

  const deleteCallback = (variable: IVariable): void => {
    const filtered = variables.filter(v => v.id !== variable.id)

    setVariables(filtered)
    eventEmitter.emit<EventListenerCallback<TDrawer>>(EventEmitters.ON_UPDATED_DRAWER, drawer)
  }

  const Icon = icon(open)

  return (
    <section className="mb-3">
      <hr/>

      <article className="pt-3">
        <Button label={buttonText(open)} onClick={toggle} icon={<Icon/>} variant={'ghost'}/>

        {open && (
          <div className="container mx-auto">
            <div className="flex flex-wrap -mx-2 p-2 ">

              {variables.map((variable, index) => (
                <Component key={index}
                           variable={variable}
                           serviceId={drawer.entity!.id}
                           deleteCallback={deleteCallback}
                           onDrawerUpdate={onDrawerUpdate}
                           {...editor}
                />
              ))}

              <Component serviceId={drawer.entity!.id}
                         addCallback={addCallback}
                         onDrawerUpdate={onDrawerUpdate}
                         {...editor} />
            </div>
          </div>
        )}
      </article>
    </section>
  )
}

export default ServiceVariablesOrganism
