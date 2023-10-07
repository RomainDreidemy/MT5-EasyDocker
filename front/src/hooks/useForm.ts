import { type Dispatch, type SetStateAction, useState } from 'react'
import { type EditorForm, TypeList } from '../forms/editor.structure'
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

  const convertByType = (event: TOnChange): number | string | boolean | File | null => {
    const { type, value, checked, files }: HTMLInputElement = event.target

    if (type === TypeList.NUMBER) return +value
    if (type === TypeList.CHECKBOX) return checked
    if (type === TypeList.FILE && (files != null)) return files[0]

    return value
  }

  const onChange: (event: TOnChange) => void = (event: TOnChange): void => {
    const value = convertByType(event)

    console.log('=')
    console.log(form)
    console.log(event.target.name, value)

    setForm({ ...form, [event.target.name]: value })
  }

  const validatorsSchema = object(
    formStructure.reduce((acc, field) => ({ [field.key]: field.validator }), {})
  )

  return {
    validatorsSchema,
    onChange,
    setForm,
    form
  }
}

export default useForm
