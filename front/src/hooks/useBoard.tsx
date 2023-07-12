import { type MutableRefObject, useEffect, useRef, useState } from 'react'
import EventsCanvas from '../services/canvas/Events.canvas'
import { type EventListenerCallback } from '../interfaces/EventListener.interface'
import eventEmitter from '../services/apps/Event.emitter'
import { EventEmitters } from '../enums/eventEmitters'
import { type TDrawerOrNullify } from '../types/Drawer'
import { type TBoardOrNullify } from '../types/Board'
import DrawersBuilder from '../services/board/drawers.builder'

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
