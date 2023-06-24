import { EventEmitters } from "../../enums/eventEmitters";
import { EventListenerCallback, EventListeners } from "../../interfaces/EventListener.interface";

class EventEmitter {
  private listeners: EventListeners = {};

  public on(event: EventEmitters, callback: EventListenerCallback): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  public emit(event: EventEmitters, data?: any): void {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      eventListeners.forEach((callback: EventListenerCallback) => callback(data));
    }
  }

  public removeListener(event: EventEmitters, callback: EventListenerCallback): void {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      const index = eventListeners.indexOf(callback);
      if (index !== -1) {
        eventListeners.splice(index, 1);
      }
    }
  }
}

const eventEmitter = new EventEmitter();
export default eventEmitter;
