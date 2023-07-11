import {type MutableRefObject, useEffect, useRef, useState} from 'react'
import {type IService, IServiceNetworkLinks} from '../interfaces/Service.interface'
import EventsCanvas from '../services/canvas/Events.canvas'
import {type TServiceDrawer} from '../types/board/drawer/Service.drawer'
import ServiceDrawer from '../services/board/drawer/Service.drawer'
import {type INetwork} from '../interfaces/Network.interface'
import NetworkDrawer from '../services/board/drawer/Network.drawer'
import {type EventListenerCallback} from '../interfaces/EventListener.interface'
import eventEmitter from '../services/apps/Event.emitter'
import {EventEmitters} from '../enums/eventEmitters'
import {type TDrawerOrNullify} from '../types/Drawer'
import {TBoardOrNullify} from "../types/Board";
import {DrawerTypes} from "../enums/DrawerTypes";
import {ILink} from "../interfaces/Link.interface";

const useBoard = (board: TBoardOrNullify): {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
  selectedDrawer: TDrawerOrNullify
} => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const test: any = {
    services: [
      {
        id: "22e5004d-5f87-403f-9ad7-ef5c02c76317",
        name: "front",
        positionX: 100,
        positionY: 400
      },
      {
        id: "1990c0a7-e23f-483b-b1d2-4fa6dc3d6cc7",
        name: "api",
        positionX: 100,
        positionY: 100
      }
    ],
    networks: [
      {
        id: "fa1865c7-eae0-47c6-b170-01922f57ccf7",
        name: "Mon network",
        positionX: 400,
        positionY: 100
      }
    ],
    serviceNetworkLinks: [
      {
        id: "3c59aadd-2d49-418f-94c1-4d1eb1b2c80d",
        serviceId: "22e5004d-5f87-403f-9ad7-ef5c02c76317",
        networkId: "fa1865c7-eae0-47c6-b170-01922f57ccf7",
        serviceArrowPosition: "top",
        networkArrowPosition: "bottom"
      }
    ]
  }


  const [selectedDrawer, setSelectedDrawer] = useState<TDrawerOrNullify>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement

    EventsCanvas.create(canvas)
  }, [canvasRef])

  useEffect(() => {
    if (board == null) return

    const {services, networks, serviceNetworkLinks} = test

    const serviceDrawers: TServiceDrawer[] = services.map((service: IService) => {
      const serviceDrawer = ServiceDrawer(service, EventsCanvas.context!)
      serviceDrawer.create()

      return serviceDrawer
    })

    const networkDrawers: TServiceDrawer[] = networks.map((network: INetwork) => {
      const serviceDrawer = NetworkDrawer(network, EventsCanvas.context!)
      serviceDrawer.create()

      return serviceDrawer
    })

    const drawers = [...serviceDrawers, ...networkDrawers]

    serviceNetworkLinks.forEach((link: IServiceNetworkLinks) => {
      console.log('link :', link)

      const serviceDrawer: TDrawerOrNullify = drawers.find((drawer: TServiceDrawer) => drawer.entity!.id === link.serviceId && drawer.type === DrawerTypes.SERVICE)
      const networkDrawer: TDrawerOrNullify = drawers.find((drawer: TServiceDrawer) => drawer.entity!.id === link.networkId && drawer.type === DrawerTypes.NETWORK)
      console.log(serviceDrawer, networkDrawer)

      if (serviceDrawer && networkDrawer) {
        const serviceConnector = serviceDrawer.findConnectorByPlacement(link.serviceArrowPosition)
        const networkConnector = networkDrawer.findConnectorByPlacement(link.networkArrowPosition)

        console.log('---- connector')
        console.log(serviceConnector)
        console.log(networkConnector)

        if (serviceConnector && networkConnector) {
          serviceDrawer.createLink(serviceConnector, networkConnector)
        }
      }
    })


    EventsCanvas.add(...drawers)
    EventsCanvas.startup()
  }, [board])

  useEffect(() => {
    eventEmitter.on(EventEmitters.ON_SELECTED_DRAWER, onSelectedDrawer)
    eventEmitter.on(EventEmitters.ON_UNSELECTED_DRAWER, onUnselectedDrawer)
    eventEmitter.on(EventEmitters.ON_CREATED_LINKER, onCreatedLinker)

    return () => {
      eventEmitter.removeListener(EventEmitters.ON_SELECTED_DRAWER)
      eventEmitter.removeListener(EventEmitters.ON_UNSELECTED_DRAWER)
      eventEmitter.removeListener(EventEmitters.ON_CREATED_LINKER)
    }
  }, [])

  const onSelectedDrawer: EventListenerCallback = (data) => {
    console.log('Moved drawer :', data)
    setSelectedDrawer(data)
  }
  const onCreatedLinker: EventListenerCallback = (data) => {
    console.log('Created linker :', data)
  }

  const onUnselectedDrawer: EventListenerCallback = (_) => {
    setSelectedDrawer(undefined)
  }

  return {
    canvasRef,
    selectedDrawer
  }
}

export default useBoard
