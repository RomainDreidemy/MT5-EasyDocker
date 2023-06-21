import ServiceLinker from "./service.linker";

class BaseLinker {
  protected linker: ServiceLinker | null = null

  radius: number = 5
  color: string = 'blue'

  start_angle: number = 0
  end_angle: number = 2 * Math.PI
  offset: number = 10

  paths: Path2D[] = []

  setLinker(factory: ServiceLinker): void {
    this.linker = factory
  }
}

export default BaseLinker
