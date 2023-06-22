import type ServiceFactory from './factories/service.factory'
import type ServiceConnector from './connector/service.connector'
import type ServiceLinker from './linker/service.linker'

class BaseDrawer {
  constructor (
    private readonly factory: ServiceFactory,
    private readonly connectors: ServiceConnector[],
    private readonly linkers: ServiceLinker[]
  ) {
  }

  draw (): void {
    this.factory.create()

    if (this.shouldDrawConnectors()) {
      this.drawConnectors()
    }

    this.drawLinkers()
  }

  private shouldDrawConnectors (): boolean {
    return this.factory.selected || this.factory.onHover
  }

  private drawConnectors (): void {
    this.connectors.forEach(connector => {
      connector.draw()
    })
  }

  private drawLinkers (): void {
    this.linkers.forEach(link => {
      link.draw()
    })
  }
}

export default BaseDrawer
