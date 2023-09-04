import { type Dispatch, type SetStateAction, useState } from 'react'
import { type EditorForm } from '../forms/editor.structure'
import { object } from 'yup'
import { type TOnChange } from '../interfaces/Forms/Input.interface'

export interface IForm<T> {
  onChange: (event: TOnChange) => void
  setForm: Dispatch<SetStateAction<T>>
  form: T
  validatorsSchema: any
}

const useForm = <T>(initialForm: T, formStructure: EditorForm[]): IForm<T> => {
  const [form, setForm] = useState<T>(initialForm)

  const onChange: (event: TOnChange) => void = (event: TOnChange): void => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const validatorsSchema = object(
    formStructure.reduce((acc, field) => ({ [field.name]: field.validator }), {})
  )

  return {
    validatorsSchema,
    onChange,
    setForm,
    form
  }
}

export default useForm
