import React, {useEffect, useRef} from "react";
import ServiceDrawer from "../services/board/drawer/service.drawer";
import {IService} from "../interfaces/Service.interface";

const useBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

  const size = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  useEffect(() => {
    // Initialize
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      let ctx = canvasCtxRef.current;

      if (ctx) {
        const service: IService = { id: 1, position_x: 100, position_y: 20}
        new ServiceDrawer(service, ctx).draw()
      }
    }
  }, []);

  return {
    canvasRef,
    props: {...size}
  }
}

export default useBoard