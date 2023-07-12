import { type IPosition } from '../../../../interfaces/Position.interface'
import BaseConnector from './Base.connector'
import { type TConnector } from '../../../../types/Connector'
import { type TDrawer } from '../../../../types/Drawer'

const CommonConnector = (drawer: TDrawer, position: IPosition): TConnector => {
  return {
    ...BaseConnector,

    create (): void {
      this.drawer = drawer
      this.positionX = position.x
      this.positionY = position.y
      this.placement = position.placement!
    }
  }
}

export default CommonConnector
