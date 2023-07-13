import {DrawerTypes} from '../enums/DrawerTypes'
import {boolean, string} from 'yup'
import Input from "../views/atoms/Forms/Input.atom";
import Checkbox from "../views/atoms/Forms/Checkbox.atom";

export type EditorStructure = {
  [key in DrawerTypes]: EditorForm[]
}

export interface EditorForm {
  label: string
  name: string
  type: string
  validator: any
  component: typeof Input | typeof Checkbox
}

export const TYPE_STRUCTURES: EditorStructure = {
  [DrawerTypes.SERVICE]: [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      component: Input,
      validator: string().required()
    },
    {
      label: 'Docker Image',
      name: 'dockerImage',
      type: 'text',
      component: Input,
      validator: string().required()
    },
    {
      label: 'External',
      name: 'isExternal',
      type: 'text',
      component: Checkbox,
      validator: boolean().required()
    },
    {
      label: 'Docker Tag',
      name: 'dockerTag',
      type: 'text',
      component: Input,
      validator: string().required()
    },
    {
      label: 'Entrypoint',
      name: 'entrypoint',
      type: 'text',
      component: Input,
      validator: string().required()
    },
    {
      label: 'Description',
      name: 'description',
      type: 'text',
      component: Input,
      validator: string().nullable()
    }
  ],
  [DrawerTypes.NETWORK]: [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      component: Input,
      validator: string().required()
    },
    {
      label: 'Description',
      name: 'description',
      type: 'text',
      component: Input,
      validator: string().nullable()
    }
  ],
  [DrawerTypes.VOLUME]: [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      component: Input,
      validator: string().required()
    },
    {
      label: 'Description',
      name: 'description',
      type: 'text',
      component: Input,
      validator: string().nullable()
    }
  ]
}
