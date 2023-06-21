import {IService} from '../../../interfaces/Service.interface';
import BaseDrawer from './base.drawer';
import ServiceFactory from './factories/service.factory';
import ItemBasics from '../item.basics';
import type BaseCanvas from '../../canvas/base.canvas';
import ServiceLinker from "./linker/service.linker";
import LinkersBuilder from "./linker/linkers.builder";

class ServiceDrawer extends ItemBasics {
  readonly factory: ServiceFactory;
  public linkers: ServiceLinker[] = [];

  constructor(readonly service: IService,
              readonly baseCanvas: BaseCanvas) {
    super(service);
    this.factory = new ServiceFactory(service, baseCanvas.context);
  }

  draw(): void {
    this.preProcessActions();

    const linkerBuilder = new LinkersBuilder(this.baseCanvas.context, this.factory);
    this.linkers.push(...linkerBuilder.create());

    new BaseDrawer(this.factory, this.linkers).draw();
  }

  private preProcessActions(): void {
    this.linkers = [];
  }
}

export default ServiceDrawer;
