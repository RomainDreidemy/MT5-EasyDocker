import { type TStateDrawer } from '../../../types/board/drawer/State.drawer'

const StateDrawer: Omit<TStateDrawer, 'type'> = {
  connectors: [],
  linkers: [],
  canBeLinkedWith: []
}

export default StateDrawer
