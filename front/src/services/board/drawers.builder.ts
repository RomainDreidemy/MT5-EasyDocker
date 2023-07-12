import {TBoard} from "../../types/Board";
import {TServiceDrawer} from "../../types/board/drawer/Service.drawer";
import {DrawerCreator, TDrawer, TDrawerOrNullify} from "../../types/Drawer";
import {TLinkCreator, TLinkEntity} from "../../types/Linker";
import {Placements} from "../../enums/placements";
import {TConnectorLink} from "../../types/Connector";
import {TDrawerBuilder} from "../../types/board/drawer/Drawer.builder";
import StateDrawers from "./State.drawers";
import {IService} from "../../interfaces/Service.interface";
import {INetwork} from "../../interfaces/Network.interface";
import {IVolume} from "../../interfaces/Volume.interface";
import ServiceDrawer from "./drawer/Service.drawer";
import NetworkDrawer from "./drawer/Network.drawer";
import VolumeDrawer from "./drawer/Volume.drawer";

const DrawersBuilder = (board: TBoard, context: CanvasRenderingContext2D): TDrawerBuilder => {
  return {
    ...StateDrawers(),

    generate() {
      this.generateDrawers()
      this.generateLinks()
    },

    drawers(): TDrawer[] {
      return [...this.serviceDrawers, ...this.networkDrawers, ...this.volumeDrawers]
    },

    generateDrawers(): void {
      this.serviceDrawers = this.createDrawers<IService>(board.services, ServiceDrawer, context);
      this.networkDrawers = this.createDrawers<INetwork>(board.networks, NetworkDrawer, context);
      this.volumeDrawers = this.createDrawers<IVolume>(board.volumes, VolumeDrawer, context);
    },

    generateLinks(): void {
      board.serviceNetworkLinks.forEach((link: TLinkEntity) => {
        const from: TLinkCreator = {
          id: link.serviceId,
          placement: link.serviceArrowPosition,
          drawers: this.serviceDrawers
        }
        const to: TLinkCreator = {
          id: link.networkId,
          placement: link.networkArrowPosition,
          drawers: this.networkDrawers
        }

        this.createLink(link, from, to)
      })

      board.serviceVolumeLinks.forEach((link: TLinkEntity) => {
        const from: TLinkCreator = {
          id: link.serviceId,
          placement: link.serviceArrowPosition,
          drawers: this.serviceDrawers
        }
        const to: TLinkCreator = {
          id: link.volumeId,
          placement: link.volumeArrowPosition,
          drawers: this.volumeDrawers
        }

        this.createLink(link, from, to)
      })
    },

    createDrawers<T>(items: T[], drawerCreator: DrawerCreator<T>, context: CanvasRenderingContext2D): TDrawer[] {
      return items.map(item => {
        const drawer = drawerCreator(item, context);
        drawer.create();
        return drawer;
      });
    },

    createLink(link: TLinkEntity, from: TLinkCreator, to: TLinkCreator) {
      const fromDrawer: TDrawerOrNullify = this.findDrawer(from.drawers, link, from.id)
      const toDrawer: TDrawerOrNullify = this.findDrawer(to.drawers, link, to.id)

      if (!fromDrawer || !toDrawer) return

      const connectors = this.findConnectors(fromDrawer, from.placement, toDrawer, to.placement)

      if (!connectors.from || !connectors.to) return;

      fromDrawer.createLink(connectors.from, connectors.to, link)
    },

    findDrawer(drawers: TDrawer[], link: TLinkEntity, id: string): TDrawerOrNullify {
      return drawers.find((drawer: TServiceDrawer) => drawer.entity!.id === id)
    },

    findConnectors(from: TDrawer, fromPlacement: Placements, to: TDrawer, toPlacement: Placements): TConnectorLink {
      return {
        from: from.findConnectorByPlacement(fromPlacement),
        to: to.findConnectorByPlacement(toPlacement)
      }
    }
  }
}

export default DrawersBuilder