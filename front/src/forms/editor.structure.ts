import { DrawerTypes } from '../enums/DrawerTypes'
import { boolean, string } from 'yup'
import Input from '../views/atoms/forms/Input.atom'
import Checkbox from '../views/atoms/forms/Checkbox.atom'
import TextArea from '../views/atoms/forms/TextArea.atom'

export type EditorStructure = {
  [key in DrawerTypes]: EditorForm[]
}

export interface EditorForm {
  [key: string]: any
  label: string
  key: string
  type: string
  validator: any
  component: typeof Input | typeof Checkbox | typeof TextArea
}

export const LINKER_STRUCTURE: EditorForm[] = [
  {
    label: 'Container path',
    key: 'containerPath',
    type: 'text',
    component: Input,
    validator: string().nullable()
  }
]

export const DRAWER_TYPE_STRUCTURES: EditorStructure = {
  [DrawerTypes.SERVICE]: [
    {
      label: 'Name',
      key: 'name',
      type: 'text',
      component: Input,
      validator: string().nullable()
    },
    {
      label: 'Docker Image',
      key: 'dockerImage',
      type: 'text',
      component: Input,
      validator: string().nullable()
    },
    {
      label: 'Docker Tag',
      key: 'dockerTag',
      type: 'text',
      component: Input,
      validator: string().nullable()
    },
    {
      label: 'Entrypoint',
      key: 'entrypoint',
      type: 'text',
      component: Input,
      validator: string().nullable()
    },
    {
      label: 'Description',
      key: 'description',
      type: 'text',
      component: TextArea,
      validator: string().nullable()
    },
    {
      label: 'External',
      key: 'isExternal',
      type: 'text',
      component: Checkbox,
      validator: boolean().nullable()
    }
  ],
  [DrawerTypes.NETWORK]: [
    {
      label: 'Name',
      key: 'name',
      type: 'text',
      component: Input,
      validator: string().nullable()
    },
    {
      label: 'Description',
      key: 'description',
      type: 'text',
      component: TextArea,
      validator: string().nullable()
    },
    {
      label: 'External',
      key: 'isExternal',
      type: 'text',
      component: Checkbox,
      validator: boolean().nullable()
    },
    {
      label: 'Driver',
      name: 'driver',
      type: 'text',
      component: Input,
      validator: string().nullable()
    },
  ],
  [DrawerTypes.VOLUME]: [
    {
      label: 'Name',
      key: 'name',
      type: 'text',
      component: Input,
      validator: string().nullable()
    },
    {
      label: 'Description',
      key: 'description',
      type: 'text',
      component: TextArea,
      validator: string().nullable()
    },
    {
      label: 'Container Path',
      key: 'containerPath',
      type: 'text',
      component: Input,
      validator: string().nullable()
    },
    {
      label: 'Local Path',
      key: 'localPath',
      type: 'text',
      component: Input,
      validator: string().nullable()
    }
  ]
}
