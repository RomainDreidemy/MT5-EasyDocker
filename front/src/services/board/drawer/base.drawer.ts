import type ServiceFactory from './factories/service.factory'
import type ServiceConnector from './connector/service.connector'
import type ServiceLinker from './linker/service.linker'

class BaseDrawer {
  constructor (private readonly factory: ServiceFactory,
    private readonly connectors: ServiceConnector[],
    private readonly linker: ServiceLinker) {
  }

  draw (): void {
    this.factory.create()

    if (this.shouldDrawConnectors()) {
      this.drawConnectors()
    }

    this.linker.drawLinks()
  }

  private shouldDrawConnectors (): boolean {
    return this.factory.selected || this.factory.onHover
  }

  private drawConnectors (): void {
    this.connectors.forEach(connector => { connector.draw() })
  }
}

export default BaseDrawer
