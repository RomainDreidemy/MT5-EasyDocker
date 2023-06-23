import React from 'react'
import Alert from '../../atoms/Alert.atom'

interface AlertProps {
  message: string
}

const Notice = ({ message }: AlertProps): JSX.Element => {
  return <Alert message={message} type={'info'} />
}

export default Notice
