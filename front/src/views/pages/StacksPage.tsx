import React, { useEffect, useState } from 'react'
import StackEntity from '../../services/entities/Stack.entity'
import { type IStack } from '../../interfaces/Stack.interface'
import StackFormModalOrganism from '../organisms/StackFormModal.organism'
import useToggle from '../../hooks/useToggle'
import StackCardOrganism from '../organisms/StackCard.organism'

const StacksPage = (): JSX.Element => {
  const [open, toggle] = useToggle()
  const [stacks, setStacks] = useState<IStack[]>([])
  const [selectedStack, setSelectedStack] = useState<IStack | undefined>(undefined)
  const getStacks = async (): Promise<void> => {
    const { data: stacksResponse } = await StackEntity.stacks()
    setStacks(stacksResponse)
  }

  useEffect(() => {
    (async () => {
      await getStacks()
    })()
  }, [])

  const openModal = (): void => {
    toggle()
  }

  const onCreate = (): void => {
    setSelectedStack(undefined)
    openModal()
  }

  const onEdit = (stack: IStack): void => {
    setSelectedStack(stack)
    openModal()
  }

  const onDelete = async (id: string): Promise<void> => {
    await StackEntity.delete(id)
    await getStacks()
  }

  return (
    <section>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-5'>
        <button
          onClick={onCreate}
          className="card shadow-md mb-2 rounded bg-blue-100 border border-blue-100 hover:border-blue-200">
          <div className="card-body">
            <h2 className="card-title">+ Create a new stack</h2>
            <p>Click here to create a new stack</p>
          </div>
        </button>
        {
          (stacks.map((stack: IStack) => (
            <StackCardOrganism key={stack.id} stack={stack} id={stack.id.toString()} name={stack.name} description={stack.description} onEdit={onEdit} onDelete={onDelete} />
          )))
        }
      </div>
      {open && <StackFormModalOrganism stack={selectedStack} stacks={stacks} setStacks={setStacks} toggle={toggle}/>}
    </section>
  )
}

export default StacksPage
