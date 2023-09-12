import { type EditorForm, TypeList } from '../forms/editor.structure'
import Input from '../views/atoms/forms/Input.atom'
import { object, string } from 'yup'

export interface IStack {
  id: number

  description: string
  name: string
}

export interface IStackCreate {
  name: string
  description: string
  file?: File | null
}

export const STACK_STRUCTURE: EditorForm[] = [
  {
    label: 'Name',
    key: 'name',
    type: TypeList.TEXT,
    component: Input,
    validator: string().required()
  },
  {
    label: 'Description',
    key: 'description',
    type: TypeList.TEXT,
    component: Input,
    validator: string().nullable()
  },
  {
    label: 'File',
    key: 'file',
    type: TypeList.FILE,
    component: Input
  }
]
