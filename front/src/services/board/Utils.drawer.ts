import { type TLinkBody, type TLinkBodyConstructor, type TLinker } from '../../types/Linker'
import { DrawerTypes } from '../../enums/DrawerTypes'

const UtilsDrawer = {
  isServiceNetworkLink: (linker: TLinker): boolean => {
    return linker.link!.from.drawer?.type === DrawerTypes.SERVICE &&
      linker.link!.to.drawer?.type === DrawerTypes.NETWORK
  },

  isServiceVolumeLink: (linker: TLinker): boolean => {
    return linker.link!.from.drawer?.type === DrawerTypes.SERVICE &&
      linker.link!.to.drawer?.type === DrawerTypes.VOLUME
  },

  createLinkBodyConstructor (linker: TLinker): TLinkBody {
    const from: TLinkBodyConstructor = {
      id: linker.link!.from.drawer!.entity!.id,
      placement: linker.link!.from.placement!
    }

    const to: TLinkBodyConstructor = {
      id: linker.link!.to.drawer!.entity!.id,
      placement: linker.link!.to.placement!
    }

    return { from, to }
  }
}

export default UtilsDrawer
