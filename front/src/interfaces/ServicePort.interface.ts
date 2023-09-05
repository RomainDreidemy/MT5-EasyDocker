export interface IServicePort {
  id: string

  private: string
  public: string
}

export type IServicePortCreate = Omit<IServicePort, 'id'>
