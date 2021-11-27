import React from 'react'
import './App.css';
import Draggable from 'react-draggable';
import Sequencer from './components/Sequencer/Sequencer';
import { Transport } from 'tone';
import { hihat, hihat1, hihat2, kick, ride, ride1, snare } from './sounds';
import { Scale } from '@tonaljs/tonal';

const soundUrls = [hihat, hihat1, hihat2, kick, ride, ride1, snare];
const drumSounds = {
  0: hihat,
  1: hihat1,
  2: hihat2,
  3: kick,
  4: ride,
  5: ride1,
  6: snare
}

const range = Scale.rangeOf("C pentatonic");

const melodySounds = range("C4", "C6");

const App = () => {

  Transport.start();

  return (
    <Draggable
      handle=".drag-handle">
      <main className="App">
        <div className="drag-handle"></div>
        <Sequencer type="drums" sounds={drumSounds} numSounds={soundUrls.length}/>
        <Sequencer type="melody" sounds={melodySounds} numSounds={melodySounds.length}/>
      </main>
    </Draggable>
  );
}

export default App;

//