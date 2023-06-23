import {TFactory} from "../../Factory";
import {TConnectors} from "../../Connector";
import {TLinkers} from "../../Linker";
import ServiceLinker from "../../../services/board/drawer/linker/service.linker";
import ConnectorBuilder from "../../../services/board/drawer/connector/connector.builder";
import {TEntity} from "../../Entity";

export type TStateDrawer = {
  context?: CanvasRenderingContext2D,
  entity?: TEntity
  factory?: TFactory,
  connectors: TConnectors,
  linkers: TLinkers
  Linker?: typeof ServiceLinker
  Connector?: typeof ConnectorBuilder
}
