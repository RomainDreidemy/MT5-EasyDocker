import {IService} from "../../interfaces/Service.interface";

class ItemBasics {
  readonly service: IService

  constructor(service: IService) {
    this.service = service
  }
}

export default ItemBasics