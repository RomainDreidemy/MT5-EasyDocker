import ServiceFactory from "./service.factory";
import {IPosition} from "../../../../interfaces/Position.interface";

class BaseFactory {
  protected factory: ServiceFactory | null = null;

  setFactory(factory: ServiceFactory) {
    this.factory = factory;
  }

  isSelected({x, y}: IPosition): Boolean {
    if (!this.factory) {
      throw new Error('Factory not implemented')
    }

    return this.factory.context.isPointInPath(this.factory.path, x, y)
  }
}

export default BaseFactory