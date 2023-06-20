import {useEffect, useRef} from "react";
import ServiceDrawer from "../services/board/drawer/service.drawer";
import {IService} from "../interfaces/Service.interface";
import BaseCanvas from "../services/canvas/base.canvas";
import LogicCanvas from "../services/canvas/logic.canvas";

const useBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement

    const logicCanvas = new LogicCanvas(canvas)
    logicCanvas.create()

    const service: IService = {id: 1, position_x: 100, position_y: 20}
    const element = new ServiceDrawer(service, logicCanvas)

    logicCanvas.add(element)
    logicCanvas.draw(element)
    logicCanvas.onClick()

  }, [canvasRef])

  return {
    canvasRef,
  }
}

export default useBoard