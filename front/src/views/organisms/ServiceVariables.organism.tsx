import React from 'react'
import useToggle from '../../hooks/useToggle'
import Button from '../atoms/forms/Button.atom'
import { type TDrawer } from '../../types/Drawer'
import { type TVariablesEditor } from '../../hooks/useEnvVariablesEditor'

function ServiceVariablesOrganism<IVariable, IVariableCreate> ({ entity: drawer, editor }: {
  entity: TDrawer
  editor: TVariablesEditor<IVariable, IVariableCreate>
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
    const filtered = variables.filter(v => v.id !== envVariable.id)

    setVariables(filtered)
  }

  const Icon = icon(open)

  return (
    <section className="mb-3 mt-5">
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

// interface ListItem<T> {
//   id: number
//   data: T
// }
//
// // Créez une interface générique pour définir les propriétés du composant de liste
// interface ListProps<T> {
//   items: Array<ListItem<T>>
// }
//
// // Créez un composant de liste générique
// function List<T> ({ items }: ListProps<T>) {
//   return (
//     <ul>
//       {items.map((item) => (
//         <li key={item.id}>{item.data}</li>
//       ))}
//     </ul>
//   )
// }
//
// // Exemple d'utilisation du composant de liste générique
// const stringItems: Array<ListItem<string>> = [
//   { id: 1, data: 'Premier élément' },
//   { id: 2, data: 'Deuxième élément' }
// ]
//
// const numberItems: Array<ListItem<number>> = [
//   { id: 1, data: 42 },
//   { id: 2, data: 1337 }
// ]
//
// const App = () => {
//   return (
//     <div>
//       <h1>Liste de chaînes de caractères</h1>
//       <List items={stringItems} />
//       <h1>Liste de nombres</h1>
//       <List items={numberItems} />
//     </div>
//   )
// }

export default ServiceVariablesOrganism
