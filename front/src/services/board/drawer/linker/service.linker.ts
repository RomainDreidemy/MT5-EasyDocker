import ServiceConnector from "../connector/service.connector";
import { Placements } from "../../../../enums/placements";
import {ILink} from "../../../../interfaces/Link.interface";

class ServiceLinker {
  constructor(
    readonly links: ILink[],
    readonly context: CanvasRenderingContext2D
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
    const { positionX, positionY, width, height } = drawer.factory;

    switch (placement) {
      case Placements.TOP:
        this.context.moveTo(positionX + width / 2, positionY);
        break;
      case Placements.BOTTOM:
        this.context.moveTo(positionX + width / 2, positionY + height);
        break;
      case Placements.LEFT:
        this.context.moveTo(positionX, positionY + height / 2);
        break;
      case Placements.RIGHT:
        this.context.moveTo(positionX + width, positionY + height / 2);
        break;
    }
  }

  private defineToPosition(connector: ServiceConnector) {
    const { drawer, position } = connector;
    const { placement } = position;
    const { positionX, positionY, width, height } = drawer.factory;

    switch (placement) {
      case Placements.TOP:
        this.context.lineTo(positionX + width / 2, positionY);
        break;
      case Placements.BOTTOM:
        this.context.lineTo(positionX + width / 2, positionY + height);
        break;
      case Placements.LEFT:
        this.context.lineTo(positionX, positionY + height / 2);
        break;
      case Placements.RIGHT:
        this.context.lineTo(positionX + width, positionY + height / 2);
        break;
    }
  }
}

export default ServiceLinker;
