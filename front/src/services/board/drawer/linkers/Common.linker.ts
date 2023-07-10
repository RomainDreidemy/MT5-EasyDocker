import { type TDrawer } from '../../../../types/Drawer'
import { type ILink } from '../../../../interfaces/Link.interface'
import BaseLinker from './Base.linker'
import { type TLinker } from '../../../../types/Linker'

const CommonLinker = (drawer: TDrawer, context: CanvasRenderingContext2D, link: ILink): TLinker => {
  return {
    ...BaseLinker,

    create (): void {
      this.context = context
      this.drawer = drawer
      this.link = link
    }
  }
}

export default CommonLinker
