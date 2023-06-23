import {TServiceConnector} from "./Service.connector";
import {IPosition} from "../../../../interfaces/Position.interface";
import {TConnector} from "../../../Connector";

export type TConnectorBuilder =
  {
    create: () => TServiceConnector[],
    constructor: (position: IPosition) => TConnector
  }