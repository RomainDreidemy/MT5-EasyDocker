import Alert from "../../atoms/Alert.atom";

interface AlertProps {
    message: string
}

const Notice = ({message}: AlertProps) => {
    return <Alert message={message} type={'info'} />
}

export default Notice