import BaseFactory from './Base.factory'
import { type IVariableName, type TServiceFactory } from '../../../../types/board/drawer/factories/Service.factory'
import { DrawerTypes } from '../../../../enums/DrawerTypes'
import { type IService } from '../../../../interfaces/Service.interface'
import { CanvasColor } from '../../../../enums/CanvasColor'
import { type IServiceEnvVariable } from '../../../../interfaces/ServiceVariable/EnvVariable.interface'
import { type IServiceVolume } from '../../../../interfaces/ServiceVariable/Volume.interface'
import { type IServicePortVariable } from '../../../../interfaces/ServiceVariable/Port.interface'

const OFFSET_Y: number = 25
const OFFSET_SECTION_Y: number = 25
const OFFSET_ITEMS_Y: number = 30
const OFFSET_ITEM_Y: number = 20

const ServiceFactory = (): TServiceFactory => {
  return {
    ...BaseFactory,

    type: DrawerTypes.SERVICE,

    backgroundColor: '#1f2937',
    titleColor: '#ffffff',

    beforeDraw (): void {
      const entity = this.drawer!.entity! as IService
      let height = this.initialHeight

      const envVariables: IServiceEnvVariable[] = entity.envVariables || []
      if (envVariables.length > 0) {
        height += OFFSET_SECTION_Y + OFFSET_SECTION_Y * envVariables.length
      }

      const volumes: IServiceVolume[] = entity.volumes || []
      if (volumes.length > 0) {
        height += OFFSET_SECTION_Y + OFFSET_SECTION_Y + OFFSET_Y * volumes.length
      }

      const ports: IServicePortVariable[] = entity.ports || []
      if (ports.length > 0) {
        height += OFFSET_SECTION_Y + OFFSET_SECTION_Y + OFFSET_Y * (ports.length)
      }

      this.height = height
    },

    afterDraw (): void {
      const entity: IService = this.drawer!.entity! as IService
      let positionY: number = this.positionY + this.topMarginText + OFFSET_SECTION_Y * 3

      const envVariables: IServiceEnvVariable[] = entity.envVariables || []
      if (envVariables.length > 0) {
        this.drawEnvVariables(envVariables, positionY)

        positionY += OFFSET_ITEMS_Y * 2 + OFFSET_ITEM_Y * envVariables.length
      }

      const volumes: IServiceVolume[] = entity.volumes || []
      if (volumes.length > 0) {
        this.drawVolumes(volumes, positionY)

        positionY += OFFSET_ITEMS_Y * 2 + OFFSET_ITEM_Y * volumes.length
      }

      const ports: IServicePortVariable[] = entity.ports || []
      if (ports.length > 0) {
        this.drawPorts(ports, positionY)
      }
    },

    drawPorts (variables: IServicePortVariable[], positionY: number): void {
      const valueDecorator = (variable: IServicePortVariable) => {
        return `${variable.public}:${variable.private}`
      }

      const name: IVariableName<IServicePortVariable> = {
        sectionName: 'Ports:',
        variableName: 'Port →',
        valueDecorator
      }

      this.drawSection<IServicePortVariable>(name, variables, positionY)
    },

    drawVolumes (variables: IServiceVolume[], positionY: number): void {
      const valueDecorator = (variable: IServiceVolume) => {
        return variable.containerPath
      }

      const name: IVariableName<IServiceVolume> = {
        sectionName: 'Volumes:',
        variableName: 'Volume →',
        valueDecorator
      }

      this.drawSection<IServiceVolume>(name, variables, positionY)
    },

    drawEnvVariables (variables: IServiceEnvVariable[], positionY: number): void {
      const valueDecorator = (variable: IServiceEnvVariable) => {
        return variable.key
      }

      const name: IVariableName<IServiceEnvVariable> = {
        sectionName: 'Env variables:',
        variableName: 'Variable →',
        valueDecorator
      }

      this.drawSection<IServiceEnvVariable>(name, variables, positionY)
    },

    drawSection<IVariable>({ sectionName, variableName, valueDecorator }: IVariableName<IVariable>, variables: IVariable[], positionY: number): void {
      const context: CanvasRenderingContext2D = this.drawer!.context!
      const marginX: number = this.positionX + this.marginText

      context.fillStyle = this.titleColor
      context.font = 'bold 15px Arial'
      context.fillText(sectionName, marginX, positionY)

      variables.forEach((variable: IVariable, index: number) => {
        const value: string = valueDecorator(variable)
        const newPositionY: number = positionY + OFFSET_ITEMS_Y + OFFSET_ITEM_Y * index
        context.textAlign = 'left'

        context.fillStyle = this.textColor

        context.font = 'bold 13px Arial'
        context.fillText(variableName, marginX, newPositionY)
        context.textAlign = 'right'

        const positionRightX: number = this.width - this.marginText + this.positionX
        context.font = '13px Arial'
        context.fillText(value, positionRightX, newPositionY)
        context.textAlign = 'left'
      })
    }
  }
}

export default ServiceFactory
