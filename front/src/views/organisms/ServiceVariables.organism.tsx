import React from 'react'
import useToggle from '../../hooks/useToggle'
import Button from '../atoms/forms/Button.atom'
import { type TDrawer } from '../../types/Drawer'
import { type TPortEditor } from '../../hooks/usePortVariablesEditor'
import { type TEnvVariableEditor } from '../../hooks/useEnvVariablesEditor'

function ServiceVariablesOrganism ({ entity: drawer, editor }: {
  entity: TDrawer
  editor: TPortEditor | TEnvVariableEditor
}): JSX.Element {
  const [open, toggle] = useToggle()

  // const editor = useEditor(drawer, open)
  const {
    variables,
    setVariables,
    buttonText,
    icon,
    Component
  } = editor

  const addCallback = (envVariable: any): void => {
    setVariables([...variables, envVariable])
  }

  const deleteCallback = (envVariable: any): void => {
    setVariables(variables.filter(v => v.id !== envVariable.id))
  }

  const Icon = icon(open)

  return (
    <section className="mb-3 mt-5">
      <hr/>

      <article className="pt-3">
        <Button label={buttonText(open)} onClick={toggle} icon={<Icon />} variant={'ghost'}/>

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
