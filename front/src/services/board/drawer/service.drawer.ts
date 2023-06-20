import {IService} from "../../../interfaces/Service.interface";
import BaseDrawer from "./base.drawer";
import ServiceFactory from "./factories/service.factory";
import ItemBasics from "../item.basics";
import BaseCanvas from "../../canvas/base.canvas";

class ServiceDrawer extends ItemBasics {
  readonly service: IService
  readonly baseCanvas: BaseCanvas

  constructor(service: IService, baseCanvas: BaseCanvas) {
    super(service, baseCanvas)

    this.service = service
    this.baseCanvas = baseCanvas
  }

  draw() {
    const factory = new ServiceFactory(this.service, this.baseCanvas.context)

    new BaseDrawer(factory).draw()
  }
}

export default ServiceDrawer