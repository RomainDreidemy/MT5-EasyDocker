import React from 'react'
import useToggle from '../../hooks/useToggle'
import Button from '../atoms/forms/Button.atom'
import { type IServiceEnvVariable } from '../../interfaces/ServiceEnvVariable.interface'
import { type TDrawer } from '../../types/Drawer'
import type useEnvVariablesEditor from '../../hooks/useEnvVariablesEditor'
import type usePortVariablesEditor from '../../hooks/usePortVariablesEditor'

const ServiceVariablesOrganism = ({ entity: drawer, useEditor }: {
  entity: TDrawer
  useEditor: typeof useEnvVariablesEditor & typeof usePortVariablesEditor
}): JSX.Element => {
  const [open, toggle] = useToggle()

  const editor = useEditor(drawer, open)
  const {
    variables,
    setVariables,
    buttonText,
    Icon,
    Component
  } = editor

  const addCallback = (envVariable: IServiceEnvVariable): void => {
    setVariables([...variables, envVariable])
  }

  const deleteCallback = (envVariable: IServiceEnvVariable): void => {
    setVariables(variables.filter(v => v.id !== envVariable.id))
  }

  return (
    <section className="mb-3 mt-5">
      <hr/>

      <article className="pt-3">
        <Button label={buttonText} onClick={toggle} icon={<Icon/>} variant={'ghost'}/>

        {open && (
          <div className="container mx-auto">
            <div className="flex flex-wrap -mx-2 p-2 ">

              {variables.map((variable, index) => (
                <Component key={index}
                           variable={variable}
                           serviceId={drawer.entity!.id}
                           deleteCallback={deleteCallback}
                           {...editor}
                />
              ))}

              <Component serviceId={drawer.entity!.id}
                         addCallback={addCallback}
                         {...editor} />
            </div>
          </div>
        )}
      </article>
    </section>
  )
}

export default ServiceVariablesOrganism
