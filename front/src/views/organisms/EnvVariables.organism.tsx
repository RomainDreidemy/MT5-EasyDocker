import React, { useState } from 'react'
import useToggle from '../../hooks/useToggle'
import Button from '../atoms/forms/Button.atom'
import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai'
import { type IServiceEnvVariable } from '../../interfaces/ServiceEnvVariable.interface'
import { type IService } from '../../interfaces/Service.interface'
import EnvVariableMolecule from '../molecules/EnvVariable.molecule'
import { type TDrawer } from '../../types/Drawer'

const EnvVariablesOrganism = ({ entity: drawer }: { entity: TDrawer }): JSX.Element => {
  const entity: IService = drawer.entity! as IService

  const [envVariables, setEnvVariables] = useState<IServiceEnvVariable[]>(entity.envVariables)

  const [open, toggle] = useToggle()

  const buttonText =
    open
      ? 'Hide Config Vars'
      : 'Reveal config Vars'

  const icon =
    open
      ? <AiOutlineUnlock/>
      : <AiOutlineLock/>

  const addCallback = (envVariable: IServiceEnvVariable): void => {
    setEnvVariables([...envVariables, envVariable])
  }

  const deleteCallback = (envVariable: IServiceEnvVariable): void => {
    setEnvVariables(envVariables.filter(e => e.id !== envVariable.id))
  }

  return (
    <section className="mb-3">
      <hr/>

      <article className="pt-3">
        <Button label={buttonText} onClick={toggle} icon={icon} variant={'ghost'}/>

        {open && (
          <div className="container mx-auto">
            <div className="flex flex-wrap -mx-2 p-2 ">

              {envVariables.map((envVariable, index) => (
                <EnvVariableMolecule key={index} envVariable={envVariable} serviceId={drawer.entity!.id}
                                     deleteCallback={deleteCallback}/>))}

              <EnvVariableMolecule serviceId={drawer.entity!.id} addCallback={addCallback}/>
            </div>
          </div>
        )}
      </article>
    </section>
  )
}

export default EnvVariablesOrganism
