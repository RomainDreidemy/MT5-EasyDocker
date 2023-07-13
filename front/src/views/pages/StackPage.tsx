import BoardOrganism from '../organisms/Board.organism'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useBoard from '../../hooks/useBoard'
import ManagerOrganism from '../organisms/Manager.organism'
import EditorOrganism from '../organisms/Editor.organism'
import { type TBoardOrNullify } from '../../types/Board'
import StackEntity from '../../services/entities/Stack.entity'

const StackPage = (): JSX.Element => {
  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    if (id == null) navigate('/stacks')
  }, [id])

  const [board, setBoard] = useState<TBoardOrNullify>(undefined)

  useEffect(() => {
    (async () => {
      const { data: boardResponse } = await StackEntity.board(id!)

      setBoard(boardResponse)
    })()
  }, [])

  const { canvasRef, selectedDrawer } = useBoard(board)

  return (
    <section className="h-[calc(100vh-66px)] flex relative">

      <div className="w-[calc(200px)]">
        <ManagerOrganism/>
      </div>

      <div className="flex-1 w-64">

        <BoardOrganism canvasRef={canvasRef}/>
      </div>

      {(selectedDrawer != null) && (id != null) && <div className="absolute top-0 right-0 h-full w-80 bg-white">
          <EditorOrganism drawer={selectedDrawer} stackId={id}/>
      </div>}
    </section>
  )
}

export default StackPage
