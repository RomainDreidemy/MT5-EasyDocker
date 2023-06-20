import {IPosition} from "../../interfaces/Position.interface";

class MouseUtil {
  static onCanvasPosition(canvas: HTMLCanvasElement, event: MouseEvent): IPosition {
    const ClientRect = canvas.getBoundingClientRect();

    return {
      x: Math.round(event.clientX - ClientRect.left),
      y: Math.round(event.clientY - ClientRect.top)
    }
  };
}

export default MouseUtil