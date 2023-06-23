import React, { useState } from 'react'
import { AiOutlineCheckCircle, AiOutlineClose, AiOutlineInfoCircle, AiOutlineWarning } from 'react-icons/ai'

interface AlertProps {
  message: string
  type: string
}

const Alert = ({ message, type = 'success' }: AlertProps): JSX.Element => {
  const [visible, setVisible] = useState(true)

  const Icons = (type: string): JSX.Element => {
    switch (type) {
      case 'warning':
        return <AiOutlineWarning/>
      case 'info':
        return <AiOutlineInfoCircle/>
      case 'success':
      default:
        return <AiOutlineCheckCircle/>
    }
  }

  const Colors = (type: string): string => {
    switch (type) {
      case 'warning':
        return 'text-red-700 bg-red-100 border-red-300'
      case 'info':
        return 'text-yellow-700 bg-yellow-100 border-yellow-300'
      case 'success':
      default:
        return 'text-green-700 bg-green-100 border-green-300'
    }
  }

  return (
        <div className={`flex justify-center items-center py-1 px-2 my-2 rounded-md border ${Colors(type)} ${!visible ? 'hidden' : ''}`}>
            <div className={'mr-2'}>
                {Icons(type)}
            </div>
            <div className="text-md font-normal max-w-full flex-initial">
                {message}
            </div>
            <div className="flex flex-auto flex-row-reverse cursor-pointer"
                 onClick={() => {
                   setVisible(prevVisible => !prevVisible)
                 }}>
                <AiOutlineClose/>
            </div>
        </div>
  )
}

export default Alert
