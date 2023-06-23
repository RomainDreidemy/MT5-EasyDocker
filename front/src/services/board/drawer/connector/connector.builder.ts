import { type IPosition } from '../../../../interfaces/Position.interface'
import type serviceFactory from '../factories/Service.factory'
import ServiceConnector from './service.connector'
import type ServiceDrawer from '../Service.drawer'
import { Placements } from '../../../../enums/placements'
import {TServiceDrawer} from "../../../../types/board/drawer/Service.drawer";
import {TServiceFactory} from "../../../../types/board/drawer/factories/Service.factory";

class ConnectorBuilder {
  offset: number = 20

  constructor (
    readonly context: CanvasRenderingContext2D,
    readonly factory: TServiceFactory,
    readonly drawer: TServiceDrawer
  ) {
  }

  create (): ServiceConnector[] {
    const positions: IPosition[] = [
      {
        placement: Placements.TOP,
        x: this.factory.positionX + this.factory.width / 2,
        y: this.factory.positionY - this.offset
      },
      {
        placement: Placements.BOTTOM,
        x: this.factory.positionX + this.factory.width / 2,
        y: this.factory.positionY + this.factory.height + this.offset
      },
      {
        placement: Placements.LEFT,
        x: this.factory.positionX - this.offset,
        y: this.factory.positionY + this.factory.height / 2
      },
      {
        placement: Placements.RIGHT,
        x: this.factory.positionX + this.factory.width + this.offset,
        y: this.factory.positionY + this.factory.height / 2
      }
    ]

    return positions.map(position => new ServiceConnector(this.context, this.drawer, position))
  }
}

export default ConnectorBuilder
