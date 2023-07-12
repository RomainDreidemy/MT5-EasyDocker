import {type MutableRefObject, useEffect, useRef, useState} from 'react'
import EventsCanvas from '../services/canvas/Events.canvas'
import {type EventListenerCallback} from '../interfaces/EventListener.interface'
import eventEmitter from '../services/apps/Event.emitter'
import {EventEmitters} from '../enums/eventEmitters'
import {type TDrawer, type TDrawerOrNullify} from '../types/Drawer'
import {type TBoardOrNullify} from '../types/Board'
import DrawersBuilder from '../services/board/drawers.builder'
import {type TLinkBody, type TLinkEntity, type TLinker} from '../types/Linker'
import BoardEntity from '../services/entities/Board.entity'
import UtilsDrawer from '../services/board/Utils.drawer'
import {type AxiosResponse} from 'axios'
import ServiceEntity from "../services/entities/Service.entity";
import {IService} from "../interfaces/Service.interface";
import {DrawerTypes} from "../enums/DrawerTypes";
import NetworkEntity from "../services/entities/Network.entity";
import {INetwork} from "../interfaces/Network.interface";
import VolumeEntity from "../services/entities/Volume.entity";
import {IVolume} from "../interfaces/Volume.interface";
import {Errors} from "../enums/errors";

const useBoard = (board: TBoardOrNullify): {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>
  selectedDrawer: TDrawerOrNullify
} => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [selectedDrawer, setSelectedDrawer] = useState<TDrawerOrNullify>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement

    EventsCanvas.create(canvas)
  }, [canvasRef])

  useEffect(() => {
    if (board == null || EventsCanvas.context == null) return

    const drawersBuilder = DrawersBuilder(board, EventsCanvas.context)
    drawersBuilder.generate()

    EventsCanvas.add(...drawersBuilder.drawers())
    EventsCanvas.startup()
  }, [board])

  useEffect(() => {
    eventEmitter.on(EventEmitters.ON_MOVED_DRAWER, onMovedDrawer)
    eventEmitter.on(EventEmitters.ON_SELECTED_DRAWER, onSelectedDrawer)
    eventEmitter.on(EventEmitters.ON_UNSELECTED_DRAWER, onUnselectedDrawer)
    eventEmitter.on(EventEmitters.ON_CREATED_LINKER, onCreatedLinker)
    eventEmitter.on(EventEmitters.ON_DELETED_LINKER, onDeletedLinker)

    return () => {
      eventEmitter.removeListener(EventEmitters.ON_MOVED_DRAWER)
      eventEmitter.removeListener(EventEmitters.ON_SELECTED_DRAWER)
      eventEmitter.removeListener(EventEmitters.ON_UNSELECTED_DRAWER)
      eventEmitter.removeListener(EventEmitters.ON_CREATED_LINKER)
      eventEmitter.removeListener(EventEmitters.ON_DELETED_LINKER)
    }
  }, [])

  const onMovedDrawer: EventListenerCallback = async (drawer: TDrawer) => {
    drawer.entity!.positionX = drawer.factory!.positionX
    drawer.entity!.positionY = drawer.factory!.positionY

    switch (drawer.type) {
      case DrawerTypes.SERVICE:
        return await ServiceEntity.update(drawer.entity! as IService)

      case DrawerTypes.NETWORK:
        return await NetworkEntity.update(drawer.entity! as INetwork)

      case DrawerTypes.VOLUME:
        return await VolumeEntity.update(drawer.entity! as IVolume)

      default:
        throw new Error(Errors.NOT_IMPLEMENTED)
    }
  }

  const onCreatedLinker: EventListenerCallback = async (linker: TLinker) => {
    const response = await createLink(linker)
    if ((response?.data) != null) {
      linker.entity = response?.data
    }
  }

  const createLink = async (linker: TLinker): Promise<AxiosResponse<TLinkEntity> | void> => {
    const linkBody: TLinkBody = UtilsDrawer.createLinkBodyConstructor(linker)

    if (UtilsDrawer.isServiceNetworkLink(linker)) {
      return await BoardEntity.serviceNetworkLink(linkBody)
    } else if (UtilsDrawer.isServiceVolumeLink(linker)) {
      return await BoardEntity.serviceVolumeLink(linkBody)
    }
  }

  const onDeletedLinker: EventListenerCallback = async (linker: TLinker) => {
    if (UtilsDrawer.isServiceNetworkLink(linker)) {
      await BoardEntity.deleteServiceNetworkLink(linker.entity!.id)
    } else if (UtilsDrawer.isServiceVolumeLink(linker)) {
      await BoardEntity.deleteServiceVolumeLink(linker.entity!.id)
    }
  }

  const onUnselectedDrawer: EventListenerCallback = (_) => {
    setSelectedDrawer(undefined)
  }

  const onSelectedDrawer: EventListenerCallback = (drawer: TDrawer) => {
    setSelectedDrawer(drawer)
  }

  return {
    canvasRef,
    selectedDrawer
  }
}

export default useBoard
