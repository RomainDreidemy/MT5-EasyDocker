import { type MutableRefObject, useEffect, useRef } from 'react'
import { type IService } from '../interfaces/Service.interface'
import EventsCanvas from '../services/canvas/Events.canvas'
import { type TServiceDrawer } from '../types/board/drawer/Service.drawer'
import ServiceDrawer from '../services/board/drawer/Service.drawer'
import { type INetwork } from '../interfaces/Network.interface'
import NetworkDrawer from '../services/board/drawer/Network.drawer'
import VolumeDrawer from '../services/board/drawer/Volume.drawer'
import { type IVolume } from '../interfaces/Volume.interface'
import { type EventListenerCallback } from '../interfaces/EventListener.interface'
import eventEmitter from '../services/apps/Event.emitter'
import { EventEmitters } from '../enums/eventEmitters'

const useBoard = (): { canvasRef: MutableRefObject<HTMLCanvasElement | null> } => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement

    EventsCanvas.create(canvas)

    const service: IService = { id: 1, positionX: 100, positionY: 20 }
    const serviceDrawer: TServiceDrawer = ServiceDrawer(service, EventsCanvas.context!)
    serviceDrawer.create()

    const network: INetwork = { id: 2, positionX: 400, positionY: 400 }
    const networkDrawer = NetworkDrawer(network, EventsCanvas.context!)
    networkDrawer.create()

    const volume: IVolume = { id: 2, positionX: 400, positionY: 20 }
    const volumeDrawer = VolumeDrawer(volume, EventsCanvas.context!)
    volumeDrawer.create()

    EventsCanvas.add(serviceDrawer, networkDrawer, volumeDrawer)
    EventsCanvas.startup()
  }, [canvasRef])

  useEffect(() => {
    const onDrawerSelected: EventListenerCallback = (data) => {
      console.log('Moved drawer :', data)
    }
    const onLinkerCreated: EventListenerCallback = (data) => {
      console.log('Created linker :', data)
    }

    eventEmitter.on(EventEmitters.ON_DRAWER_SELECTED, onDrawerSelected)
    eventEmitter.on(EventEmitters.ON_LINKER_CREATED, onLinkerCreated)

    return () => {
      eventEmitter.removeListener(EventEmitters.ON_DRAWER_SELECTED, onDrawerSelected)
      eventEmitter.removeListener(EventEmitters.ON_LINKER_CREATED, onLinkerCreated)
    }
  }, [])

  return {
    canvasRef
  }
}

export default useBoard
