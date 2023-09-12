import { type TBaseFactory } from './Base.factory'
import {IService} from "../../../../interfaces/Service.interface";

export type IVariableName<IVariable> = {
  sectionName: string,
  variableName: string,
  valueDecorator: (variable: IVariable) => string
}


export type TServiceFactory =
  TBaseFactory & {
  drawSection: <IVariable>(name: IVariableName<IVariable>, variables: IVariable[], positionY: number) => void
}
