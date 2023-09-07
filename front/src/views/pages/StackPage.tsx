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
import UtilsDrawer from '../../services/board/Utils.drawer'

const StackPage = (): JSX.Element => {
  const navigate = useNavigate()

  const { id: stackId } = useParams()

  useEffect(() => {
    if (stackId == null) navigateToStacks()
  }, [stackId])

  const navigateToStacks = (): void => { navigate('/stacks') }

  const stack = async (): Promise<void> => {
    try {
      const { data: boardResponse } = await StackEntity.board(stackId!)

      setBoard(boardResponse)
    } catch (err) {
      console.error(err)
      navigateToStacks()
    }
  }

  const [board, setBoard] = useState<TBoardOrNullify>(undefined)

  useEffect(() => {
    (async () => { await stack() })()
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

      {((selectedDrawer != null) || (selectedLinker != null)) && (stackId != null) && (
        <div className="absolute top-0 right-0 h-full w-80">
          {(selectedDrawer != null) && (
            <EditorOrganism entity={selectedDrawer} stackId={stackId} useEditor={useDrawerEditor}/>)}
          {(selectedLinker != null && UtilsDrawer.isServiceVolumeLink(selectedLinker)) && (
            <EditorOrganism entity={selectedLinker} stackId={stackId} useEditor={useLinkerEditor}/>)}
        </div>
      )}
    </section>
  )
}

export default StackPage
