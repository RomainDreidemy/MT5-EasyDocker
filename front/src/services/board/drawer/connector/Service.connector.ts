import BaseConnector from './Base.connector'
import {type IPosition} from '../../../../interfaces/Position.interface'
import {TServiceConnector} from "../../../../types/board/drawer/Connectors/Service.connector";
import {TFactory} from "../../../../types/Factory";


const ServiceConnector = (context: CanvasRenderingContext2D, factory: TFactory, position: IPosition): TServiceConnector => {
  return {
    ...BaseConnector,

    create(): void {
      this.context = context
      this.factory = factory
      this.positionX = position.x
      this.positionY = position.y
      this.placement = position.placement!
    },

    draw(): void {
      const circle = new Path2D()

      this.context!.beginPath()
      circle.arc(this.positionX, this.positionY, this.radius, this.startAngle, this.endAngle)
      this.context!.fillStyle = this.color
      this.context!.fill(circle)
      this.context!.closePath()
      this.path = circle
    }
  }
}

export default ServiceConnector
