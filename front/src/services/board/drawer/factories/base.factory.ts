import { type IPosition } from '../../../../interfaces/Position.interface'
import { Errors } from '../../../../enums/errors'
import { type TFactory } from '../../../../types/Factory'

class BaseFactory {
  protected factory?: TFactory

  public path: Path2D = new Path2D()
  public positionX: number = 20
  public positionY: number = 20
  public width: number = 150
  public height: number = 100

  public selected: boolean = false
  public onHover: boolean = false

  public setFactory (factory: TFactory): void {
    this.factory = factory
  }

  public isSelected ({ x, y }: IPosition): boolean {
    if (this.factory == null) {
      throw new Error('Factory not implemented')
    }

    return this.factory.context.isPointInPath(this.factory.path, x, y)
  }

  draw (): void {
    throw new Error(Errors.NOT_IMPLEMENTED)
  }
}

export default BaseFactory
