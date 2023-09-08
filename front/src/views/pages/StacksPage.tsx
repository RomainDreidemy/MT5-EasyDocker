import React, { useEffect, useState } from 'react'
import StackEntity from '../../services/entities/Stack.entity'
import { type IStack, type IStackCreate } from '../../interfaces/Stack.interface'
import useToggle from '../../hooks/useToggle'
import StackCardOrganism from '../organisms/StackCard.organism'
import CreateStackFormModalOrganism from '../organisms/CreateStackFormModal.organism'
import EditStackFormModalOrganism from '../organisms/EditStackFormModal.organism'

const StacksPage = (): JSX.Element => {
  const [open, toggle] = useToggle()
  const [stacks, setStacks] = useState<IStack[]>([])
  const [selectedStack, setSelectedStack] = useState<IStack | undefined>(undefined)

  const getStacks = async (): Promise<void> => {
    const { data: stacksResponse } = await StackEntity.stacks()
    setStacks(stacksResponse)
  }

  useEffect(() => { getStacks() }, [])

  const onOpenModal = (stack: IStack | undefined): void => {
    setSelectedStack(stack)
    toggle()
  }

  const onDelete = async (id: string): Promise<void> => {
    await StackEntity.delete(id)
    await getStacks()
  }

  const onDuplicate = async (id: string): Promise<void> => {
    await StackEntity.duplicate(id)
    await getStacks()
  }

  const formState = selectedStack == null ? 'create' : 'edit'
  const FormComponent = formState === 'create'
    ? CreateStackFormModalOrganism
    : EditStackFormModalOrganism

  const onSubmit = async (stackEntityForm: IStackCreate): Promise<void> => {
    formState === 'create'
      ? await StackEntity.create(stackEntityForm)
      : await StackEntity.update(stackEntityForm as IStack)

    await getStacks()
    toggle()
  }

  return (
    <section>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-5'>
        <button
          onClick={() => { onOpenModal(undefined) }}
          className="card shadow-md mb-2 rounded bg-blue-100 border border-blue-100 hover:border-blue-200">
          <div className="card-body">
            <h2 className="card-title">+ Create a new stack</h2>
            <p>Click here to create a new stack</p>
          </div>
        </button>
        {
          (stacks.map((stack: IStack) => (
            <StackCardOrganism
              key={stack.id}
              stack={stack}
              id={stack.id.toString()}
              name={stack.name}
              description={stack.description}
              onEdit={() => { onOpenModal(stack) }}
              onDelete={onDelete}
              onDuplicate={onDuplicate}
            />
          )))
        }
      </div>
       {open && <FormComponent
          stack={selectedStack}
          toggle={toggle}
          onSubmit={onSubmit}
       />}
    </section>
  )
}

export default StacksPage
