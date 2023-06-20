import {IService} from "../../interfaces/Service.interface";
import BaseCanvas from "../canvas/base.canvas";

class ItemBasics {
  readonly service: IService
  readonly baseCanvas: BaseCanvas

  constructor(service: IService, canvas: BaseCanvas) {
    this.service = service
    this.baseCanvas = canvas
  }

  onClick() {
  }
}

export default ItemBasics