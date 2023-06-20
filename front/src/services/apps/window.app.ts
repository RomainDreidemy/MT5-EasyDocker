import {IWidth} from "../../interfaces/Window.interface";

class WindowApp {
  static dimensions(): IWidth {
    const {innerWidth: width, innerHeight: height} = window;

    return {width, height};
  }
}

export default WindowApp