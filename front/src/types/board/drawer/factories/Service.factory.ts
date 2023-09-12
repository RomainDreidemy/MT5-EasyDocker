import {type TBaseFactory} from './Base.factory'
import {IServiceEnvVariable} from "../../../../interfaces/ServiceVariable/EnvVariable.interface";
import {IServicePortVariable} from "../../../../interfaces/ServiceVariable/Port.interface";
import {IServiceVolume} from "../../../../interfaces/ServiceVariable/Volume.interface";

export type IVariableName<IVariable> = {
  sectionName: string,
  variableName: string,
  valueDecorator: (variable: IVariable) => string
}


export type TServiceFactory =
  TBaseFactory & {
  drawSection: <IVariable>(name: IVariableName<IVariable>, variables: IVariable[], positionY: number) => void
  drawEnvVariables: (variables: IServiceEnvVariable[], positionY: number) => void
  drawPorts: (variables: IServicePortVariable[], positionY: number) => void
  drawVolumes: (variables: IServiceVolume[], positionY: number) => void
}
