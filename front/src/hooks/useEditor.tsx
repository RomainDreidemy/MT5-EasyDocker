import { type TDrawer } from '../types/Drawer'
import { useState } from 'react'
import { type EditorForm, TYPE_STRUCTURES } from '../forms/editor.structure'

const useEditor = (drawer: TDrawer): { fields: EditorForm[] } => {
  const [structure] = useState<EditorForm[]>(TYPE_STRUCTURES[drawer.type!])

  return {
    fields: structure
  }
}

export default useEditor
