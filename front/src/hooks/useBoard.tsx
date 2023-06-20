import type React from 'react'
import { useEffect, useRef } from 'react'
import ServiceDrawer from '../services/board/drawer/service.drawer'
import { type IService } from '../interfaces/Service.interface'
import BaseCanvas from '../services/canvas/base.canvas'

const useBoard = (): { canvasRef: React.MutableRefObject<HTMLCanvasElement | null> } => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement
    const baseCanvas = new BaseCanvas(canvas)
    baseCanvas.create()

    const service: IService = { id: 1, position_x: 100, position_y: 20 }
    new ServiceDrawer(service, baseCanvas.context).draw()
  }, [])

  return {
    canvasRef
  }
}

export default useBoard
