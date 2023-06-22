import ServiceFactory from "../factories/service.factory";
import ServiceConnector from "../connector/service.connector";
import { Placements } from "../../../../enums/placements";

class ServiceLinker {
  constructor(
    readonly links: { to: ServiceConnector; at: ServiceConnector }[],
    readonly context: CanvasRenderingContext2D,
    readonly factory: ServiceFactory
  ) {}

  drawLinks() {
    this.links.forEach(({ at, to }) => {
      this.context.beginPath();
      this.defineAtPosition(at);
      this.defineToPosition(to);
      this.context.stroke();
    });
  }

  private defineAtPosition(connector: ServiceConnector) {
    const { drawer, position } = connector;
    const { placement } = position;
    const { position_x, position_y, width, height } = drawer.factory;

    switch (placement) {
      case Placements.TOP:
        this.context.moveTo(position_x + width / 2, position_y);
        break;
      case Placements.BOTTOM:
        this.context.moveTo(position_x + width / 2, position_y + height);
        break;
      case Placements.LEFT:
        this.context.moveTo(position_x, position_y + height / 2);
        break;
      case Placements.RIGHT:
        this.context.moveTo(position_x + width, position_y + height / 2);
        break;
    }
  }

  private defineToPosition(connector: ServiceConnector) {
    const { drawer, position } = connector;
    const { placement } = position;
    const { position_x, position_y, width, height } = drawer.factory;

    switch (placement) {
      case Placements.TOP:
        this.context.lineTo(position_x + width / 2, position_y);
        break;
      case Placements.BOTTOM:
        this.context.lineTo(position_x + width / 2, position_y + height);
        break;
      case Placements.LEFT:
        this.context.lineTo(position_x, position_y + height / 2);
        break;
      case Placements.RIGHT:
        this.context.lineTo(position_x + width, position_y + height / 2);
        break;
    }
  }
}

export default ServiceLinker;
