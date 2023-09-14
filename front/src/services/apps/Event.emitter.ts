import { type EventEmitters } from '../../enums/eventEmitters'
import { type EventListenerCallback, type EventListeners } from '../../interfaces/EventListener.interface'

class EventEmitter {
  private listeners: EventListeners<any> = {}

  public on<T> (event: EventEmitters, ...callbacks: Array<EventListenerCallback<T>>): void {
    this.listeners[event] = callbacks
  }

  public emit<T>(event: EventEmitters, data?: any): void {
    this.listeners[event].forEach((callback: EventListenerCallback<T>) => { callback(data) })
  }

  public removeListener (event: EventEmitters): void {
    delete this.listeners[event]
  }
}

const eventEmitter = new EventEmitter()
export default eventEmitter
