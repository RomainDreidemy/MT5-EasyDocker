import type ServiceConnector from './service.connector'
import { type IPosition } from '../../../../interfaces/Position.interface'
import { Errors } from '../../../../enums/errors'

class BaseConnector {
  protected connector?: ServiceConnector
  public path: Path2D = new Path2D()
  public color: string = 'blue'
  public radius: number = 7
  public startAngle: number = 0
  public endAngle: number = 2 * Math.PI
  public positionX: number = 0
  public positionY: number = 0

  public setConnector (factory: ServiceConnector): void {
    this.connector = factory
  }

  public isSelected ({ x, y }: IPosition): boolean {
    if (this.connector == null) {
      throw new Error('Link not implemented')
    }

    return this.connector.context.isPointInPath(this.path, x, y)
  }

  draw (): void {
    throw new Error(Errors.NOT_IMPLEMENTED)
  }
}

export default BaseConnector
