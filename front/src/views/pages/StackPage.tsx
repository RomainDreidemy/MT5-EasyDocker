import BoardOrganism from '../organisms/Board.organism'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useBoard from '../../hooks/useBoard'
import ManagerOrganism from '../organisms/Manager.organism'
import EditorOrganism from '../organisms/Editor.organism'
import { type TBoardOrNullify } from '../../types/Board'
import StackEntity from '../../services/entities/Stack.entity'
import useDrawerEditor from '../../hooks/useDrawerEditor'
import useLinkerEditor from '../../hooks/useLinkerEditor'

const StackPage = (): JSX.Element => {
  const navigate = useNavigate()

  const { id: stackId } = useParams()

  useEffect(() => {
    if (stackId == null) navigate('/stacks')
  }, [stackId])

  const [board, setBoard] = useState<TBoardOrNullify>(undefined)

  useEffect(() => {
    (async () => {
      const { data: boardResponse } = await StackEntity.board(stackId!)

      setBoard(boardResponse)
    })()
  }, [])

  const { canvasRef, selectedDrawer, selectedLinker } = useBoard(board)

  return (
    <section className="h-[calc(100vh-66px)] flex relative">

      <div className="w-[calc(200px)]">
        {(stackId != null) && (<ManagerOrganism stackId={stackId}/>)}
      </div>

      <div className="flex-1 w-64">
        <BoardOrganism canvasRef={canvasRef}/>
      </div>

      <div className="absolute top-0 right-0 h-full w-80 bg-white">
         {(selectedDrawer != null) && (stackId != null) &&
            <EditorOrganism entity={selectedDrawer} stackId={stackId} useEditor={useDrawerEditor}/>}
        {(selectedLinker != null) && (stackId != null) &&
            <EditorOrganism entity={selectedLinker} stackId={stackId} useEditor={useLinkerEditor}/>}
      </div>

      useDrawerEditor
    </section>
  )
}

export default StackPage
