import React, { useState, useEffect } from "react";
import './Sequencer.css';
import GridSquare from "../GridSquare/GridSquare";
import { Sequence, Players, MonoSynth, PolySynth } from "tone";
import { Play, Stop } from "phosphor-react";

const Sequencer = (props) => {
  const [playState, setPlayState] = useState(false)
  const [measureLength, setMeasureLength] = useState(8);
  const [matrix, setMatrix] = useState(createMatrix(measureLength, props.numSounds));
  const [pulseCol, setPulseCol] = useState(null);

  useEffect(() => {

    let loop, soundPlayer, synth;
    let events = [];
    for (let i = 0; i < measureLength; i++) events.push(i);
    
    if (props.type === 'drums'){
      // configure tone.js Players with the drum sounds
      soundPlayer = new Players({
        urls: props.sounds
      }).toDestination();
  
      // configure tone.js sequencer to do the music calculations
      loop = new Sequence(
        (time, col) => {
          for (let i = 0; i < props.numSounds; i++) {
            if(matrix[i][col]){
              soundPlayer.player(i).start()
            }
          }
          setPulseCol(col)
        },
        events,
        "8n"
      )
      if(playState) loop.start(0);
    }
    else{
      synth = new PolySynth().toDestination();

      loop = new Sequence(
        (time, col) => {
          for (let i = 0; i < props.numSounds; i++) {
            if(matrix[i][col]){
              synth.triggerAttackRelease(props.sounds[i], "8n");
            }
          }
          setPulseCol(col)
        },
        events,
        "8n"
      )
      if(playState) loop.start(0);
    }
    return function cleanup() {
      if (loop) loop.dispose();
      if (synth) synth.dispose();
      if (soundPlayer) soundPlayer.dispose();
    }
  },
    [matrix, measureLength, playState, props.type, props.sounds, props.numSounds], // Retrigger when pattern changes
  )

  // Toggle playing / stopped
  const toggle = () => {
    setPulseCol(null);
    setPlayState(!playState);
  }

  // create jsx for sequencer grid
  function createGrid(width, height) {
    let gridRows = [];
    for (let i = 0; i < height; i++) {
      gridRows.push(<div
        className={"sequencer-row"}
        id={`sequencer-row-${i}-${props.type}`}
        key={`sequencer-row-${i}`}
        data_row_num={i}>{createRow(i, width)}</div>)
    }
    return gridRows;
  }

  // create jsx for sequencer grid
  function createRow(rowNum, width) {
    let row = [];
    for (let i = 0; i < width; i++) {
      row.push(<GridSquare
        className={"sequencer-grid"}
        id={`sequencer-grid-${i}-${props.type}`}
        key={`sequencer-grid-${i}`}
        matrix={matrix}
        onMatrixChange={setMatrix}
        // use data_grid_id to track easily track which GridSquare this is
        row={rowNum}
        col={i}
        pulseCol={pulseCol}/>)
    }
    return row;
  }

  // create an empty matrix the same size as the sequencer grid
  function createMatrix(width, height) {
    let matrix = [];
    for (let i = 0; i < height; i++) {
      let row = [];
      for (let k = 0; k < width; k++) {
        row.push(false);
      }
      matrix.push(row);
    }
    return matrix;
  }

  return (
    <div className="sequencer">
      <div className="controls" onClick={() => toggle()}>
        {playState === 'started' ? <Stop /> : <Play />}
      </div>
      {createGrid(measureLength, props.numSounds)}
    </div>
  )
}

export default Sequencer;