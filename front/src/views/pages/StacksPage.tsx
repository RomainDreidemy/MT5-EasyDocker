import React, { useEffect, useState } from 'react'
import StackEntity from '../../services/entities/Stack.entity'
import { type IStack } from '../../interfaces/Stack.interface'
import { Link } from 'react-router-dom'
import CreateStackModal from '../organisms/CreateStackModal.organism'

const StacksPage = (): JSX.Element => {
  const [stacks, setStacks] = useState<IStack[]>([])
  
  async function getStacks() {
    const { data: stacksResponse } = await StackEntity.stacks()
    setStacks(stacksResponse)
  }

  getStacks()

  return (
    <section>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-5'>
        <button
          onClick={() => window.create_stack_modal.showModal()}
          className="card shadow-md mb-2 rounded bg-blue-100 border border-blue-100 hover:border-blue-200">
          <div className="card-body">
            <h2 className="card-title">+ Create a new stack</h2>
            <p>Click here to create a new stack</p>
          </div>
        </button>
      {
        (stacks.map((stack: IStack) => (
          <Link to={`/stacks/${stack.id}`} key={stack.id} className="card shadow-md mb-2 rounded border border-blue-100 hover:border-blue-200">
            <div className="card-body">
              <h2 className="card-title">{stack.name}</h2>
              <p>{stack.description}</p>
            </div>
          </Link>
        )))
      }
      </div>
      <CreateStackModal stacks={stacks} setStacks={setStacks} />
    </section>
  )
}

export default StacksPage
