import React, { useState } from 'react'
import useToggle from '../../hooks/useToggle'
import Button from '../atoms/forms/Button.atom'
import { AiOutlineUnlock } from 'react-icons/ai'
import { type IServiceEnvVariable } from '../../interfaces/ServiceEnvVariable.interface'
import { type IService } from '../../interfaces/Service.interface'
import EnvVariableMolecule from '../molecules/EnvVariable.molecule'
import { type TDrawer } from '../../types/Drawer'
import eventEmitter from '../../services/apps/Event.emitter'
import { EventEmitters } from '../../enums/eventEmitters'

const EnvVariablesOrganism = ({ entity: drawer }: { entity: TDrawer }): JSX.Element => {
  const entity: IService = drawer.entity! as IService

  const [envVariables, setEnvVariables] = useState<IServiceEnvVariable[]>(entity.envVariables)
  console.log(envVariables)

  const [open, toggle] = useToggle()

  const buttonText =
    open
      ? 'Hide Config Vars'
      : 'Reveal config Vars'

  const addCallback = (envVariable: IServiceEnvVariable): void => {
    setEnvVariables([...envVariables, envVariable])
  }

  const deleteCallback = (envVariable: IServiceEnvVariable): void => {
    setEnvVariables(envVariables.filter(e => e.id !== envVariable.id))
  }

  return (
    <section>
      <hr/>
      <Button label={buttonText} onClick={toggle} icon={<AiOutlineUnlock/>} variant={'ghost'}/>

      {envVariables.map((envVariable, index) => (
        <EnvVariableMolecule key={index} envVariable={envVariable} serviceId={drawer.entity!.id} deleteCallback={deleteCallback}/>))}

      <EnvVariableMolecule serviceId={drawer.entity!.id} addCallback={addCallback} />

      <hr/>

    </section>
  )
}

export default EnvVariablesOrganism
