import ServiceDrawer from "../service.drawer";
import ServiceFactory from "../factories/service.factory";

class ServiceLinker {
  constructor(readonly links: ServiceDrawer[],
              readonly context: CanvasRenderingContext2D,
              readonly factory: ServiceFactory) {
  }

  drawLinks() {
    console.log(this.links)
    this.links.forEach((link) => {
      this.context.beginPath()
      // this.context.moveTo(link.factory.position_x, link.factory.position_y)
      console.log(link.factory.position_x)
      console.log(this.factory.position_x)
      this.context.moveTo(link.factory.position_x, link.factory.position_y)
      this.context.lineTo(this.factory.position_x, this.factory.position_y)
      this.context.stroke()
    })
  }
}

export default ServiceLinker