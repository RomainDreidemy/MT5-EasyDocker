import { type MutableRefObject, useEffect, useRef } from 'react'
import ServiceDrawer from '../services/board/drawer/service.drawer'
import { type IService } from '../interfaces/Service.interface'
import EventsCanvas from '../services/canvas/Events.canvas'

const useBoard = (): { canvasRef: MutableRefObject<HTMLCanvasElement | null> } => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement

    EventsCanvas.create(canvas)

    const service1: IService = { id: 1, positionX: 100, positionY: 20 }
    const serviceDrawer1 = new ServiceDrawer(service1, EventsCanvas.context!)

    const service2: IService = { id: 2, positionX: 100, positionY: 400 }
    const serviceDrawer2 = new ServiceDrawer(service2, EventsCanvas.context!)

    EventsCanvas.add(serviceDrawer1, serviceDrawer2)
    EventsCanvas.startup()
  }, [canvasRef])

  return {
    canvasRef
  }
}

export default useBoard
