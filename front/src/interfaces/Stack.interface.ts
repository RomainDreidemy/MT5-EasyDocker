import { type EditorForm } from '../forms/editor.structure'
import Input from '../views/atoms/forms/Input.atom'
import { string } from 'yup'

export interface IStack {
  id: number

  description: string
  name: string
}

export type IStackCreate = Omit<IStack, 'id'>

export const STACK_STRUCTURE: EditorForm[] = [
  {
    label: 'Name',
    key: 'name',
    type: 'text',
    component: Input,
    validator: string().required()
  },
  {
    label: 'Description',
    key: 'description',
    type: 'text',
    component: Input,
    validator: string().nullable()
  }
]
