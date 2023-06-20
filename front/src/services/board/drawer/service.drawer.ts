import {IService} from "../../../interfaces/Service.interface";
import BaseDrawer from "./base.drawer";
import ServiceFactory from "./factories/service.factory";
import ItemBasics from "../item.basics";
import BaseCanvas from "../../canvas/base.canvas";

class ServiceDrawer extends ItemBasics {
  readonly service: IService
  readonly baseCanvas: BaseCanvas

  public factory: ServiceFactory

  constructor(service: IService, baseCanvas: BaseCanvas) {
    super(service, baseCanvas)

    this.service = service
    this.baseCanvas = baseCanvas

    this.factory = new ServiceFactory(service, baseCanvas.context)
  }

  draw() {
    new BaseDrawer(this.factory).draw()
  }
}

export default ServiceDrawer