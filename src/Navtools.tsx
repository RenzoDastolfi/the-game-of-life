import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faRandom,
  faTachometerAlt,
} from '@fortawesome/free-solid-svg-icons';

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
  // *** Play Speed Input Handler - Handles the slide event on the range input
  const speedBarHandler = (e: { target: { value: string } }) => {
    setSpeed(e.target.value);
  };

  return (
    <NavContainer>
      <CounterBox>
        <h1>Current Generation:</h1>
        <h2>{currentGen}</h2>
      </CounterBox>

      <Buttons>
        {/* Play Button */}
        <button onClick={() => setPlaying(true)}>
          <FontAwesomeIcon icon={faPlay} />
        </button>
        {/* Pause Button */}
        <button onClick={() => setPlaying(false)}>
          <FontAwesomeIcon icon={faPause} />
        </button>
        {/* Reset Button */}
        <button
          onClick={() => {
            setGrid(gridCreator('empty'));
            setCurrentGen(0);
            setPlaying(false);
          }}
        >
          Reset
        </button>
        {/* Next Step Button */}
        <button onClick={() => gameOfLifeLogic()}>Step</button>
        {/* Set Random Step Button */}
        <button
          onClick={() => {
            setGrid(gridCreator('random'));
            setCurrentGen(0);
            setPlaying(false);
          }}
        >
          <FontAwesomeIcon icon={faRandom} />
        </button>
      </Buttons>

      <SpeedSliderWrapper>
        <FontAwesomeIcon icon={faTachometerAlt} />
        <SpeedSlider
          type="range"
          name="speed"
          min="10"
          max="2000"
          value={speed}
          onChange={speedBarHandler}
        />
      </SpeedSliderWrapper>
    </NavContainer>
  );
}

//*** NAVTOOLS COMPONENT STYLES ***

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 80px;
  width: 100%;
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: 1530px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      'a b'
      'c c';
    height: 150px;
    transition: 0.2s;
  }
  background-color: #ffffff;
  box-shadow: 0px 0px 30px 10px rgba(0, 0, 0, 0.05);
`;

const CounterBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  h1 {
    font-size: 1.2em;
    font-weight: 500;
  }
  h2 {
    font-size: 1.5em;
    padding: 0 20px;
    font-weight: 300;
  }
  @media (max-width: 1530px) {
    grid-area: a;
    transition: 0.2s;
    align-self: center;
  }
  @media (max-width: 500px) {
    font-size: 0.6em;
    font-weight: 800;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  button {
    padding: 10px 20px;
    cursor: pointer;
    font-size: 1.5em;
    font-weight: 300;
    border-style: none;
    border-radius: 15px;
    transition: 0.2s;
    backface-visibility: hidden;
    display: inline-block;
    &:hover {
      backface-visibility: hidden;
      transition: 0.2s;
      transform: scale(1.05);
      background-color: #c9c9c9;
    }
    &:active {
      backface-visibility: hidden;
      transition: 0.2s;
      transform: scale(1.05);
      background-color: #c9c9c9;
    }
  }
  @media (max-width: 1530px) {
    grid-area: c;
    transition: 0.2s;
  }
  @media (max-width: 500px) {
    font-size: 0.6rem;
    font-weight: 800;
  }
`;

const SpeedSliderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: 0.2s;
  @media (max-width: 1530px) {
    grid-area: b;
    transition: 0.2s;
  }
  @media (max-width: 500px) {
    font-size: 1.3em;
    font-weight: 800;
  }
  font-size: 2em;
`;

const SpeedSlider = styled.input`
  appearance: none;
  height: 15px;
  width: 200px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  transition: 0.2s;
  transition: opacity 0.2s;
  transform: rotateY(180deg);
  @media (max-width: 1530px) {
    width: 20vw;
  }

  ::-webkit-slider-thumb {
    appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #ffa600;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      transform: scale(1.2);
      background: #ffb833;
    }
  }
`;

export default Navtools;
