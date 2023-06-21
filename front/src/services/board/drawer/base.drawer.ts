import type ServiceFactory from './factories/service.factory'
import ServiceConnector from "./connector/service.connector";
import ServiceLinker from "./linker/service.linker";

class BaseDrawer {
  constructor(readonly factory: ServiceFactory,
              readonly connectors: ServiceConnector[],
              readonly linker: ServiceLinker) {
  }

  draw(): void {
    this.factory.create()

    if (this.factory.selected || this.factory.onHover) {
      this.connectors.forEach((connector) => {
        connector.draw()
      })
    }

    this.linker.drawLinks()
  }
}

export default BaseDrawer
