import React, { useState } from 'react';

const GridSquare = (props) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleMouseEnter = (e) => {
    setHovered(!hovered)
    if(e.buttons === 1){
      setDragging(true)
    }
    else if(e.buttons === 0){
      setDragging(false)
    }
  }

  const handleMouseLeave = (e) => {
    setHovered(!hovered)
    if(e.buttons === 1){
      setDragging(true)
    }
    else if(e.buttons === 0){
      setDragging(false)
    }
  }
  
  const handleMouseOver = (e) => {
    if(dragging){
      setClicked(!clicked)
      props.matrix[props.row][props.col] = !clicked;
    }
  }

  const handleMouseDown = (e) => {
    setClicked(!clicked)
    props.matrix[props.row][props.col] = !clicked;
  }

  let className;

  
  if(hovered){
    if(clicked){
      className = "sequencer-grid-clicked-hover";
    }
    else{
      className = "sequencer-grid-hover";
    }
  }
  else if (props.pulseCol === props.col){
    if(clicked){
      className = "sequencer-grid-clicked-pulsed";
    }
    else{
      className = "sequencer-grid-pulsed";
    }
  }
  else{
    if(clicked){
      className = "sequencer-grid-clicked";
    }
    else{
      className = "sequencer-grid"
    }
  }

  return (
    <div
      className={className}
      id={props.id}
      data_grid_id={props.data_grid_id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleMouseOver}
      onMouseDown={handleMouseDown}
      >
    </div>
  );
}

export default GridSquare;