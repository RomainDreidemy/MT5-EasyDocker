import {TFactory} from "../../Factory";
import {TConnectors} from "../../TConnector";
import {TLinkers} from "../../TLinker";
import {IService} from "../../../interfaces/Service.interface";
import ServiceLinker from "../../../services/board/drawer/linker/service.linker";
import ConnectorBuilder from "../../../services/board/drawer/connector/connector.builder";

export type TStateDrawer = {
  context?: CanvasRenderingContext2D,
  entity?: IService
  factory?: TFactory,
  connectors: TConnectors,
  linkers: TLinkers
  Linker?: typeof ServiceLinker
  Connector?: typeof ConnectorBuilder
}
