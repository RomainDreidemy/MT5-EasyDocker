import { useState } from 'react'

interface AlertProps {
  message: string
  type: string
}

const Alert = ({ message, type = 'success' }: AlertProps) => {
  const [visible, setVisible] = useState(true)

  const Icons = (type: string) => {
    switch (type) {
      case 'success':
      default:
        return <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-circle w-5 h-5 mx-2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </>
      case 'warning':
        return <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-alert-octagon w-5 h-5 mx-2">
                        <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                </>
      case 'notice':
        return <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-info w-5 h-5 mx-2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                </>
    }
  }

  const Colors = (type: string) => {
    switch (type) {
      case 'success':
      default:
        return 'text-green-700 bg-green-100 border-green-300'
      case 'warning':
        return 'text-red-700 bg-red-100 border-red-300'
      case 'notice':
        return 'text-yellow-700 bg-yellow-100 border-yellow-300'
    }
  }

  return (
        <div className={`flex justify-center items-center py-1 px-2 my-2 rounded-md border ${Colors(type)} ${!visible ? 'hidden' : ''}`}>
            <div slot="avatar">
                {Icons(type)}
            </div>
            <div className="text-md font-normal max-w-full flex-initial">
                {message}
            </div>
            <div className="flex flex-auto flex-row-reverse"
                 onClick={() => { setVisible(prevVisible => !prevVisible) }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x cursor-pointer hover:text-red-400 rounded-full w-5 h-5 ml-2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>
        </div>
  )
}

export default Alert