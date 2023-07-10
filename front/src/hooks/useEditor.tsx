import { DrawerTypes } from '../enums/DrawerTypes'
import { type TDrawer } from '../types/Drawer'
import { boolean, object, string } from 'yup'

const TYPE_STRUCTURES: structure = {
  [DrawerTypes.SERVICE]: [
    {
      label: 'Description',
      name: 'description',
      type: 'text',
      validator: boolean().nullable()
    },
    {
      label: 'Description',
      name: 'description',
      type: 'text',
      validator: boolean().nullable()
    }
  ],
  [DrawerTypes.NETWORK]: [],
  [DrawerTypes.VOLUME]: []
}

type structure = {
  [key in DrawerTypes]: form[]
}

interface form {
  label: string
  name: string,
  type: string,
  validator: string,
}

const useEditor = (drawer: TDrawer): { fields: form[] } => {
  console.log(drawer)

  return {
    fields: TYPE_STRUCTURES[drawer.type]
  }
}

export default useEditor
