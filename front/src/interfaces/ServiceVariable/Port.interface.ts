export interface IServicePortVariable {
  id: string

  private: string
  public: string
}

export type IServicePortVariableCreate = Omit<IServicePortVariable, 'id'>
