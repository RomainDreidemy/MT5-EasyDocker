import React from 'react'
import Alert from '../../organisms/Alert.atom'
import { type AlertProps } from '../../../interfaces/Alert.interface'

const Notice = ({ message }: AlertProps): JSX.Element => {
  return <Alert message={message} type={'info'}/>
}

export default Notice
