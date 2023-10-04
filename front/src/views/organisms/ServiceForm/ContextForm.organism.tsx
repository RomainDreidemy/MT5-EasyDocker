import React from 'react'
import Radio from '../../atoms/forms/RadioButton.atom'
import Input from '../../atoms/forms/Input.atom'

// const CONTAINER: EditorForm[] = [
//   {
//     label: 'Container name',
//     key: 'containerName',
//     type: TypeList.TEXT,
//     component: Input,
//     validator: string().nullable(),
//     maxLength: 25
//   },
//   {
//     label: 'Docker Image',
//     key: 'dockerImage',
//     type: TypeList.TEXT,
//     component: Input,
//     validator: string().nullable()
//   }
// ]
//
// const CONTEXT: EditorForm[] = [
//   {
//     label: 'Context',
//     key: 'context',
//     type: TypeList.TEXT,
//     component: Input,
//     validator: string().nullable(),
//     maxLength: 25
//   },
//   {
//     label: 'Docker File',
//     key: 'dockerFile',
//     type: TypeList.TEXT,
//     component: Input,
//     validator: string().nullable()
//   }
// ]

const ContextFormOrganism = ({}) => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap -mx-2 p-2 ">
        <div className="w-1/2">
          <Radio label="Container"/>
        </div>
        <div className="w-1/2">
          <Radio label="Context"/>
        </div>

        <div className="w-1/2 flex items-center" key="1">
          <div className="mr-1">
            <Input type="text"/>
          </div>
        </div>
        <div className="w-1/2 flex items-center" key="1">
          <div className="mr-1">
            <Input type="text"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContextFormOrganism
