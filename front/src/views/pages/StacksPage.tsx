import React, { useEffect, useState } from 'react'
import StackEntity from '../../services/entities/Stack.entity'
import { type IStack } from '../../interfaces/Stack.interface'
import { Link, useNavigate } from 'react-router-dom'
import AuthEntity from '../../services/entities/Auth.entity'

const StacksPage = (): JSX.Element => {
  const navigate = useNavigate()
  const [stacks, setStacks] = useState<IStack[]>([])

  useEffect(() => {
    (async () => {
      const response = await AuthEntity.isLogged()
      if (!response) {
        navigate('/login')
      }
      const { data: stacksResponse } = await StackEntity.stacks()

      setStacks(stacksResponse)
    })()
  }, [])

  return (
    <section>
      <h1 className='text-center mt-4 mb-4'>Stacks list</h1>

      <div className='grid grid-cols-3 gap-2'>
      {
        stacks.length > 0
          ? (stacks.map((stack: IStack) => (
          <div key={stack.id} className="card w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{stack.name}</h2>
              <p>{stack.description}</p>
              <div className="card-actions justify-end">
              <Link className="btn btn-primary" to={`/stacks/${stack.id}`}>View</Link>
              </div>
            </div>
          </div>
            )))
          : <h2>You do not have any stacks yet</h2>
      }
      </div>
    </section>
  )
}

export default StacksPage
