import { DrawerTypes } from '../enums/DrawerTypes'
import { boolean, string } from 'yup'
import Input from '../views/atoms/forms/Input.atom'
import Checkbox from '../views/atoms/forms/Checkbox.atom'
import TextArea from '../views/atoms/forms/TextArea.atom'

export type EditorStructure = {
  [key in DrawerTypes]: EditorForm[]
}

export interface EditorForm {
  label: string
  name: string
  type: string
  validator: any
  component: typeof Input | typeof Checkbox | typeof TextArea
}

export const TYPE_STRUCTURES: EditorStructure = {
  [DrawerTypes.SERVICE]: [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      component: Input,
      validator: string().nullable()
    },
    {
      label: 'Docker Image',
      name: 'dockerImage',
      type: 'text',
      component: Input,
      validator: string().nullable()
    },
    {
      label: 'Docker Tag',
      name: 'dockerTag',
      type: 'text',
      component: Input,
      validator: string().nullable()
    },
    {
      label: 'Entrypoint',
      name: 'entrypoint',
      type: 'text',
      component: Input,
      validator: string().nullable()
    },
    {
      label: 'Description',
      name: 'description',
      type: 'text',
      component: TextArea,
      validator: string().nullable()
    },
    {
      label: 'External',
      name: 'isExternal',
      type: 'text',
      component: Checkbox,
      validator: boolean().nullable()
    }
  ],
  [DrawerTypes.NETWORK]: [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      component: Input,
      validator: string().nullable()
    },
    {
      label: 'Description',
      name: 'description',
      type: 'text',
      component: TextArea,
      validator: string().nullable()
    },
    {
      label: 'External',
      name: 'isExternal',
      type: 'text',
      component: Checkbox,
      validator: boolean().nullable()
    }
  ],
  [DrawerTypes.VOLUME]: [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      component: Input,
      validator: string().nullable()
    },
    {
      label: 'Description',
      name: 'description',
      type: 'text',
      component: TextArea,
      validator: string().nullable()
    },
    {
      label: 'Container Path',
      name: 'containerPath',
      type: 'text',
      component: Input,
      validator: string().nullable()
    },
    {
      label: 'Local Path',
      name: 'localPath',
      type: 'text',
      component: Input,
      validator: string().nullable()
    }
  ]
}
