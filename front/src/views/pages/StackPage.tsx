import {useParams} from "react-router-dom";
import BoardOrganism from "../organisms/Board.organism";
import React from "react";
import useBoard from "../../hooks/useBoard";
import ManagerOrganism from "../organisms/Manager.organism";
import EditorOrganism from "../organisms/Editor.organism";

const StackPage = () => {
  const {id} = useParams();

  const {canvasRef} = useBoard()

  return (
    <section className="h-[calc(100vh-64px)] flex">

      <div className="basis-1/12">
        <ManagerOrganism/>
      </div>

      <div className="flex-1 w-64">

        <BoardOrganism canvasRef={canvasRef}/>
      </div>

      <div className="basis-1/6">
        <EditorOrganism/>
      </div>
    </section>
  )
}

export default StackPage;
