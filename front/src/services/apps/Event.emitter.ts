import { type EventEmitters } from '../../enums/eventEmitters'
import { type EventListenerCallback, type EventListeners } from '../../interfaces/EventListener.interface'

class EventEmitter {
  private listeners: EventListeners = {}

  public on (event: EventEmitters, ...callbacks: EventListenerCallback[]): void {
    this.listeners[event] = callbacks
  }

  public emit (event: EventEmitters, data?: any): void {
    this.listeners[event].forEach((callback: EventListenerCallback) => { callback(data) })
  }

  public removeListener (event: EventEmitters): void {
    delete this.listeners[event]
  }
}

const eventEmitter = new EventEmitter()
export default eventEmitter
