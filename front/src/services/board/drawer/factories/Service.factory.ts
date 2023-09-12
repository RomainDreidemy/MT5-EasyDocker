import BaseFactory from './Base.factory'
import {IVariableName, type TServiceFactory} from '../../../../types/board/drawer/factories/Service.factory'
import {DrawerTypes} from '../../../../enums/DrawerTypes'
import {IService} from "../../../../interfaces/Service.interface";
import {CanvasColor} from "../../../../enums/CanvasColor";
import {IServiceEnvVariable} from "../../../../interfaces/ServiceVariable/EnvVariable.interface";
import {IServiceVolume} from "../../../../interfaces/ServiceVariable/Volume.interface";
import {IServicePortVariable} from "../../../../interfaces/ServiceVariable/Port.interface";

const offsetY: number = 25
const offsetSectionY: number = 25
const offsetItemsY: number = 30
const offsetItemY: number = 20

const ServiceFactory = (): TServiceFactory => {
  return {
    ...BaseFactory,

    type: DrawerTypes.SERVICE, backgroundColor: '#1f2937',

    beforeDraw(): void {
      const entity = this.drawer!.entity! as IService
      let height = this.initialHeight

      const envVariables: IServiceEnvVariable[] = entity.envVariables || []
      if (envVariables.length) {
        height += offsetSectionY + offsetSectionY * envVariables.length
      }

      const volumes: IServiceVolume[] = entity.volumes || []
      if (volumes.length) {
        height += offsetSectionY + offsetSectionY + offsetY * volumes.length
      }

      const ports: IServicePortVariable[] = entity.ports || []
      if (ports.length) {
        height += offsetSectionY + offsetSectionY + offsetY * (ports.length)
      }

      this.height = height
    },

    afterDraw(): void {
      const entity: IService = this.drawer!.entity! as IService
      let positionY: number = this.positionY + this.topMarginText + offsetSectionY * 3

      const envVariables: IServiceEnvVariable[] = entity.envVariables || []
      if (envVariables.length) {
        this.drawEnvVariables(envVariables, positionY)

        positionY += offsetItemsY * 2 + offsetItemY * envVariables.length
      }

      const volumes: IServiceVolume[] = entity.volumes || []
      if (volumes.length) {
        this.drawVolumes(volumes, positionY)

        positionY += offsetItemsY * 2 + offsetItemY * volumes.length
      }

      const ports: IServicePortVariable[] = entity.ports || []
      if (ports.length) {
        this.drawPorts(ports, positionY)
      }
    },

    drawPorts(variables: IServicePortVariable[], positionY: number): void {
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

    drawVolumes(variables: IServiceVolume[], positionY: number): void {
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

    drawEnvVariables(variables: IServiceEnvVariable[], positionY: number): void {
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

    drawSection<IVariable>({sectionName, variableName, valueDecorator}: IVariableName<IVariable>, variables: IVariable[], positionY: number): void {
      const context: CanvasRenderingContext2D = this.drawer!.context!
      const marginX: number = this.positionX + this.marginText

      context!.fillStyle = CanvasColor.CONTENT
      context!.font = 'bold 15px Arial'
      context!.fillText(sectionName, marginX, positionY)

      variables.forEach((variable: IVariable, index: number) => {
        const value: string = valueDecorator(variable)
        const newPositionY: number = positionY + offsetItemsY + offsetItemY * index
        context!.textAlign = "left";

        context!.font = 'bold 13px Arial'
        context!.fillText(variableName, marginX, newPositionY)
        context!.textAlign = "right";

        const positionRightX: number = this.width - this.marginText + this.positionX
        context!.font = '13px Arial'
        context!.fillText(value, positionRightX, newPositionY)
        context!.textAlign = "left";
      })
    }
  }
}

export default ServiceFactory
