import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'

const useToggle = (initialValue: boolean = false): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => { setValue((v) => !v) }, [])

  return [value, toggle, setValue]
}

export default useToggle
