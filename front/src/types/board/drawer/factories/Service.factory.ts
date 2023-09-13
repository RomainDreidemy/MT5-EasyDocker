import { type TBaseFactory } from './Base.factory'
import { type IServiceEnvVariable } from '../../../../interfaces/ServiceVariable/EnvVariable.interface'
import { type IServicePortVariable } from '../../../../interfaces/ServiceVariable/Port.interface'
import { type IServiceVolume } from '../../../../interfaces/ServiceVariable/Volume.interface'

export interface IVariableName<IVariable> {
  sectionName: string
  variableName: string
  valueDecorator: (variable: IVariable) => string
}

export type TServiceFactory =
  TBaseFactory & {
    drawSection: <IVariable>(name: IVariableName<IVariable>, variables: IVariable[], positionY: number) => void
    drawEnvVariables: (variables: IServiceEnvVariable[], positionY: number) => void
    drawPorts: (variables: IServicePortVariable[], positionY: number) => void
    drawVolumes: (variables: IServiceVolume[], positionY: number) => void
  }
