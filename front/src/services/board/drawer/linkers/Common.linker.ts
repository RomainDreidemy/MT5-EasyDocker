import { type TDrawer } from '../../../../types/Drawer'
import { type ILink } from '../../../../interfaces/Link.interface'
import BaseLinker from './Base.linker'
import {TLinkEntity, type TLinker} from '../../../../types/Linker'

const CommonLinker = (drawer: TDrawer, context: CanvasRenderingContext2D, link: ILink, entity?: TLinkEntity): TLinker => {
  return {
    ...BaseLinker,

    create (): void {
      this.context = context
      this.drawer = drawer
      this.link = link
      this.entity = entity
    }
  }
}

export default CommonLinker
