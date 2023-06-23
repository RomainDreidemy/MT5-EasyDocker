import { type MutableRefObject, useEffect, useRef } from 'react'
import { type IService } from '../interfaces/Service.interface'
import EventsCanvas from '../services/canvas/Events.canvas'
import { type TServiceDrawer } from '../types/board/drawer/Service.drawer'
import ServiceDrawer from '../services/board/drawer/Service.drawer'
import {INetwork} from "../interfaces/Network.interface";
import NetworkDrawer from "../services/board/drawer/Network.drawer";

const useBoard = (): { canvasRef: MutableRefObject<HTMLCanvasElement | null> } => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement

    EventsCanvas.create(canvas)

    const service1: IService = { id: 1, positionX: 100, positionY: 20 }
    const serviceDrawer1: TServiceDrawer = ServiceDrawer(service1, EventsCanvas.context!)
    serviceDrawer1.create()

    const service2: IService = { id: 2, positionX: 100, positionY: 400 }
    const serviceDrawer2 = ServiceDrawer(service2, EventsCanvas.context!)
    serviceDrawer2.create()

    const network: INetwork = { id: 2, positionX: 400, positionY: 400 }
    const networkDrawer = NetworkDrawer(network, EventsCanvas.context!)
    networkDrawer.create()

    EventsCanvas.add(serviceDrawer1, serviceDrawer2, networkDrawer)
    EventsCanvas.startup()
  }, [canvasRef])

  return {
    canvasRef
  }
}

export default useBoard
