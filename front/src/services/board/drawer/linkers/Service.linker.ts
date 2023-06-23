import {type ILink} from '../../../../interfaces/Link.interface'
import BaseLinker from './Base.linker'
import {type TDrawer} from '../../../../types/Drawer'
import {type TServiceLinker} from '../../../../types/board/drawer/linkers/Service.linker'

const ServiceLinker = (drawer: TDrawer, context: CanvasRenderingContext2D, link: ILink): TServiceLinker => {
  return {
    ...BaseLinker,

    create(): void {
      this.context = context
      this.drawer = drawer
      this.link = link
    }
  }
}

export default ServiceLinker
