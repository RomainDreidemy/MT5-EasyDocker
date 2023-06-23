import {TFactory} from "../../Factory";
import {TConnectors} from "../../Connector";
import {TLinker, TLinkers} from "../../Linker";
import {TEntity} from "../../Entity";
import {TConnectorBuilder} from "./connectors/Connector.builder";
import ServiceLinker from "../../../services/board/drawer/linkers/Service.linker";

export type TStateDrawer = {
  context?: CanvasRenderingContext2D,
  entity?: TEntity
  factory?: TFactory,
  Linker?: typeof ServiceLinker
  Connector?: TConnectorBuilder

  connectors: TConnectors,
  linkers: TLinkers,
}
