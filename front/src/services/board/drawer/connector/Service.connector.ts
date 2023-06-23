import BaseConnector from './Base.connector'
import {type IPosition} from '../../../../interfaces/Position.interface'
import {type TServiceConnector} from '../../../../types/board/drawer/connectors/Service.connector'
import {TServiceFactory} from "../../../../types/board/drawer/factories/Service.factory";

const ServiceConnector = (context: CanvasRenderingContext2D, factory: TServiceFactory, position: IPosition): TServiceConnector => {
  return {
    ...BaseConnector,

    create(): void {
      this.context = context
      this.factory = factory
      this.positionX = position.x
      this.positionY = position.y
      this.placement = position.placement!
    },
  }
}

export default ServiceConnector
