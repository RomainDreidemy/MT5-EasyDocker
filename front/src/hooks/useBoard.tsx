import { type MutableRefObject, useEffect, useRef } from 'react'
import ServiceDrawer from '../services/board/drawer/service.drawer'
import { type IService } from '../interfaces/Service.interface'
import EventsCanvas from '../services/canvas/events.canvas'

const useBoard = (): { canvasRef: MutableRefObject<HTMLCanvasElement | null> } => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement

    const eventCanvas = new EventsCanvas(canvas)
    eventCanvas.create()

    const service1: IService = { id: 1, positionX: 100, positionY: 20 }
    const serviceDrawer1 = new ServiceDrawer(service1, eventCanvas)

    const service2: IService = { id: 2, positionX: 100, positionY: 400 }
    const serviceDrawer2 = new ServiceDrawer(service2, eventCanvas)

    eventCanvas.add(serviceDrawer1, serviceDrawer2)
    eventCanvas.draw()
    eventCanvas.startup()
  }, [canvasRef])

  return {
    canvasRef
  }
}

export default useBoard
