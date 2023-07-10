import React, { type LegacyRef } from 'react'
import PropTypes from 'prop-types'

const BoardOrganism = ({ canvasRef }: { canvasRef: LegacyRef<HTMLCanvasElement> | undefined }): JSX.Element => {
  return (
    <div className="board w-full h-full">
      <canvas className="w-full h-full" ref={canvasRef}/>
    </div>
  )
}

BoardOrganism.propTypes = {
  canvasRef: PropTypes.object.isRequired
}

export default BoardOrganism
