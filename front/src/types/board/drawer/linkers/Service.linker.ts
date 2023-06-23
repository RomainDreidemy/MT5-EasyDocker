import {TBaseLinker} from "./Base.linker";
import {TConnector} from "../../../Connector";

export type TServiceLinker =
  TBaseLinker & {
  definePosition(connector: TConnector, line: (x: number, y: number) => void): void
}