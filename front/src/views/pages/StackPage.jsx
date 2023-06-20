import { useParams } from "react-router-dom";

const StackPage = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>StackPage {id}</h1>
        </div>
    )
}

export default StackPage;
