import {TStateDrawers} from "./State.drawers";
import {DrawerCreator, TDrawer, TDrawerOrNullify} from "../../Drawer";
import {TLinkCreator, TLinkEntity} from "../../Linker";
import {Placements} from "../../../enums/placements";
import {TConnectorLink} from "../../Connector";

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