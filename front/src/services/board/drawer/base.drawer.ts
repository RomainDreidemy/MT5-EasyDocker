import ServiceFactory from "./factories/service.factory";

class BaseDrawer {
  readonly factory

  constructor(factory: ServiceFactory) {
    this.factory = factory
  }

  draw() {
    this.factory.create()
  }
}

export default BaseDrawer