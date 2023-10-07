import React from 'react'
import Radio from '../../atoms/forms/RadioButton.atom'
import Input from '../../atoms/forms/Input.atom'
import { type TDrawer } from '../../../types/Drawer'
import { type IService } from '../../../interfaces/Service.interface'
import { type TEditor } from '../../../types/board/drawer/Common.bases'
import { type TEntity } from '../../../types/Entity'

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

const ContextFormOrganism = ({ entity: drawer, onChange }: {
  entity: TDrawer
  onChange: TEditor<TEntity>['onChange']
}): JSX.Element => {
  const entity: IService = drawer.entity! as IService

  console.log(entity)

  const hasSelectedContainer = (entity.containerName !== '') && (entity.dockerImage !== '')
  const hasSelectedContext = (entity.context !== '') && (entity.dockerFile !== '')

  const isEmptyFields = !hasSelectedContainer && !hasSelectedContext

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap -mx-2 p-2 ">
        <div className="w-1/2">
          <Radio label="Container" value={isEmptyFields && hasSelectedContainer} name="container"/>
        </div>
        <div className="w-1/2">
          <Radio label="Context" value={isEmptyFields && !hasSelectedContainer} name="context"/>
        </div>

        <div className="w-1/2 flex items-center">
          <div className="mr-1">
            <Input type="text"
                   label="Container name"
                   onChange={onChange}
                   name="containerName"
                   value={entity.containerName}/>
            <Input type="text"
                   label="Docker image"
                   onChange={onChange}
                   name="dockerImage"
                   value={entity.dockerImage}/>
          </div>
        </div>

        <div className="w-1/2 flex items-center">
          <div className="mr-1">
            <Input type="text"
                   label="Context"
                   onChange={onChange}
                   name="context"
                   value={entity.context}/>
            <Input type="text"
                   label="Docker file"
                   onChange={onChange}
                   name="dockerFile"
                   value={entity.dockerFile}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContextFormOrganism
