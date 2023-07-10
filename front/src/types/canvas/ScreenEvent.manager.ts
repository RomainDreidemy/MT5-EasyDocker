import { type TBaseManager } from './Base.manager'

export type TScreenEventManager =
  TBaseManager &
  {
    screenStartup: () => void
  }
