import BaseFactory from './Base.factory'
import { type IVariableName, type TServiceFactory } from '../../../../types/board/drawer/factories/Service.factory'
import { DrawerTypes } from '../../../../enums/DrawerTypes'
import { type IService } from '../../../../interfaces/Service.interface'
import { type IServiceVolume } from '../../../../interfaces/ServiceVariable/Volume.interface'
import { type IServicePortVariable } from '../../../../interfaces/ServiceVariable/Port.interface'

const OFFSET_SECTION_Y: number = 15
const OFFSET_ITEMS_Y: number = 5
const OFFSET_ITEM_Y: number = 25

const ServiceFactory = (): TServiceFactory => {
  return {
    ...BaseFactory,

    type: DrawerTypes.SERVICE,

    backgroundColor: '#1f2937',
    titleColor: '#ffffff',

    beforeDraw (): void {
      const entity = this.drawer!.entity! as IService
      let height = this.initialHeight

      const volumes: IServiceVolume[] = entity.volumes ?? []
      if (volumes.length > 0) {
        height += OFFSET_ITEMS_Y + OFFSET_ITEM_Y * volumes.length
      }

      const ports: IServicePortVariable[] = entity.ports ?? []
      if (ports.length > 0) {
        height += OFFSET_ITEMS_Y + OFFSET_ITEM_Y * ports.length
      }

      this.height = height
    },

    afterDraw (): void {
      const entity: IService = this.drawer!.entity! as IService
      let positionY: number = this.positionY + this.topMarginText + OFFSET_SECTION_Y * 4

      const volumes: IServiceVolume[] = entity.volumes ?? []
      if (volumes.length > 0) {
        this.drawVolumes(volumes, positionY)

        positionY += OFFSET_ITEMS_Y * 2 + OFFSET_ITEM_Y * volumes.length
      }

      const ports: IServicePortVariable[] = entity.ports ?? []
      if (ports.length > 0) {
        this.drawPorts(ports, positionY)
      }
    },

    drawPorts (variables: IServicePortVariable[], positionY: number): void {
      const name: IVariableName<IServicePortVariable> = {
        outsideName: (variable) => variable.public,
        insideName: (variable) => variable.private,
        color: '#705e9f'
      }

      this.drawSection<IServicePortVariable>(name, variables, positionY)
    },

    drawVolumes (variables: IServiceVolume[], positionY: number): void {
      const name: IVariableName<IServiceVolume> = {
        outsideName: (variable) => variable.localPath,
        insideName: (variable) => variable.containerPath,
        color: '#5e7a9f'
      }

      this.drawSection<IServiceVolume>(name, variables, positionY)
    },

    drawSection<IVariable>({ outsideName, insideName, color }: IVariableName<IVariable>, variables: IVariable[], positionY: number): void {
      const context: CanvasRenderingContext2D = this.drawer!.context!
      const marginX: number = this.positionX

      variables.forEach((variable: IVariable, index: number) => {
        const newPositionY: number = positionY + OFFSET_ITEMS_Y + OFFSET_ITEM_Y * index
        context.fillStyle = this.textColor

        context.textAlign = 'right'
        context.font = 'bold 14px Arial'
        context.fillText(outsideName(variable), marginX - 30, newPositionY)
        context.textAlign = 'left'

        context.beginPath()
        context.roundRect(marginX - 20, newPositionY - 12, 40, 15, [5])
        // context.roundRect(this.positionX, this.positionY, this.width, this.height, [10])

        context.fillStyle = color
        context.fill()
        context.closePath()

        context.fillStyle = this.textColor

        const positionRightX: number = marginX + this.marginText + 15
        context.font = '13px Arial'
        context.fillText(insideName(variable), positionRightX, newPositionY)
        context.textAlign = 'left'
      })
    }
  }
}

export default ServiceFactory
