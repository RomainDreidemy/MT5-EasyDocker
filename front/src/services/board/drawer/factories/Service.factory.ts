import BaseFactory from './Base.factory'
import {IVariableName, type TServiceFactory} from '../../../../types/board/drawer/factories/Service.factory'
import {DrawerTypes} from '../../../../enums/DrawerTypes'
import {IService} from "../../../../interfaces/Service.interface";
import {CanvasColor} from "../../../../enums/CanvasColor";
import {IServiceEnvVariable} from "../../../../interfaces/ServiceVariable/EnvVariable.interface";
import {IServiceVolume} from "../../../../interfaces/ServiceVariable/Volume.interface";
import {IServicePortVariable} from "../../../../interfaces/ServiceVariable/Port.interface";


const ServiceFactory = (): TServiceFactory => {
  return {
    ...BaseFactory,

    type: DrawerTypes.SERVICE, backgroundColor: '#1f2937',

    beforeDraw(): void {
      const entity = this.drawer!.entity! as IService
      // const offset: number = 20
      let height = this.topMarginText + 70

      const offsetY: number = 25
      const offsetSectionY: number = 25

      // height += this.topMarginText

      const envVariables: IServiceEnvVariable[] = entity.envVariables || []
      if (envVariables.length) {
        height += offsetY * envVariables.length + offsetSectionY
      }

      const volumes: IServiceVolume[] = entity.volumes || []
      if (volumes.length) {
        height += offsetY * volumes.length + offsetSectionY
      }

      const ports: IServicePortVariable[] = entity.ports || []
      if (ports.length) {
        height += offsetY * ports.length + offsetSectionY
      }

      this.height = height

      // console.log((envVariables.length + volumes.length + ports.length))
      // this.height = this.height / (envVariables.length + volumes.length + ports.length)
    },

    afterDraw(): void {
      const entity: IService = this.drawer!.entity! as IService
      let positionY: number = this.positionY + this.topMarginText + 70
      const offsetY: number = 25
      const offsetSectionY: number = 25

      const envVariables: IServiceEnvVariable[] = entity.envVariables || []
      if (envVariables.length) {
        const valueDecorator = (variable: IServiceEnvVariable) => {
          return variable.key
        }

        const name: IVariableName<IServiceEnvVariable> = {
          sectionName: 'Env variables:',
          variableName: 'Variable →',
          valueDecorator
        }

        this.drawSection<IServiceEnvVariable>(name, envVariables, positionY)

        positionY += offsetSectionY + offsetY * envVariables.length
      }

      const volumes: IServiceVolume[] = entity.volumes || []
      if (volumes.length) {
        const valueDecorator = (variable: IServiceVolume) => {
          return variable.containerPath
        }

        const name: IVariableName<IServiceVolume> = {
          sectionName: 'Volumes:',
          variableName: 'Volume →',
          valueDecorator
        }

        this.drawSection<IServiceVolume>(name, volumes, positionY)

        positionY += offsetSectionY + offsetSectionY + offsetY * (volumes.length)
      }

      const ports: IServicePortVariable[] = entity.ports || []
      if (ports.length) {
        const valueDecorator = (variable: IServicePortVariable) => {
          return `${variable.public}:${variable.private}`
        }

        const name: IVariableName<IServicePortVariable> = {
          sectionName: 'Ports:',
          variableName: 'Port →',
          valueDecorator
        }

        this.drawSection<IServicePortVariable>(name, ports, positionY)
      }
    },

    drawSection<IVariable>({sectionName, variableName, valueDecorator}: IVariableName<IVariable>, variables: IVariable[], positionY: number): void {
      const context: CanvasRenderingContext2D = this.drawer!.context!
      const marginX: number = this.positionX + this.marginText

      context!.fillStyle = CanvasColor.CONTENT
      context!.font = 'bold 15px Arial'
      context!.fillText(sectionName, marginX, positionY)

      variables.forEach((variable: IVariable, index: number) => {
        const value: string = valueDecorator(variable)
        const newPositionY: number = positionY + 30 + 20 * index
        const positionX: number = this.width - this.marginText + this.positionX

        context!.textAlign = "left";
        context!.font = 'bold 13px Arial'
        context!.fillText(variableName, marginX, newPositionY)

        context!.textAlign = "right";
        context!.font = '13px Arial'
        context!.fillText(value, positionX, newPositionY)
        context!.textAlign = "left";
      })
    }
  }
}

export default ServiceFactory
