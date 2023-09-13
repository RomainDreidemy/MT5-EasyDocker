import { type TMouseEventManager } from '../../types/canvas/MouseEvent.manager'
import { Events } from '../../enums/events'
import { type IPosition } from '../../interfaces/Position.interface'
import BaseManager from './Base.manager'
import LinkerManager from './Linker.manager'
import { DrawerManager } from './Drawer.manager'
import { type TConnector, type TConnectorOrNullify } from '../../types/Connector'
import { type TDrawer, type TDrawerOrNullify } from '../../types/Drawer'
import eventEmitter from '../apps/Event.emitter'
import { EventEmitters } from '../../enums/eventEmitters'
import { type TWheelEventManager } from '../../types/canvas/WheelEvent.manager'

const WheelEventManager: TWheelEventManager = {
  ...BaseManager,
  ...LinkerManager,
  ...DrawerManager,

  wheelStartup (): void {
    this.canvas!.addEventListener(Events.WHEEL, (event) => {
      console.log(event)
      // x += event.deltaX;
      // y += event.deltaY;

      this.drawers.forEach((drawer: TDrawer) => {
        const drawerPosition: IPosition = {
          x: drawer.factory!.positionX + event.deltaX,
          y: drawer.factory!.positionY + event.deltaY
        }

        drawer.factory?.updatePosition(drawerPosition)
      })
      eventEmitter.emit(EventEmitters.ON_MOVED_DRAWERS)

      // this.mouseClickPosition = position
      this.updateScreen()
    })
  }

}

export default WheelEventManager
