import { Placements } from '../../../../enums/placements'
import { type ILink } from '../../../../interfaces/Link.interface'
import BaseLinker from './Base.linker'
import { type TConnector } from '../../../../types/Connector'
import { type TDrawer } from '../../../../types/Drawer'
import { type TServiceLinker } from '../../../../types/board/drawer/linkers/Service.linker'

const ServiceLinker = (drawer: TDrawer, context: CanvasRenderingContext2D, link: ILink): TServiceLinker => {
  return {
    ...BaseLinker,

    create (): void {
      this.context = context
      this.drawer = drawer
      this.link = link
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
}

// class ServiceLinker extends BaseLinker {
//   constructor(
//     readonly drawer: TDrawer,
//     readonly context: CanvasRenderingContext2D,
//     readonly link: ILink
//   ) {
//     super()
//     this.setLinker(this)
//   }
//
//   draw(): void {
//     const line = new Path2D()
//
//     this.context.beginPath()
//     this.definePosition(this.link.at, (x, y) => {
//       line.moveTo(x, y)
//     })
//     this.definePosition(this.link.to, (x, y) => {
//       line.lineTo(x, y)
//     })
//
//     if (this.selected) {
//       this.context.strokeStyle = '#ff0000'
//     } else {
//       this.context.strokeStyle = 'black'
//     }
//     this.context.lineWidth = this.width
//     this.context.stroke(line)
//
//     this.path = line
//   }
//
//   private definePosition(connector: TConnector, line: (x: number, y: number) => void): void {
//     const {placement, factory} = connector
//     const {positionX, positionY, width, height} = factory!
//
//     switch (placement) {
//       case Placements.TOP: {
//         line(positionX + width / 2, positionY)
//         return
//       }
//
//       case Placements.BOTTOM: {
//         line(positionX + width / 2, positionY + height)
//         return
//       }
//
//       case Placements.LEFT: {
//         line(positionX, positionY + height / 2)
//         return
//       }
//
//       case Placements.RIGHT: {
//         line(positionX + width, positionY + height / 2)
//       }
//     }
//   }
// }

export default ServiceLinker
