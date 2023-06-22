import ServiceDrawer from "../../services/board/drawer/service.drawer";
import ServiceLinker from "../../services/board/drawer/linker/service.linker";
import ServiceConnector from "../../services/board/drawer/connector/service.connector";

export type TStateCanvas = {
  drawers: ServiceDrawer[],

  selectedLinker?: ServiceLinker
  selectedDrawer?: ServiceDrawer
  selectedConnector?: ServiceConnector
  onHoverDrawer?: ServiceDrawer

  isMoving: boolean
}