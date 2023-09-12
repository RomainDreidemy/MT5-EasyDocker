import {type TBaseFactory} from '../../../../types/board/drawer/factories/Base.factory'
import StateFactory from './State.factory'
import {type IPosition} from '../../../../interfaces/Position.interface'
import CommonBases from '../Common.bases'
import {CanvasColor} from '../../../../enums/CanvasColor'
import TextPipe from "../../../../pipes/Text.pipe";
import {DrawerTypes} from "../../../../enums/DrawerTypes";
import {TDrawer} from "../../../../types/Drawer";

const BaseFactory: TBaseFactory = {
  ...CommonBases,
  ...StateFactory,

  create(drawer: TDrawer): void {
    this.drawer = drawer
    this.positionX = isNaN(drawer.entity!.positionX) ? this.positionX : drawer.entity!.positionX
    this.positionY = isNaN(drawer.entity!.positionY) ? this.positionY : drawer.entity!.positionY
  },

  isSelected({x, y}: IPosition): boolean {
    return this.drawer!.context!.isPointInPath(this.path, x, y)
  },

  updatePosition(position: IPosition): void {
    this.positionX = position.x
    this.positionY = position.y
  },

  position(withOffset: number = 0): IPosition {
    return {
      x: this.positionX - withOffset,
      y: this.positionY - withOffset
    }
  },

  draw(): void {
    const context = this.drawer!.context!

    const rectangle = new Path2D()

    if (this.type! === DrawerTypes.SERVICE) {
      const length = (this.drawer!.entity!.envVariables || []).length

      this.height = this.initialHeight + 25 * length
      console.log(this.height)

    }


    context!.beginPath()
    context!.lineWidth = 3
    rectangle.roundRect(this.positionX, this.positionY, this.width, this.height, [10])
    context!.stroke()

    context!.strokeStyle = CanvasColor.BORDER
    context!.fillStyle = this.backgroundColor
    context!.beginPath()
    context!.roundRect(this.positionX, this.positionY, this.width, this.height, [10])

    if (this.selected) {
      context!.strokeStyle = CanvasColor.SELECTED
    } else if (this.onHover) {
      context!.strokeStyle = CanvasColor.ON_HOVER
    }

    context!.stroke(rectangle)
    context!.fill()
    context!.closePath()

    const marginX: number = this.positionX + this.marginText

    context!.fillStyle = '#ffffff'
    context!.font = 'bold 20px Arial'
    context!.fillText(TextPipe.capitalizeFirstLetter(this.drawer!.entity!.name), marginX, this.positionY + 80)

    context!.fillStyle = CanvasColor.CONTENT
    context!.font = '20px Arial'
    context!.fillText(TextPipe.capitalizeFirstLetter(this.type!), marginX, this.positionY + 45)

    if (this.type! === DrawerTypes.SERVICE) {
      console.log(this.drawer!.entity.envVariables)

      const envVariables = (this.drawer!.entity!.envVariables || [])

      if (envVariables.length) {

        context!.fillStyle = CanvasColor.CONTENT
        context!.font = 'bold 15px Arial'
        context!.fillText('Env variables:', marginX, this.positionY + this.topMarginText + 80)


        const y = this.positionY + this.topMarginText + 80

        this.drawer!.entity!.envVariables.forEach((variable, index: number) => {
          console.log(index)
          context!.font = 'bold 13px Arial'
          context!.fillText('Port →', this.positionX + this.width - this.marginText * 5, y + 20 * index)
          context!.font = '13px Arial'
          context!.fillText(variable.key, this.positionX + this.width - this.marginText * 5 + 45, y + 20 * index)
        })

      }
    }

    this.path = rectangle
  }
}

export default BaseFactory
