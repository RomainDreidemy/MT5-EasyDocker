import ServiceConnector from "../connector/service.connector";
import {Placements} from "../../../../enums/placements";
import {ILink} from "../../../../interfaces/Link.interface";

class ServiceLinker {
  constructor(readonly links: ILink[],
              readonly context: CanvasRenderingContext2D) {
  }

  drawLinks() {
    this.links.forEach(({at, to}) => {
      this.context.beginPath();
      this.definePosition(at, (x, y) => this.context.moveTo(x, y));
      this.definePosition(to, (x, y) => this.context.lineTo(x, y));
      this.context.stroke();
    });
  }

  private definePosition(connector: ServiceConnector, line: (x: number, y: number) => void) {
    const {drawer, position} = connector;
    const {placement} = position;
    const {positionX, positionY, width, height} = drawer.factory;

    switch (placement) {
      case Placements.TOP:
        return line(positionX + width / 2, positionY);

      case Placements.BOTTOM:
        return line(positionX + width / 2, positionY + height);

      case Placements.LEFT:
        return line(positionX, positionY + height / 2);

      case Placements.RIGHT:
        return line(positionX + width, positionY + height / 2);
    }
  }
}

export default ServiceLinker;
