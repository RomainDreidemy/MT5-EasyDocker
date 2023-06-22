import {TConnectorManager} from "../../types/canvas/Connector.manager";
import {IPosition} from "../../interfaces/Position.interface";
import ServiceConnector from "../board/drawer/connector/service.connector";
import StateCanvas from "./State.canvas";

export const ConnectorManager: TConnectorManager = {
  ...StateCanvas,

  findConnector(position: IPosition): ServiceConnector | undefined {
    return this.drawers
      .flatMap(drawers => drawers.connectors)
      .find(connector => connector.isSelected(position))
  }
}