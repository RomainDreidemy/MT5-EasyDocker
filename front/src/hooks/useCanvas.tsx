import React, {useRef} from "react";

const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

  const props = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  return {
    canvasRef,
    props
  }
}

export default useCanvas