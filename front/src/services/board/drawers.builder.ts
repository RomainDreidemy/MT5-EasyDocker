import {TBoard} from "../../types/Board";
import {TServiceDrawer} from "../../types/board/drawer/Service.drawer";
import {IService,} from "../../interfaces/Service.interface";
import ServiceDrawer from "./drawer/Service.drawer";
import {INetwork} from "../../interfaces/Network.interface";
import NetworkDrawer from "./drawer/Network.drawer";
import {DrawerCreator, TDrawer, TDrawerOrNullify} from "../../types/Drawer";
import VolumeDrawer from "./drawer/Volume.drawer";
import {IVolume} from "../../interfaces/Volume.interface";
import {TLinkCreator, TLinkEntity} from "../../types/Linker";
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

const findConnectors = (from: TDrawer, fromPlacement: Placements, to: TDrawer, toPlacement: Placements): TConnectorLink => {
  const fromConnector = from.findConnectorByPlacement(fromPlacement)
  const toConnector = to.findConnectorByPlacement(toPlacement)

  return {from: fromConnector, to: toConnector}
}

const createLink = (link: TLinkEntity, from: TLinkCreator, to: TLinkCreator,) => {
  const fromDrawer: TDrawerOrNullify = findDrawer(from.drawers, link, from.id)
  const toDrawer: TDrawerOrNullify = findDrawer(to.drawers, link, to.id)

  if (!fromDrawer || !toDrawer) return

  const connectors = findConnectors(fromDrawer, from.placement, toDrawer, to.placement)

  if (!connectors.from || !connectors.to) return;

  fromDrawer.createLink(connectors.from, connectors.to, link)
}

const DrawersBuilder = (board: TBoard, context: CanvasRenderingContext2D): TDrawer[] => {
  const serviceDrawers: TServiceDrawer[] = createDrawers<IService>(board.services, ServiceDrawer, context);
  const networkDrawers: TServiceDrawer[] = createDrawers<INetwork>(board.networks, NetworkDrawer, context);
  const volumeDrawers: TServiceDrawer[] = createDrawers<IVolume>(board.volumes, VolumeDrawer, context);

  board.serviceNetworkLinks.forEach((link: TLinkEntity) => {
    const from: TLinkCreator = {id: link.serviceId, placement: link.serviceArrowPosition, drawers: serviceDrawers}
    const to: TLinkCreator = {id: link.networkId, placement: link.networkArrowPosition, drawers: networkDrawers}

    createLink(link, from, to)
  })

  board.serviceVolumeLinks.forEach((link: TLinkEntity) => {
    const from: TLinkCreator = {id: link.serviceId, placement: link.serviceArrowPosition, drawers: serviceDrawers}
    const to: TLinkCreator = {id: link.volumeId, placement: link.volumeArrowPosition, drawers: volumeDrawers}

    createLink(link, from, to)
  })

  return [...serviceDrawers, ...networkDrawers, ...volumeDrawers]
}

export default DrawersBuilder