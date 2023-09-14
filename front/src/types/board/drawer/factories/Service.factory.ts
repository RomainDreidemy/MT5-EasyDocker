import { type TBaseFactory } from './Base.factory'
import { type IServicePortVariable } from '../../../../interfaces/ServiceVariable/Port.interface'
import { type IServiceVolume } from '../../../../interfaces/ServiceVariable/Volume.interface'
import { type CanvasColor } from '../../../../enums/CanvasColor'

export interface IVariableName<IVariable> {
  outsideName: (variable: IVariable) => string
  insideName: (variable: IVariable) => string
  color: CanvasColor | string
}

export type TServiceFactory =
  TBaseFactory & {
    drawSection: <IVariable>(name: IVariableName<IVariable>, variables: IVariable[], positionY: number) => void
    drawPorts: (variables: IServicePortVariable[], positionY: number) => void
    drawVolumes: (variables: IServiceVolume[], positionY: number) => void
  }
