import {IService} from '../../../interfaces/Service.interface';
import BaseDrawer from './base.drawer';
import ServiceFactory from './factories/service.factory';
import ItemBasics from '../item.basics';
import type BaseCanvas from '../../canvas/base.canvas';
import ServiceConnector from "./connector/service.connector";
import ConnectorBuilder from "./connector/connector.builder";
import ServiceLinker from "./linker/service.linker";
import {ILink} from "../../../interfaces/Link.interface";

class ServiceDrawer extends ItemBasics {
  readonly factory: ServiceFactory;
  public linker: ServiceLinker;

  public connectors: ServiceConnector[] = [];
  public links: ILink[] = [];

  constructor(readonly service: IService,
              readonly baseCanvas: BaseCanvas) {
    super(service);
    this.factory = new ServiceFactory(service, baseCanvas.context);
    this.linker = new ServiceLinker(this.links, baseCanvas.context);
  }

  draw(): void {
    this.preProcessActions();
    this.createConnectors();
    this.drawBaseDrawer();
  }

  private preProcessActions(): void {
    this.connectors = [];
  }

  private createConnectors(): void {
    const connectorBuilder = new ConnectorBuilder(this.baseCanvas.context, this.factory, this);
    this.connectors.push(...connectorBuilder.create());
  }

  private drawBaseDrawer(): void {
    new BaseDrawer(this.factory, this.connectors, this.linker).draw();
  }
}

export default ServiceDrawer;
