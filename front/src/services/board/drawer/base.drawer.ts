import type ServiceFactory from './factories/service.factory'
import ServiceLinker from "./linker/service.linker";

class BaseDrawer {
  constructor(readonly factory: ServiceFactory,
              readonly linkers: ServiceLinker[]) {
  }

  draw(): void {
    this.factory.create()

    if (this.factory.selected) {
      this.linkers.forEach((linker) => linker.draw())
    }
  }
}

export default BaseDrawer
