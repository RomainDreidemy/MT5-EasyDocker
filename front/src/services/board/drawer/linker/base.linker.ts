import ServiceLinker from "./service.linker";
import {IPosition} from "../../../../interfaces/Position.interface";

class BaseLinker {
  protected linker: ServiceLinker | null = null

  public path: Path2D = new Path2D()

  color: string = 'blue'
  radius: number = 7
  start_angle: number = 0
  end_angle: number = 2 * Math.PI

  setLinker(factory: ServiceLinker): void {
    this.linker = factory
  }

  isSelected({x, y}: IPosition): boolean {
    if (this.linker == null) {
      throw new Error('Linked not implemented')
    }

    return this.linker.context.isPointInPath(this.path, x, y)
  }
}

export default BaseLinker
