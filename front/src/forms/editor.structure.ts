import { DrawerTypes } from '../enums/DrawerTypes'
import { boolean, number, string } from 'yup'
import Input from '../views/atoms/forms/Input.atom'
import Checkbox from '../views/atoms/forms/Checkbox.atom'
import TextArea from '../views/atoms/forms/TextArea.atom'
import EnvVariablesOrganism from '../views/organisms/ServiceVariables/EnvVariables.organism'
import PortVariablesOrganism from '../views/organisms/ServiceVariables/PortVariables.organism'
import VolumeVariablesOrganism from '../views/organisms/ServiceVariables/VolumeVariables.organism'

export type EditorStructure = {
  [key in DrawerTypes]: EditorForm[]
}

export enum TypeList {
  TEXT = 'text',
  NUMBER = 'number',
  CUSTOM = 'custom',
  PASSWORD = 'password',
}

export interface EditorForm {
  [key: string]: any

  label: string
  key: string
  type: TypeList
  validator?: any
  component: any
}

export const LINKER_STRUCTURE: EditorForm[] = [
  {
    label: 'Container path',
    key: 'containerPath',
    type: TypeList.TEXT,
    component: Input,
    validator: string().nullable()
  }
]

export const ENV_VARIABLE_STRUCTURE: EditorForm[] = [
  {
    label: 'Key',
    key: 'key',
    type: TypeList.TEXT,
    component: Input,
    validator: string().required()
  },
  {
    label: 'Value',
    key: 'value',
    type: TypeList.TEXT,
    component: Input,
    validator: string().required()
  }
]

export const VOLUME_VARIABLE_STRUCTURE: EditorForm[] = [
  {
    label: 'Container path',
    key: 'containerPath',
    type: TypeList.TEXT,
    component: Input,
    validator: string().required()
  },
  {
    label: 'LocalPath',
    key: 'localPath',
    type: TypeList.TEXT,
    component: Input,
    validator: string().required()
  }
]

export const PORT_VARIABLE_STRUCTURE: EditorForm[] = [
  {
    label: 'Private',
    key: 'private',
    type: TypeList.NUMBER,
    component: Input,
    validator: number().required()
  },
  {
    label: 'Public',
    key: 'public',
    type: TypeList.NUMBER,
    component: Input,
    validator: number().required()
  }
]

export const DRAWER_TYPE_STRUCTURES: EditorStructure = {
  [DrawerTypes.SERVICE]: [
    {
      label: 'Name',
      key: 'name',
      type: TypeList.TEXT,
      component: Input,
      validator: string().nullable()
    },
    {
      label: 'Docker Image',
      key: 'dockerImage',
      type: TypeList.TEXT,
      component: Input,
      validator: string().nullable()
    },
    {
      label: 'Docker Tag',
      key: 'dockerTag',
      type: TypeList.TEXT,
      component: Input,
      validator: string().nullable()
    },
    {
      label: 'Entrypoint',
      key: 'entrypoint',
      type: TypeList.TEXT,
      component: Input,
      validator: string().nullable()
    },
    {
      label: 'Description',
      key: 'description',
      type: TypeList.TEXT,
      component: TextArea,
      validator: string().nullable()
    },
    {
      label: 'External',
      key: 'isExternal',
      type: TypeList.TEXT,
      component: Checkbox,
      validator: boolean().nullable()
    },
    {
      label: 'Env variables',
      type: TypeList.CUSTOM,
      key: 'envVariables',
      component: EnvVariablesOrganism
    },
    {
      label: 'Ports',
      type: TypeList.CUSTOM,
      key: 'ports',
      component: PortVariablesOrganism
    },
    {
      label: 'Volumes',
      type: TypeList.CUSTOM,
      key: 'volumes',
      component: VolumeVariablesOrganism
    }
  ],
  [DrawerTypes.NETWORK]: [
    {
      label: 'Name',
      key: 'name',
      type: TypeList.TEXT,
      component: Input,
      validator: string().nullable()
    },
    {
      label: 'Description',
      key: 'description',
      type: TypeList.TEXT,
      component: TextArea,
      validator: string().nullable()
    },
    {
      label: 'External',
      key: 'isExternal',
      type: TypeList.TEXT,
      component: Checkbox,
      validator: boolean().nullable()
    },
    {
      label: 'Driver',
      key: 'driver',
      type: TypeList.TEXT,
      component: Input,
      validator: string().nullable()
    }
  ],
  [DrawerTypes.VOLUME]: [
    {
      label: 'Name',
      key: 'name',
      type: TypeList.TEXT,
      component: Input,
      validator: string().nullable()
    },
    {
      label: 'Description',
      key: 'description',
      type: TypeList.TEXT,
      component: TextArea,
      validator: string().nullable()
    },
    {
      label: 'Container Path',
      key: 'containerPath',
      type: TypeList.TEXT,
      component: Input,
      validator: string().nullable()
    },
    {
      label: 'Local Path',
      key: 'localPath',
      type: TypeList.TEXT,
      component: Input,
      validator: string().nullable()
    }
  ]
}
