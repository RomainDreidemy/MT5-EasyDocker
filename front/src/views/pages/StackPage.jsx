import { useParams } from "react-router-dom";
import BoardOrganism from "../organisms/Board.organism";
import React from "react";

const StackPage = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>StackPage {id}</h1>
            <BoardOrganism />
        </div>
    )
}

export default StackPage;
