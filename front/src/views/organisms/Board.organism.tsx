import React from 'react';
import useBoard from "../../hooks/useBoard";

const BoardOrganism = () => {
  const {canvasRef, props} = useBoard()

  return (
    <canvas ref={canvasRef} {...props} />
  );
};

BoardOrganism.propTypes = {};

export default BoardOrganism;