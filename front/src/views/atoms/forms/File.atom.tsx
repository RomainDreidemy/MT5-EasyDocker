import React, { type ReactElement } from 'react'
import { type FileProps } from '../../../interfaces/Forms/file.interface'

const File = ({ label, name, value, onChange }: FileProps): ReactElement => {
  return (
    <>
      {(label != null) && <label className="font-semibold text-sm text-gray-600 pb-1 block">{label}</label> }
      <div className="flex items-center justify-center w-full">
        <label htmlFor="file"
               className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            {(value != null)
              ? <p className="text-xs text-gray-500 dark:text-gray-400">{value.name}</p>
              : <>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                <p className="text-xs text-gray-500 dark:text-gray-400">.yml or .yaml file only</p>
              </>
            }
          </div>
          <input id="file" type="file" name="file" className="hidden" onChange={onChange}/>
        </label>
      </div>
    </>
  )
}

export default File
