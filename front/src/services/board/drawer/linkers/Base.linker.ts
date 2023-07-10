import { type IPosition } from '../../../../interfaces/Position.interface'
import { type TBaseLinker } from '../../../../types/board/drawer/linkers/Base.linker'
import StateLinker from './State.linker'
import CommonBases from '../Common.bases'
import { type TConnector } from '../../../../types/Connector'
import { Placements } from '../../../../enums/placements'

const BaseLinker: TBaseLinker = {
  ...CommonBases,
  ...StateLinker,

  isSelected ({ x, y }: IPosition): boolean {
    return this.context!.isPointInStroke(this.path, x, y)
  },

  draw (): void {
    const line = new Path2D()

    this.context!.beginPath()
    this.definePosition(this.link!.at, (x, y) => {
      line.moveTo(x, y)
    })
    this.definePosition(this.link!.to, (x, y) => {
      line.lineTo(x, y)
    })

    if (this.selected) {
      this.context!.strokeStyle = '#ff0000'
    } else {
      this.context!.strokeStyle = 'black'
    }
    this.context!.lineWidth = this.width
    this.context!.stroke(line)

    this.path = line
  },

  definePosition (connector: TConnector, line: (x: number, y: number) => void): void {
    const { placement, factory } = connector
    const { positionX, positionY, width, height } = factory!

    switch (placement) {
      case Placements.TOP: {
        line(positionX + width / 2, positionY)
        return
      }

      case Placements.BOTTOM: {
        line(positionX + width / 2, positionY + height)
        return
      }

      case Placements.LEFT: {
        line(positionX, positionY + height / 2)
        return
      }

      case Placements.RIGHT: {
        line(positionX + width, positionY + height / 2)
      }
    }
  }
}

export default BaseLinker
