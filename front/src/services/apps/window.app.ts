import { type ISize } from '../../interfaces/Window.interface'

class WindowApp {
  static dimensions (): ISize {
    const { innerWidth: width, innerHeight: height } = window

    return { width, height }
  }
}

export default WindowApp
