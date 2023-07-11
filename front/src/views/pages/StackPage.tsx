import BoardOrganism from '../organisms/Board.organism'
import React, {useEffect} from 'react'
import { useParams } from "react-router-dom";
import useBoard from '../../hooks/useBoard'
import ManagerOrganism from '../organisms/Manager.organism'
import EditorOrganism from '../organisms/Editor.organism'
import StackEntity from "../../services/entities/Stack.entity";

const StackPage = (): JSX.Element => {
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const {data: board} = await StackEntity.board(id)

      console.log(board)

    })()
  }, []);

  const { canvasRef, selectedDrawer } = useBoard()

  return (
    <section className="h-[calc(100vh-66px)] flex relative">

      <div className="basis-1/12">
        <ManagerOrganism/>
      </div>

      <div className="flex-1 w-64">

        <BoardOrganism canvasRef={canvasRef}/>
      </div>

      {(selectedDrawer != null) && <div className="absolute top-0 right-0 h-full w-80 bg-white">
          <EditorOrganism drawer={selectedDrawer}/>
      </div>}
    </section>
  )
}

export default StackPage
