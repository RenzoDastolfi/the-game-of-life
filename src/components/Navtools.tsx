import React from 'react';
import styled from 'styled-components';

function Navtools({
  setGrid,
  gridCreator,
  currentGen,
  setCurrentGen,
  setPlaying,
  gameOfLifeLogic,
  speed,
  setSpeed,
}) {
  const speedBarHandler = (e) => {
    setSpeed(e.target.value);
  };
  return (
    <div>
      <button
        onClick={() => {
          setGrid(gridCreator('empty'));
          setCurrentGen(0);
          setPlaying(false);
        }}
      >
        Reset
      </button>
      <button onClick={() => gameOfLifeLogic()}>Step</button>
      <button onClick={() => setPlaying(true)}>Play</button>
      <button onClick={() => setPlaying(false)}>Pause</button>
      <button
        onClick={() => {
          setGrid(gridCreator('random'));
          setCurrentGen(0);
          setPlaying(false);
        }}
      >
        Randomize
      </button>

      <Slider
        type="range"
        name="speed"
        min="10"
        max="2000"
        value={speed}
        onChange={speedBarHandler}
      />

      <h2>Current Generation {currentGen}</h2>
    </div>
  );
}

const Slider = styled.input`
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #ffa600;
    cursor: pointer;
  }
  appearance: none;
  width: 20%;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  transition: 0.2s;
  transition: opacity 0.2s;
  transform: rotateY(180deg);
`;

export default Navtools;
