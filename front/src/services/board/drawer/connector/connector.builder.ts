import { type IPosition } from '../../../../interfaces/Position.interface'
import type serviceFactory from '../factories/service.factory'
import ServiceConnector from './service.connector'
import type ServiceDrawer from '../service.drawer'
import { Placements } from '../../../../enums/placements'

class ConnectorBuilder {
  offset: number = 20

  constructor (
    readonly context: CanvasRenderingContext2D,
    readonly factory: serviceFactory,
    readonly drawer: ServiceDrawer
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
