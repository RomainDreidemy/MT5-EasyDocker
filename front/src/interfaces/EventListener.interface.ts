export type EventListenerCallback<T> = (arg: T) => void

export type EventListeners<T> = Record<string, Array<EventListenerCallback<T>>>
