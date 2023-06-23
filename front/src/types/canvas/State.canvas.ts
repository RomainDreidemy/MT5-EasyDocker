import type ServiceDrawer from '../../services/board/drawer/Service.drawer'
import type ServiceLinker from '../../services/board/drawer/linkers/Service.linker'
import type ServiceConnector from '../../services/board/drawer/connector/Service.connector'

export interface TStateCanvas {
  drawers: ServiceDrawer[]

  selectedLinker?: ServiceLinker
  selectedDrawer?: ServiceDrawer
  selectedConnector?: ServiceConnector
  onHoverDrawer?: ServiceDrawer

  isMoving: boolean
}
