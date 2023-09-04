import { type IPosition } from '../../../../interfaces/Position.interface'
import { type TBaseLinker } from '../../../../types/board/drawer/linkers/Base.linker'
import StateLinker from './State.linker'
import CommonBases from '../Common.bases'
import { type TConnector } from '../../../../types/Connector'
import { Placements } from '../../../../enums/placements'
import { CanvasColor } from '../../../../enums/CanvasColor'
import { type TLinkEntity } from '../../../../types/Linker'

const BaseLinker: TBaseLinker = {
  ...CommonBases,
  ...StateLinker,

  isSelected ({ x, y }: IPosition): boolean {
    return this.context!.isPointInStroke(this.path, x, y)
  },

  update (entity: TLinkEntity) {
    this.entity = entity
  },

  draw (): void {
    const line = new Path2D()

    this.context!.beginPath()
    this.definePosition(this.link!.from, (x, y) => {
      line.moveTo(x, y)
    })
    this.definePosition(this.link!.to, (x, y) => {
      line.lineTo(x, y)
    })

    if (this.selected) {
      this.context!.strokeStyle = CanvasColor.SELECTED
    } else {
      this.context!.strokeStyle = CanvasColor.DEFAULT
    }
    this.context!.lineWidth = this.width
    this.context!.stroke(line)

    this.path = line

    const at: IPosition = this.link!.from.drawer!.factory!.position(this.offset)
    const to: IPosition = this.link!.to.drawer!.factory!.position(this.offset)

    this.drawArrow(to, at)
  },

  definePosition (connector: TConnector, line: (x: number, y: number) => void): void {
    const { placement, drawer } = connector
    const { positionX, positionY, width, height } = drawer!.factory!

    switch (placement) {
      case Placements.TOP: {
        line(positionX + width / 2, positionY - this.offset)
        return
      }

      case Placements.BOTTOM: {
        line(positionX + width / 2, positionY + height + this.offset)
        return
      }

      case Placements.LEFT: {
        line(positionX - this.offset, positionY + height / 2)
        return
      }

      case Placements.RIGHT: {
        line(positionX + width + this.offset, positionY + height / 2)
      }
    }
  },

  drawArrow (from: IPosition, at: IPosition): void {
    const angle: number = Math.atan2(at.y - from.y, at.x - from.x)

    this.context!.beginPath()
    if (this.selected) {
      this.context!.strokeStyle = CanvasColor.SELECTED
      this.context!.fillStyle = CanvasColor.SELECTED
    } else {
      this.context!.strokeStyle = CanvasColor.DEFAULT
      this.context!.fillStyle = CanvasColor.DEFAULT
    }
    this.context!.moveTo(from.x, from.y)

    this.definePosition(this.link!.from, (x, y) => {
      this.context!.moveTo(x, y)
    })

    this.definePosition(this.link!.from, (x, y) => {
      this.context!.lineTo(x - this.arrowSize * Math.cos(angle - Math.PI / 6), y - this.arrowSize * Math.sin(angle - Math.PI / 6))
      this.context!.lineTo(x - this.arrowSize * Math.cos(angle + Math.PI / 6), y - this.arrowSize * Math.sin(angle + Math.PI / 6))
    })

    this.context!.closePath()
    this.context!.fill()
  }
}

export default BaseLinker
