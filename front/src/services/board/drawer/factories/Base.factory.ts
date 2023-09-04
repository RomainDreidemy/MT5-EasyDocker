import { type TBaseFactory } from '../../../../types/board/drawer/factories/Base.factory'
import StateFactory from './State.factory'
import { type IPosition } from '../../../../interfaces/Position.interface'
import CommonBases from '../Common.bases'
import { type TEntityOrCreate } from '../../../../types/Entity'
import { CanvasColor } from '../../../../enums/CanvasColor'

const BaseFactory: TBaseFactory = {
  ...CommonBases,
  ...StateFactory,

  create (entity: TEntityOrCreate, context: CanvasRenderingContext2D): void {
    this.context = context
    this.name = entity.name
    this.positionX = isNaN(entity.positionX) ? this.positionX : entity.positionX
    this.positionY = isNaN(entity.positionY) ? this.positionY : entity.positionY
  },

  update (entity: TEntityOrCreate): void {
    this.name = entity.name
  },

  isSelected ({ x, y }: IPosition): boolean {
    return this.context!.isPointInPath(this.path, x, y)
  },

  updatePosition (position: IPosition): void {
    this.positionX = position.x
    this.positionY = position.y
  },

  position (withOffset: number = 0): IPosition {
    return {
      x: this.positionX - withOffset,
      y: this.positionY - withOffset
    }
  },

  draw (): void {
    const rectangle = new Path2D()

    this.context!.beginPath()

    this.context!.beginPath()
    this.context!.lineWidth = 3
    rectangle.roundRect(this.positionX, this.positionY, this.width, this.height, [10])
    this.context!.stroke()

    this.context!.strokeStyle = CanvasColor.BORDER
    this.context!.fillStyle = CanvasColor.BACKGROUND
    this.context!.beginPath()
    this.context!.roundRect(this.positionX, this.positionY, this.width, this.height, [10])

    if (this.selected) {
      this.context!.strokeStyle = CanvasColor.SELECTED
    } else if (this.onHover) {
      this.context!.strokeStyle = CanvasColor.ON_HOVER
    }

    this.context!.stroke(rectangle)
    this.context!.fill()
    this.context!.closePath()

    this.context!.fillStyle = CanvasColor.TITLE
    this.context!.font = 'bold 20px Arial'
    this.context!.fillText(this.name, this.positionX + this.marginText, this.positionY + this.topMarginTitle)

    this.context!.fillStyle = CanvasColor.CONTENT
    this.context!.font = '16px Arial'
    this.context!.fillText(this.type!, this.positionX + this.marginText, this.positionY + this.topMarginText)

    this.path = rectangle
  }
}

export default BaseFactory
