import { type TBaseFactory } from '../../../../types/board/drawer/factories/Base.factory'
import StateFactory from './State.factory'
import { type IPosition } from '../../../../interfaces/Position.interface'
import CommonBases from '../Common.bases'
import TextPipe from '../../../../pipes/Text.pipe'
import { type TDrawer } from '../../../../types/Drawer'

const BaseFactory: TBaseFactory = {
  ...CommonBases,
  ...StateFactory,

  create (drawer: TDrawer): void {
    this.drawer = drawer
    this.positionX = isNaN(drawer.entity!.positionX) ? this.positionX : drawer.entity!.positionX
    this.positionY = isNaN(drawer.entity!.positionY) ? this.positionY : drawer.entity!.positionY
  },

  isSelected ({ x, y }: IPosition): boolean {
    return this.drawer!.context!.isPointInPath(this.path, x, y)
  },

  updatePosition (position: IPosition): void {
    this.positionX = position.x
    this.positionY = position.y
  },

  position (withOffset: number = 0): IPosition {
    return {
      x: this.positionX - withOffset, y: this.positionY - withOffset
    }
  },

  draw (): void {
    const context = this.drawer!.context!

    const rectangle = new Path2D()

    if (this.beforeDraw != null) this.beforeDraw()

    context.beginPath()
    context.lineWidth = 5
    rectangle.roundRect(this.positionX, this.positionY, this.width, this.height, [10])
    context.stroke()

    context.strokeStyle = this.borderColor
    context.fillStyle = this.backgroundColor
    context.beginPath()
    context.roundRect(this.positionX, this.positionY, this.width, this.height, [10])

    if (this.selected) {
      context.strokeStyle = this.selectedColor
    } else if (this.onHover) {
      context.strokeStyle = this.onHoverColor
    }

    context.stroke(rectangle)
    context.fill()
    context.closePath()

    const marginX: number = this.positionX + this.marginText

    context.fillStyle = this.titleColor
    context.font = 'bold 20px Arial'
    context.fillText(TextPipe.capitalizeFirstLetter(this.drawer!.entity!.name), marginX, this.positionY + 80)

    context.fillStyle = this.textColor
    context.font = '20px Arial'
    context.fillText(TextPipe.capitalizeFirstLetter(this.type!), marginX, this.positionY + 45)

    if (this.afterDraw != null) this.afterDraw()

    this.path = rectangle
  }
}

export default BaseFactory
