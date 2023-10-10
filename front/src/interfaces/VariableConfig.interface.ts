import { type EditorForm } from '../forms/editor.structure'
import { type Dispatch, type SetStateAction } from 'react'
import { type IconType } from 'react-icons'
import { type AxiosResponse } from 'axios'

export interface IVariableMolecule<IVariableCreate, IVariable> {
  fields: EditorForm[]
  variable?: IVariable
  serviceId: string
  addCallback?: (variable: IVariable) => void
  deleteCallback?: (variable: IVariable) => void
  onDrawerUpdate: () => void
  Requester: IVariableRequest<IVariableCreate, IVariable>
}

export type TVariableMolecule<IVariableCreate, IVariable> = (props: IVariableMolecule<IVariableCreate, IVariable>) => JSX.Element

export interface TVariablesEditor<IVariable, IVariableCreate> {
  variables: IVariable[]
  setVariables: Dispatch<SetStateAction<IVariable[]>>
  buttonText: (open: boolean) => string
  fields: EditorForm[]

  icon: (open: boolean) => IconType
  Component: TVariableMolecule<IVariableCreate, IVariable>
  Requester: IVariableRequest<IVariableCreate, IVariable>
}

export interface IVariableRequest<IVariableCreate, IVariable> {
  create: (serviceId: string, entity: IVariableCreate) => Promise<AxiosResponse<IVariable>>
  update: (entity: IVariable) => Promise<AxiosResponse<IVariable>>
  delete: (id: string) => Promise<any>
}
