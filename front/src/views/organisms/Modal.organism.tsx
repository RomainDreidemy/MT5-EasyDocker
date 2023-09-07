import React from 'react'
import Button from '../atoms/forms/Button.atom'

const ModalOrganism = ({ children, toggle, onSubmit, buttonText, title }: {
  children: React.ReactNode
  toggle: () => void
  onSubmit?: () => void
  buttonText?: string
  title?: string
}): JSX.Element => {
  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-96 my-6 mx-auto max-w-3xl">
          {/* content */}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* header */}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                {title}
              </h3>
            </div>
            {children}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              { (onSubmit != null) &&
                <Button
                  label={buttonText}
                  onClick={onSubmit}
                  direction={'right'}
                />
              }

              <Button className='btn-ghost ml-4' onClick={toggle} label={'Close'} />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default ModalOrganism
