import { type IService } from '../../../interfaces/Service.interface'
import BaseDrawer from './base.drawer'
import ServiceFactory from './factories/service.factory'
import ItemBasics from '../item.basics'
import type BaseCanvas from '../../canvas/base.canvas'
import type ServiceConnector from './connector/service.connector'
import ConnectorBuilder from './connector/connector.builder'
import ServiceLinker from './linker/service.linker'

class ServiceDrawer extends ItemBasics {
  readonly factory: ServiceFactory
  public linker: typeof ServiceLinker = ServiceLinker

  public connectors: ServiceConnector[] = []
  public linkers: ServiceLinker[] = []

  constructor (
    readonly service: IService,
    readonly baseCanvas: BaseCanvas
  ) {
    super(service)
    this.factory = new ServiceFactory(service, baseCanvas.context)
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
    const connectorBuilder = new ConnectorBuilder(this.baseCanvas.context, this.factory, this)
    this.connectors.push(...connectorBuilder.create())
  }

  private drawBaseDrawer (): void {
    new BaseDrawer(this.factory, this.connectors, this.linkers).draw()
  }
}

export default ServiceDrawer
