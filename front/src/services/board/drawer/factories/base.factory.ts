import type ServiceFactory from './service.factory'
import { type IPosition } from '../../../../interfaces/Position.interface'

class BaseFactory {
  protected factory?: ServiceFactory

  public path: Path2D = new Path2D()
  public position_x: number = 20
  public position_y: number = 20
  public width: number = 150
  public height: number = 100

  selected: boolean = false
  onHover: boolean = false

  setFactory (factory: ServiceFactory): void {
    this.factory = factory
  }

  isSelected ({ x, y }: IPosition): boolean {
    if (this.factory == null) {
      throw new Error('Factory not implemented')
    }

    return this.factory.context.isPointInPath(this.factory.path, x, y)
  }
}

export default BaseFactory
