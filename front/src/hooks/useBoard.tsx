import { type MutableRefObject, useEffect, useRef, useState } from 'react'
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
import { type TDrawerOrNullify } from '../types/Drawer'

const useBoard = (): { canvasRef: MutableRefObject<HTMLCanvasElement | null>, selectedDrawer: TDrawerOrNullify } => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [selectedDrawer, setSelectedDrawer] = useState<TDrawerOrNullify>(undefined)

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
    eventEmitter.on(EventEmitters.ON_SELECTED_DRAWER, onSelectedDrawer)
    eventEmitter.on(EventEmitters.ON_UNSELECTED_DRAWER, onUnselectedDrawer)
    eventEmitter.on(EventEmitters.ON_CREATED_LINKER, onCreatedLinker)

    return () => {
      eventEmitter.removeListener(EventEmitters.ON_SELECTED_DRAWER)
      eventEmitter.removeListener(EventEmitters.ON_UNSELECTED_DRAWER)
      eventEmitter.removeListener(EventEmitters.ON_CREATED_LINKER)
    }
  }, [])

  const onSelectedDrawer: EventListenerCallback = (data) => {
    console.log('Moved drawer :', data)
    setSelectedDrawer(data)
  }
  const onCreatedLinker: EventListenerCallback = (data) => {
    console.log('Created linker :', data)
  }

  const onUnselectedDrawer: EventListenerCallback = (_) => {
    setSelectedDrawer(undefined)
  }

  return {
    canvasRef,
    selectedDrawer
  }
}

export default useBoard
