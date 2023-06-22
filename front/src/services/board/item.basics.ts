import { type IService } from '../../interfaces/Service.interface'
import {Errors} from "../../enums/errors";

class ItemBasics {
  constructor (readonly service: IService) {
  }

  draw() {
    throw new Error(Errors.NOT_IMPLEMENTED)
  }
}

export default ItemBasics
