import {useEffect, useRef} from "react";
import ServiceDrawer from "../services/board/drawer/service.drawer";
import {IService} from "../interfaces/Service.interface";
import LogicCanvas from "../services/canvas/logic.canvas";

const useBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement

    const logicCanvas = new LogicCanvas(canvas)
    logicCanvas.create()

    const service1: IService = {id: 1, position_x: 100, position_y: 20}
    const serviceDrawer1 = new ServiceDrawer(service1, logicCanvas)

    const service2: IService = {id: 2, position_x: 100, position_y: 400}
    const serviceDrawer2 = new ServiceDrawer(service2, logicCanvas)

    logicCanvas.add(serviceDrawer1, serviceDrawer2)
    logicCanvas.draw()
    logicCanvas.onClickListener()

  }, [canvasRef])

  return {
    canvasRef,
  }
}

export default useBoard