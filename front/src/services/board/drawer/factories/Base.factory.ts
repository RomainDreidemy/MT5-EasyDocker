import { type TBaseFactory } from '../../../../types/board/drawer/factories/Base.factory'
import StateFactory from './State.factory'
import { type IPosition } from '../../../../interfaces/Position.interface'
import CommonBases from '../Common.bases'

const BaseFactory: TBaseFactory = {
  ...CommonBases,
  ...StateFactory,

  isSelected ({ x, y }: IPosition): boolean {
    return this.context!.isPointInPath(this.path, x, y)
  },

  updatePosition (position: IPosition): void {
    this.positionX = position.x
    this.positionY = position.y
  },

  draw (): void {
    const rectangle = new Path2D()

    this.context!.beginPath()
    rectangle.roundRect(this.positionX, this.positionY, this.width, this.height, [10])

    this.context!.font = '25px Georgia'
    this.context!.lineWidth = 3

    if (this.selected) {
      this.context!.strokeStyle = 'green'
    } else if (this.onHover) {
      this.context!.strokeStyle = 'orange'
    } else {
      this.context!.strokeStyle = 'black'
    }

    this.context!.stroke(rectangle)
    this.context!.fillText('Service', this.positionX + 10, this.positionY + 30)
    this.context!.closePath()

    this.path = rectangle
  }
}

export default BaseFactory
