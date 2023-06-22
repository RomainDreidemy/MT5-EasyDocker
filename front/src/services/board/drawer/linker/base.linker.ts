import { type IPosition } from '../../../../interfaces/Position.interface'
import type ServiceLinker from './service.linker'
import { Errors } from '../../../../enums/errors'

class BaseLinker {
  protected linker?: ServiceLinker

  public path: Path2D = new Path2D()

  public selected: boolean = false

  public width: number = 7

  public setLinker (linker: ServiceLinker): void {
    this.linker = linker
  }

  public isSelected ({ x, y }: IPosition): boolean {
    if (this.linker == null) {
      throw new Error('Linker not implemented')
    }

    return this.linker.context.isPointInStroke(this.linker.path, x, y)
  }

  draw (): void {
    throw new Error(Errors.NOT_IMPLEMENTED)
  }
}

export default BaseLinker
