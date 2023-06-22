import ServiceConnector from "./service.connector";
import {IPosition} from "../../../../interfaces/Position.interface";

class BaseConnector {
  protected connector?: ServiceConnector

  public path: Path2D = new Path2D()

  color: string = 'blue'
  radius: number = 7
  start_angle: number = 0
  end_angle: number = 2 * Math.PI
  public position_x: number = 0
  public position_y: number = 0

  setConnector(factory: ServiceConnector): void {
    this.connector = factory
  }

  isSelected({x, y}: IPosition): boolean {
    if (this.connector == null) {
      throw new Error('Linked not implemented')
    }

    return this.connector.context.isPointInPath(this.path, x, y)
  }
}

export default BaseConnector
