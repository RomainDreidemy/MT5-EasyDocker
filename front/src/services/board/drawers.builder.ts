import {TBoard} from "../../types/Board";
import {TServiceDrawer} from "../../types/board/drawer/Service.drawer";
import {IService, IServiceNetworkLinks, IServiceVolumeLinks} from "../../interfaces/Service.interface";
import ServiceDrawer from "./drawer/Service.drawer";
import {INetwork} from "../../interfaces/Network.interface";
import NetworkDrawer from "./drawer/Network.drawer";
import {DrawerCreator, TDrawer, TDrawerOrNullify} from "../../types/Drawer";
import VolumeDrawer from "./drawer/Volume.drawer";
import {IVolume} from "../../interfaces/Volume.interface";

const createDrawers = <T>(items: T[], drawerCreator: DrawerCreator<T>, context: CanvasRenderingContext2D): TServiceDrawer[] => {
  return items.map(item => {
    const drawer = drawerCreator(item, context);
    drawer.create();
    return drawer;
  });
}

const createLink = (
  sourceDrawer: TDrawer,
  targetDrawer: TDrawer,
  link: IServiceNetworkLinks | IServiceVolumeLinks
) => {
  if (sourceDrawer && targetDrawer) {
    const sourceConnector = sourceDrawer.findConnectorByPlacement(link.serviceArrowPosition);
    const targetConnector = targetDrawer.findConnectorByPlacement(link.networkArrowPosition);

    if (sourceConnector && targetConnector) {
      sourceDrawer.createLink(sourceConnector, targetConnector, link);
    }
  }
};

const DrawersBuilder = (board: TBoard, context: CanvasRenderingContext2D): TDrawer[] => {
  const serviceDrawers: TServiceDrawer[] = createDrawers<IService>(board.services, ServiceDrawer, context);
  const networkDrawers: TServiceDrawer[] = createDrawers<INetwork>(board.networks, NetworkDrawer, context);
  const volumeDrawers: TServiceDrawer[] = createDrawers<IVolume>(board.volumes, VolumeDrawer, context);


  board.serviceNetworkLinks.forEach((link: IServiceNetworkLinks) => {
    const serviceDrawer: TDrawerOrNullify = serviceDrawers.find((drawer: TServiceDrawer) => drawer.entity!.id === link.serviceId)
    const networkDrawer: TDrawerOrNullify = networkDrawers.find((drawer: TServiceDrawer) => drawer.entity!.id === link.networkId)

    if (serviceDrawer && networkDrawer) {
      const serviceConnector = serviceDrawer.findConnectorByPlacement(link.serviceArrowPosition)
      const networkConnector = networkDrawer.findConnectorByPlacement(link.networkArrowPosition)

      if (serviceConnector && networkConnector) {
        serviceDrawer.createLink(serviceConnector, networkConnector, link)
      }
    }
  })

  board.serviceVolumeLinks.forEach((link: IServiceVolumeLinks) => {
    const serviceDrawer: TDrawerOrNullify = serviceDrawers.find((drawer: TServiceDrawer) => drawer.entity!.id === link.serviceId)
    const networkDrawer: TDrawerOrNullify = volumeDrawers.find((drawer: TServiceDrawer) => drawer.entity!.id === link.volumeId)

    if (serviceDrawer && networkDrawer) {
      const serviceConnector = serviceDrawer.findConnectorByPlacement(link.serviceArrowPosition)
      const networkConnector = networkDrawer.findConnectorByPlacement(link.volumeArrowPosition)

      if (serviceConnector && networkConnector) {
        serviceDrawer.createLink(serviceConnector, networkConnector, link)
      }
    }
  })

  return [...serviceDrawers, ...networkDrawers, ...volumeDrawers]
}

export default DrawersBuilder