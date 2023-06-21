import ServiceLinker from "./service.linker";
import {IPosition} from "../../../../interfaces/Position.interface";

class BaseLinker {
  protected linker: ServiceLinker | null = null

  paths: Path2D[] = []

  color: string = 'blue'
  radius: number = 7
  start_angle: number = 0
  end_angle: number = 2 * Math.PI
  offset: number = 20

  setLinker(factory: ServiceLinker): void {
    this.linker = factory
  }

  isSelected(path: Path2D, {x, y}: IPosition): boolean {
    if (this.linker == null) {
      throw new Error('Linked not implemented')
    }

    return this.linker.context.isPointInPath(path, x, y)
  }
}

export default BaseLinker
