import React, { type MouseEventHandler } from 'react'

const EntityButtonAtom = ({ name, onClick }: { name: string, onClick: MouseEventHandler }): JSX.Element => (
    <button className="h-[50px] w-full border-b-2 p-2" onClick={onClick}>
      <div className="flex justify-between">
        {name} <span><strong>+</strong></span>
      </div>
    </button>
)

export default EntityButtonAtom
