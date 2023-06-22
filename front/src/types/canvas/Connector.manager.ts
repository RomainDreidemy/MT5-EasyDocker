import {IPosition} from "../../interfaces/Position.interface";
import ServiceConnector from "../../services/board/drawer/connector/service.connector";
import {TStateCanvas} from "./State.Canvas";

export type TConnectorManager =
  TStateCanvas &
  {
    findConnector: (position: IPosition) => ServiceConnector | undefined
  }
