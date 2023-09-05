import React, { useEffect, useState } from 'react'
import StackEntity from '../../services/entities/Stack.entity'
import { type IStack } from '../../interfaces/Stack.interface'
import { Link } from 'react-router-dom'
import NewStackOrganism from '../organisms/NewStack.organism'

const StacksPage = (): JSX.Element => {
  const [stacks, setStacks] = useState<IStack[]>([])

  useEffect(() => {
    (async () => {
      const { data: stacksResponse } = await StackEntity.stacks()

      setStacks(stacksResponse)
    })()
  }, [])

  return (
    <section>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-5'>
        <NewStackOrganism />
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
    </section>
  )
}

export default StacksPage
