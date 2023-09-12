import BaseFactory from './Base.factory'
import {IVariableName, type TServiceFactory} from '../../../../types/board/drawer/factories/Service.factory'
import {DrawerTypes} from '../../../../enums/DrawerTypes'
import {IService} from "../../../../interfaces/Service.interface";
import {CanvasColor} from "../../../../enums/CanvasColor";
import {IServiceEnvVariable} from "../../../../interfaces/ServiceVariable/EnvVariable.interface";
import {IServiceVolume} from "../../../../interfaces/ServiceVariable/Volume.interface";


const ServiceFactory = (): TServiceFactory => {
  return {
    ...BaseFactory,

    type: DrawerTypes.SERVICE, backgroundColor: '#1f2937',

    beforeDraw(): void {
      const entity = this.drawer!.entity! as IService

      const envVariables = entity.envVariables || []
      if (envVariables.length) {
        this.height = this.initialHeight + 20 * envVariables.length
      }
      const volumes = entity.volumes || []
      if (volumes.length) {
        this.height += this.initialHeight + 20 * volumes.length
      }
    },

    afterDraw(): void {
      const entity = this.drawer!.entity! as IService
      const initialPositionY = this.positionY + this.topMarginText + 80

      const envVariables = entity.envVariables || []
      if (envVariables.length) {
        const name: IVariableName<IServiceEnvVariable> = {
          sectionName: 'Env variables:', variableName: 'Port →', valueDecorator: (variable: IServiceEnvVariable) => {
            return `${variable.key}:${variable.value}`
          }
        }

        const positionY = this.positionY + this.topMarginText + 80
        this.drawSection<IServiceEnvVariable>(name, envVariables, initialPositionY)
      }


      const volumes = entity.volumes || []
      if (volumes.length) {
        const name: IVariableName<IServiceVolume> = {
          sectionName: 'Volumes:', variableName: 'Port →', valueDecorator: (variable: IServiceVolume) => {
            return variable.containerPath
          }
        }

        const positionY =
          envVariables.length
            ? initialPositionY + 25 * envVariables.length
            : initialPositionY


        this.drawSection<IServiceVolume>(name, volumes, positionY)
      }


    },


    drawSection<IVariable>({sectionName, variableName, valueDecorator}: IVariableName<IVariable>, variables: IVariable[], positionY: number): void {
      const context: CanvasRenderingContext2D = this.drawer!.context!
      const marginX: number = this.positionX + this.marginText

      context!.fillStyle = CanvasColor.CONTENT
      context!.font = 'bold 15px Arial'
      context!.fillText(sectionName, marginX, positionY)

      variables.forEach((variable, index: number) => {
        const value = valueDecorator(variable)
        const offset = positionY + 20 * index
        const positionX = marginX + 200

        context!.font = 'bold 13px Arial'
        context!.fillText(variableName, positionX, offset)
        context!.font = '13px Arial'
        context!.fillText(value, positionX + 45, offset)
      })
    }
  }
}

export default ServiceFactory
