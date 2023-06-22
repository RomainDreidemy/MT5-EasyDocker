import { type IPosition } from '../../../../interfaces/Position.interface'
import type ServiceLinker from './service.linker'

class BaseLinker {
  protected linker?: ServiceLinker

  public path: Path2D = new Path2D()

  public selected: boolean = false

  public setLinker (linker: ServiceLinker): void {
    this.linker = linker
  }

  public isSelected ({ x, y }: IPosition): boolean {
    if (this.linker == null) {
      throw new Error('Linker not implemented')
    }

    return this.linker.context.isPointInPath(this.linker.path, x, y)
  }
}

export default BaseLinker
