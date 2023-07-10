import {useParams} from "react-router-dom";
import BoardOrganism from "../organisms/Board.organism";
import React from "react";
import useBoard from "../../hooks/useBoard";
import ManagerOrganism from "../organisms/Manager.organism";
import EditorOrganism from "../organisms/Editor.organism";

const StackPage = () => {
  const {id} = useParams();

  const {canvasRef, selectedDrawer} = useBoard()

  return (
    <section className="h-[calc(100vh-66px)] flex relative">

      <div className="basis-1/12">
        <ManagerOrganism/>
      </div>

      <div className="flex-1 w-64">

        <BoardOrganism canvasRef={canvasRef}/>
      </div>

      {selectedDrawer && <div className="absolute top-0 right-0 h-full w-80 bg-white">
          <EditorOrganism drawer={selectedDrawer}/>
      </div>}
    </section>
  )
}

export default StackPage;
