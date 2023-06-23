export type TStateFactory = {
  context?: CanvasRenderingContext2D,

  path: Path2D;

  positionX: number;
  positionY: number;
  width: number;
  height: number;

  selected: boolean;
  onHover: boolean;
}