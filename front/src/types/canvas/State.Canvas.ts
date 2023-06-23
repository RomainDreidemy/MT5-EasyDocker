import type ServiceDrawer from '../../services/board/drawer/service.drawer'
import type ServiceLinker from '../../services/board/drawer/linker/service.linker'
import type ServiceConnector from '../../services/board/drawer/connector/service.connector'

export interface TStateCanvas {
  drawers: ServiceDrawer[]

  selectedLinker?: ServiceLinker
  selectedDrawer?: ServiceDrawer
  selectedConnector?: ServiceConnector
  onHoverDrawer?: ServiceDrawer

  isMoving: boolean
}
