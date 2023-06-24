export interface EventListenerCallback {
  (data?: any): void;
}

export interface EventListeners {
  [event: string]: EventListenerCallback[];
}