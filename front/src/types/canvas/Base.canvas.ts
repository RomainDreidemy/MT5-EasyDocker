import {ISize} from "../../interfaces/Window.interface";

export type TBaseCanvas = {
  canvas?: HTMLCanvasElement;
  context?: CanvasRenderingContext2D;
  create: () => void;
  update: () => void;
  clearArea: () => void;
  updateContext: () => void;
  setCanvasDimensions: (size: ISize) => void;
}