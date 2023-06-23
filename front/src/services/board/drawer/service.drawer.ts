import { type IService } from '../../../interfaces/Service.interface'
import BaseDrawer from './base.drawer'
import ServiceFactory from './factories/service.factory'
import ItemBasics from '../item.basics'
import ConnectorBuilder from './connector/connector.builder'
import ServiceLinker from './linker/service.linker'
import {TConnectors} from "../../../types/TConnector";
import {TLinkers} from "../../../types/TLinker";

class ServiceDrawer extends ItemBasics {
  readonly factory: ServiceFactory
  public Linker: typeof ServiceLinker = ServiceLinker

  public connectors: TConnectors = []
  public linkers: TLinkers = []

  constructor (
    readonly service: IService,
    readonly context: CanvasRenderingContext2D
  ) {
    super(service)
    this.factory = new ServiceFactory(service, context)
  }

  draw (): void {
    this.preProcessActions()
    this.createConnectors()
    this.drawBaseDrawer()
  }

  private preProcessActions (): void {
    this.connectors = []
  }

  private createConnectors (): void {
    const connectorBuilder = new ConnectorBuilder(this.context, this.factory, this)
    this.connectors.push(...connectorBuilder.create())
  }

  private drawBaseDrawer (): void {
    new BaseDrawer(this.factory, this.connectors, this.linkers).draw()
  }
}

export default ServiceDrawer
