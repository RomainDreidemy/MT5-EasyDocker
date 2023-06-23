import React from 'react'
import Alert from '../../atoms/Alert.atom'

interface AlertProps {
  message: string
}

const Warning = ({ message }: AlertProps): JSX.Element => {
  return <Alert message={message} type={'success'} />
}

export default Warning
