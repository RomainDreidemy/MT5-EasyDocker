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
import {TLinkEntity} from "../types/Linker";
import DrawersBuilder from "../services/board/drawers.builder";
import {Placements} from "../enums/placements";

const useBoard = (board: TBoardOrNullify): {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
  selectedDrawer: TDrawerOrNullify
} => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const test: any = {
    volumes: [
      {
        id: "efefefe-5f87-403f-9ad7-ef5c02c76317",
        name: "volume",
        positionX: 500,
        positionY: 400
      },
    ],
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
      },
    ],
    serviceVolumeLinks: [
      {
        id: "ffeeweokgekoegwkogewko",
        serviceId: "1990c0a7-e23f-483b-b1d2-4fa6dc3d6cc7",
        serviceArrowPosition: "bottom",
        volumeId: "efefefe-5f87-403f-9ad7-ef5c02c76317",
        volumeArrowPosition: "top"
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

    const drawers = DrawersBuilder(test, EventsCanvas.context)
    // const drawers = DrawersBuilder(board)

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
