import {TBoard} from "../../types/Board";
import {TServiceDrawer} from "../../types/board/drawer/Service.drawer";
import {
  IService,
} from "../../interfaces/Service.interface";
import ServiceDrawer from "./drawer/Service.drawer";
import {INetwork} from "../../interfaces/Network.interface";
import NetworkDrawer from "./drawer/Network.drawer";
import {DrawerCreator, TDrawer, TDrawerOrNullify} from "../../types/Drawer";
import VolumeDrawer from "./drawer/Volume.drawer";
import {IVolume} from "../../interfaces/Volume.interface";
import {TLinkEntity} from "../../types/Linker";
import {IPosition} from "../../interfaces/Position.interface";
import {Placements} from "../../enums/placements";
import {TConnectorLink} from "../../types/Connector";

const createDrawers = <T>(items: T[], drawerCreator: DrawerCreator<T>, context: CanvasRenderingContext2D): TServiceDrawer[] => {
  return items.map(item => {
    const drawer = drawerCreator(item, context);
    drawer.create();
    return drawer;
  });
}

const findDrawer = (drawers: TDrawer[], link: TLinkEntity, id: string): TDrawerOrNullify =>
  drawers.find((drawer: TServiceDrawer) => drawer.entity!.id === id)

const createLink = (link: TLinkEntity, from: TDrawer, fromPlacement: Placements, to: TDrawer, toPlacement: Placements): void => {
  const fromConnector = from.findConnectorByPlacement(fromPlacement)
  const toConnector = to.findConnectorByPlacement(toPlacement)

  if (fromConnector && toConnector) {
    from.createLink(fromConnector, toConnector, link)
  }
}

const findConnectors = (from: TDrawer, fromPlacement: Placements, to: TDrawer, toPlacement: Placements): TConnectorLink => {
  const fromConnector = from.findConnectorByPlacement(fromPlacement)
  const toConnector = to.findConnectorByPlacement(toPlacement)

  return {from: fromConnector, to: toConnector}
}

const DrawersBuilder = (board: TBoard, context: CanvasRenderingContext2D): TDrawer[] => {
  const serviceDrawers: TServiceDrawer[] = createDrawers<IService>(board.services, ServiceDrawer, context);
  const networkDrawers: TServiceDrawer[] = createDrawers<INetwork>(board.networks, NetworkDrawer, context);
  const volumeDrawers: TServiceDrawer[] = createDrawers<IVolume>(board.volumes, VolumeDrawer, context);


  board.serviceNetworkLinks.forEach((link: TLinkEntity) => {
    const serviceDrawer: TDrawerOrNullify = findDrawer(serviceDrawers, link, link.serviceId)
    const networkDrawer: TDrawerOrNullify = findDrawer(networkDrawers, link, link.networkId)

    if (serviceDrawer && networkDrawer) {
      const connectors = findConnectors(serviceDrawer, link.serviceArrowPosition, networkDrawer, link.networkArrowPosition)

      if (connectors.from && connectors.to) {
        serviceDrawer.createLink(connectors.from, connectors.to, link)
      }

    }
  })

  board.serviceVolumeLinks.forEach((link: TLinkEntity) => {
    const serviceDrawer: TDrawerOrNullify = findDrawer(serviceDrawers, link, link.serviceId)
    const networkDrawer: TDrawerOrNullify = findDrawer(volumeDrawers, link, link.volumeId)

    if (serviceDrawer && networkDrawer) {
      const connectors = findConnectors(serviceDrawer, link.serviceArrowPosition, networkDrawer, link.volumeArrowPosition)

      if (connectors.from && connectors.to) {
        serviceDrawer.createLink(connectors.from, connectors.to, link)
      }

    }
  })

  return [...serviceDrawers, ...networkDrawers, ...volumeDrawers]
}

export default DrawersBuilder