import { type TStateDrawer } from '../../../types/board/drawer/State.drawer'

const StateDrawer = (): TStateDrawer => {
  return {
    connectors: [],
    linkers: [],
    canBeLinkedWith: []
  }
}

export default StateDrawer
