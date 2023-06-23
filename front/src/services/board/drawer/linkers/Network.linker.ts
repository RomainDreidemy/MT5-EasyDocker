import {type ILink} from '../../../../interfaces/Link.interface'
import BaseLinker from './Base.linker'
import {type TDrawer} from '../../../../types/Drawer'
import {TNetworkLinker} from "../../../../types/board/drawer/linkers/Network.linker";

const NetworkLinker = (drawer: TDrawer, context: CanvasRenderingContext2D, link: ILink): TNetworkLinker => {
  return {
    ...BaseLinker,
    
    create (): void {
      this.context = context
      this.drawer = drawer
      this.link = link
    }
  }
}

export default NetworkLinker
