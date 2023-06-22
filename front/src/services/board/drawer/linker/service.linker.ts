import type ServiceConnector from '../connector/service.connector'
import { Placements } from '../../../../enums/placements'
import { type ILink } from '../../../../interfaces/Link.interface'

class ServiceLinker {
  constructor (
    readonly links: ILink[],
    readonly context: CanvasRenderingContext2D
  ) {
  }

  drawLinks (): void {
    this.links.forEach(({ at, to }) => {
      this.context.beginPath()
      this.definePosition(at, (x, y) => {
        this.context.moveTo(x, y)
      })
      this.definePosition(to, (x, y) => {
        this.context.lineTo(x, y)
      })
      this.context.stroke()
    })
  }

  private definePosition (connector: ServiceConnector, line: (x: number, y: number) => void): void {
    const { drawer, position } = connector
    const { placement } = position
    const { positionX, positionY, width, height } = drawer.factory

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

export default ServiceLinker
