import type ServiceFactory from './factories/service.factory'
import ServiceLinker from "./linker/service.linker";

class BaseDrawer {
  constructor(readonly factory: ServiceFactory,
              readonly linker: ServiceLinker) {
  }

  draw(): void {
    this.factory.create()

    if (this.factory.selected) {
      this.linker.create()
    }
  }
}

export default BaseDrawer
