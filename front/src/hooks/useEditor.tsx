import { DrawerTypes } from '../enums/DrawerTypes'
import { type TDrawer } from '../types/Drawer'
import { boolean, string } from 'yup'

const TYPE_STRUCTURES: structure = {
  [DrawerTypes.SERVICE]: [
    {
      label: 'Docker Image',
      name: 'dockerImage',
      type: 'text',
      validator: string().nullable()
    },
    {
      label: 'Docker Tag',
      name: 'dockerTag',
      type: 'text',
      validator: string().nullable()
    },
    {
      label: 'Entrypoint',
      name: 'entrypoint',
      type: 'text',
      validator: string().nullable()
    },
    {
      label: 'Description',
      name: 'description',
      type: 'text',
      validator: string().nullable()
    },
  ],
  [DrawerTypes.NETWORK]: [
    {
      label: 'Description',
      name: 'description',
      type: 'text',
      validator: string().nullable()
    }
  ],
  [DrawerTypes.VOLUME]: [
    {
      label: 'Description',
      name: 'description',
      type: 'text',
      validator: string().nullable()
    }
  ]
}

type structure = {
  [key in DrawerTypes]: form[]
}

interface form {
  label: string
  name: string
  type: string
  validator: string
}

const useEditor = (drawer: TDrawer): { fields: form[] } => {
  return {
    fields: TYPE_STRUCTURES[drawer.type]
  }
}

export default useEditor
