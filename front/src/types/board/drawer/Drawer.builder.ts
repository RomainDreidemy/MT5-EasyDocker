import { type TStateDrawers } from './State.drawers'
import { type DrawerCreator, type TDrawer, type TDrawerOrNullify } from '../../Drawer'
import { type TLinkCreator, type TLinkEntity } from '../../Linker'
import { type Placements } from '../../../enums/placements'
import { type TConnectorLink } from '../../Connector'

export type TDrawerBuilder =
  TStateDrawers &
  {
    drawers: () => TDrawer[]
    generate: () => void
    generateLinks: () => void
    generateDrawers: () => void
    findDrawer: (drawers: TDrawer[], link: TLinkEntity, id: string) => TDrawerOrNullify
    createDrawers: <T>(items: T[], drawerCreator: DrawerCreator<T>, context: CanvasRenderingContext2D) => TDrawer[]
    findConnectors: (from: TDrawer, fromPlacement: Placements, to: TDrawer, toPlacement: Placements) => TConnectorLink
    createLink: (link: TLinkEntity, from: TLinkCreator, to: TLinkCreator) => void
  }
