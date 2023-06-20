import React from 'react';
import useCanvas from "../../hooks/useCanvas";

const CanvasOrganism = () => {
  const {canvasRef, props} = useCanvas()

  return (
    <canvas ref={canvasRef} {...props} />
  );
};

CanvasOrganism.propTypes = {};

export default CanvasOrganism;