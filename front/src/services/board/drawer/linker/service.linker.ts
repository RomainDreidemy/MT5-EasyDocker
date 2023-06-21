import ServiceDrawer from "../service.drawer";
import ServiceFactory from "../factories/service.factory";
import ServiceConnector from "../connector/service.connector";
import {Positions} from "../../../../enums/positions";

class ServiceLinker {

  constructor(readonly links: { drawer: ServiceDrawer, connector: ServiceConnector }[],
              readonly context: CanvasRenderingContext2D,
              readonly factory: ServiceFactory) {
  }

  drawLinks() {
    console.log(this.links)
    this.links.forEach(({drawer, connector}) => {

      console.log(connector.position.position)
      this.context.beginPath()

      switch (connector.position.position) {
        case Positions.LEFT: {
          this.context.moveTo(drawer.factory.position_x, drawer.factory.position_y + drawer.factory.height / 2)
          this.context.lineTo(this.factory.position_x, this.factory.position_y + this.factory.height / 2)
          break
        }
        case Positions.BOTTOM: {
          this.context.moveTo(drawer.factory.position_x + drawer.factory.width / 2, drawer.factory.position_y + drawer.factory.height)
          this.context.lineTo(this.factory.position_x, this.factory.position_y + this.factory.height / 2)
          break
          // x: this.factory.position_x + this.factory.width / 2,
          //   y: this.factory.position_y + this.factory.height + this.offset,
        }

      }


      // this.context.moveTo(drawer.factory.position_x, drawer.factory.position_y + drawer.factory.height / 2)
      // this.context.lineTo(this.factory.position_x, this.factory.position_y + this.factory.height / 2)
      this.context.stroke()
    })
  }
}

export default ServiceLinker