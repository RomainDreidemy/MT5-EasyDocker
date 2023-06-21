import {IService} from '../../../interfaces/Service.interface';
import BaseDrawer from './base.drawer';
import ServiceFactory from './factories/service.factory';
import ItemBasics from '../item.basics';
import type BaseCanvas from '../../canvas/base.canvas';
import ServiceConnector from "./connector/service.connector";
import ConnectorBuilder from "./connector/connector.builder";
import ServiceLinker from "./linker/service.linker";

class ServiceDrawer extends ItemBasics {
  readonly factory: ServiceFactory;
  public connectors: ServiceConnector[] = [];
  public links: ServiceDrawer[] = [];
  public linker: ServiceLinker;

  constructor(readonly service: IService,
              readonly baseCanvas: BaseCanvas) {
    super(service);
    this.factory = new ServiceFactory(service, baseCanvas.context);
    this.linker = new ServiceLinker(this.links, this.baseCanvas.context, this.factory);

  }

  draw(): void {
    this.preProcessActions();

    const linkerBuilder = new ConnectorBuilder(this.baseCanvas.context, this.factory, this);
    this.connectors.push(...linkerBuilder.create());


    new BaseDrawer(
      this.factory,
      this.connectors,
      this.linker
    ).draw();
  }

  private preProcessActions(): void {
    this.connectors = [];
  }
}

export default ServiceDrawer;
