import React from 'react'

const StackCardOrganism = ({ onOpenModal }: {
  onOpenModal: (undefined: undefined) => void
}): JSX.Element => {
  return (
    <button
      onClick={() => { onOpenModal(undefined) }}
      className="card shadow-md mb-2 rounded bg-blue-100 border border-blue-100 hover:border-blue-200">
      <div className="card-body">
        <h2 className="card-title">+ Create a new stack</h2>
        <p>Click here to create a new stack</p>
      </div>
    </button>
  )
}

export default StackCardOrganism
