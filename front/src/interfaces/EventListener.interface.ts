export type EventListenerCallback = (data?: any) => void

export type EventListeners = Record<string, EventListenerCallback[]>
