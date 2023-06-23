import React from 'react'
import Alert from '../../organisms/Alert.atom'
import { type AlertProps } from '../../../interfaces/Alert.interface'

const Warning = ({ message }: AlertProps): JSX.Element => {
  return <Alert message={message} type={'warning'}/>
}

export default Warning
