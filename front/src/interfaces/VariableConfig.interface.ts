import { type EditorForm } from '../forms/editor.structure'
import { type IVariableRequester } from '../services/entities/ServiceEnvVariable.entity'
import { type Dispatch, type SetStateAction } from 'react'
import { type IconType } from 'react-icons'
import { type TDrawer } from '../types/Drawer'

export interface IVariableMolecule<IVariableCreate, IVariable> {
  fields: EditorForm[]
  variable?: IVariable
  serviceId: string
  addCallback?: (variable: IVariable) => void
  deleteCallback?: (variable: IVariable) => void
  Requester: IVariableRequester<IVariableCreate, IVariable>
}

export type TVariableMolecule<IVariableCreate, IVariable> = (props: IVariableMolecule<IVariableCreate, IVariable>) => JSX.Element

export interface TVariablesEditor<IVariable, IVariableCreate> {
  variables: IVariable[]
  setVariables: Dispatch<SetStateAction<IVariable[]>>
  buttonText: (open: boolean) => string
  fields: EditorForm[]

  icon: (open: boolean) => IconType
  Component: TVariableMolecule<IVariableCreate, IVariable>
  Requester: IVariableRequester<IVariableCreate, IVariable>
}

export type TVariableEditorCaller<C> = (drawer: TDrawer) => C
