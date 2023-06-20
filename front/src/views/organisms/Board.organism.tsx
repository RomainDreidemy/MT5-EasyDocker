import React from 'react';
import useBoard from "../../hooks/useBoard";

const BoardOrganism = () => {
  const {canvasRef} = useBoard()

  return (
    <canvas ref={canvasRef} />
  );
};

BoardOrganism.propTypes = {};

export default BoardOrganism;