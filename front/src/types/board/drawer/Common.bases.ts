import { type EditorForm } from '../../../forms/editor.structure'
import { type TOnChange } from '../../../interfaces/Forms/Input.interface'
import { type IForm } from '../../../hooks/useForm'

export interface TCommonBases {
  create: () => void
  draw: () => void
}

export interface TEditor<T> {
  fields: EditorForm[]
  onSubmit: () => void
  onChange: (event: TOnChange) => void
  onDelete?: () => void
  onClose: () => void
  onForm: IForm<T>['setForm']
  entityForm: T
}
