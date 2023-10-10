import { type MutableRefObject, useEffect, useRef, useState } from 'react'
import EventsCanvas from '../services/canvas/Events.canvas'
import { type EventListenerCallback } from '../interfaces/EventListener.interface'
import eventEmitter from '../services/apps/Event.emitter'
import { EventEmitters } from '../enums/eventEmitters'
import { type TDrawer, type TDrawerOrNullify } from '../types/Drawer'
import { type TBoardOrNullify } from '../types/Board'
import DrawersBuilder from '../services/board/drawers.builder'
import { type TLinkBody, type TLinkEntity, type TLinker, type TLinkerOrNullify } from '../types/Linker'
import BoardEntity from '../services/entities/Board.entity'
import UtilsDrawer from '../services/board/Utils.drawer'
import { type AxiosResponse } from 'axios'
import type drawerManager from '../services/entities/Drawer.manager'
import DrawerManager from '../services/entities/Drawer.manager'
import { Errors } from '../enums/errors'

const useBoard = (board: TBoardOrNullify): {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>
  selectedDrawer: TDrawerOrNullify
  selectedLinker: TLinkerOrNullify
} => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [selectedDrawer, setSelectedDrawer] = useState<TDrawerOrNullify>(undefined)
  const [selectedLinker, setSelectedLinker] = useState<TLinkerOrNullify>(undefined)

  const onUpdatedDrawer: EventListenerCallback<TDrawer> = async (drawer: TDrawer) => {
    await onSelectDrawer(drawer, DrawerManager.get)
    EventsCanvas.updateScreen()
  }

  const onSelectedDrawer: EventListenerCallback<TDrawer> = async (drawer: TDrawer) => {
    await onSelectDrawer(drawer, DrawerManager.get)
    EventsCanvas.updateScreen()
  }

  const onMovedDrawer: EventListenerCallback<{ drawer: TDrawer, selectDrawer?: boolean }> = async ({ drawer, selectDrawer }): Promise<void> => {
    drawer.updateEntityPosition()
    await onSelectDrawer(drawer, DrawerManager.update, selectDrawer)
  }

  const onSelectDrawer = async (drawer: TDrawer, method: typeof drawerManager['update' | 'get'], selectDrawer: boolean = true): Promise<void> => {
    const { data: entity } = await method(drawer.entity!, drawer.type!)
    drawer.update(entity)

    if (selectDrawer) setSelectedDrawer(drawer)
  }

  const onMovedDrawers: EventListenerCallback<any> = async () => {
    EventsCanvas.drawers.forEach((drawer: TDrawer) => { onMovedDrawer({ drawer, selectDrawer: false }) })
  }

  const onCreatedLinker: EventListenerCallback<TLinker> = async (linker: TLinker) => {
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
    } else {
      throw new Error(Errors.NOT_IMPLEMENTED)
    }
  }

  const onDeletedLinker: EventListenerCallback<TLinker> = async (linker: TLinker): Promise<void> => {
    if (UtilsDrawer.isServiceNetworkLink(linker)) {
      await BoardEntity.deleteServiceNetworkLink(linker.entity!.id)
    } else if (UtilsDrawer.isServiceVolumeLink(linker)) {
      await BoardEntity.deleteServiceVolumeLink(linker.entity!.id)
    } else {
      throw new Error(Errors.NOT_IMPLEMENTED)
    }
  }

  const onUnselectedDrawer: EventListenerCallback<any> = () => {
    setSelectedDrawer(undefined)
  }

  const onSelectedLinker: EventListenerCallback<TLinker> = (linker: TLinker) => {
    setSelectedLinker(linker)
  }

  const onUnselectedLinker: EventListenerCallback<any> = () => {
    setSelectedLinker(undefined)
  }

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement

    EventsCanvas.create(canvas)
  }, [canvasRef])

  const events = [
    { name: EventEmitters.ON_MOVED_DRAWER, action: onMovedDrawer },
    { name: EventEmitters.ON_CREATED_LINKER, action: onCreatedLinker },
    { name: EventEmitters.ON_DELETED_LINKER, action: onDeletedLinker },
    { name: EventEmitters.ON_SELECTED_DRAWER, action: onSelectedDrawer },
    { name: EventEmitters.ON_UPDATED_DRAWER, action: onUpdatedDrawer },
    { name: EventEmitters.ON_UNSELECTED_DRAWER, action: onUnselectedDrawer },
    { name: EventEmitters.ON_MOVED_DRAWERS, action: onMovedDrawers },
    { name: EventEmitters.ON_SELECTED_LINKER, action: onSelectedLinker },
    { name: EventEmitters.ON_UNSELECTED_LINKER, action: onUnselectedLinker }
  ]

  useEffect(() => {
    if (board == null || EventsCanvas.context == null) return
    EventsCanvas.reset()

    const drawersBuilder = DrawersBuilder(board, EventsCanvas.context)
    drawersBuilder.generate()

    EventsCanvas.add(...drawersBuilder.drawers())
    EventsCanvas.startup()
  }, [board])

  useEffect(() => {
    events.forEach(({ name, action }) => {
      eventEmitter.on<any>(name, action)
    })

    return () => {
      events.forEach(({ name }) => {
        eventEmitter.removeListener(name)
      })
    }
  }, [])

  return {
    canvasRef,
    selectedDrawer,
    selectedLinker
  }
}

export default useBoard
