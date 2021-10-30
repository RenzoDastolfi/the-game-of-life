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
  // *** Play Speed Input Handler - Handles the slide event on the range input
  const speedBarHandler = (e: { target: { value: string } }) => {
    setSpeed(e.target.value);
  };

  return (
    <NavStyles>
      <HorizontalText>
        <Subtitle1>
          Current Generation:<Subtitle2>{currentGen}</Subtitle2>
        </Subtitle1>
      </HorizontalText>
      <Buttons>
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
      </Buttons>
      <SliderWrapper>
        <Slider
          type="range"
          name="speed"
          min="10"
          max="2000"
          value={speed}
          onChange={speedBarHandler}
        />
      </SliderWrapper>
    </NavStyles>
  );
}

const NavStyles = styled.nav`
  overflow: hidden;
  padding: 80px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 10px;
  background-color: #f7f7f7;
  box-shadow: 0px 0px 30px 10px rgba(0, 0, 0, 0.05);
`;

const HorizontalText = styled.div`
  position: fixed;
  width: 300px;
  height: 80px;
  margin: 0 80px;
  transition: 0.2s;
  @media (max-width: 1530px) {
    transition: 0.2s;
    height: 350px;
  }
  left: 0;
`;

const Subtitle1 = styled.h1`
  display: flex;
  vertical-align: top;
  align-items: center;
  font-size: 1.2em;
  font-weight: 500;
`;

const Subtitle2 = styled.h1`
  font-size: 1em;
  padding: 0 20px;
  font-weight: 300;
`;

const Buttons = styled.div`
  position: fixed;
  width: 596px;
  height: 80px;
  margin: 10% auto;
  left: 0;
  right: 0;
`;

const SliderWrapper = styled.div`
  position: fixed;
  margin: 70px 80px;
  bottom: 0;
  right: 0;
  transition: 0.2s;
  @media (max-width: 1530px) {
    transition: 0.2s;
    margin: 200px 80px;
  }
`;
const Slider = styled.input`
  appearance: none;
  height: 15px;
  width: 300px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  transition: 0.2s;
  transition: opacity 0.2s;
  transform: rotateY(180deg);
  @media (max-width: 1530px) {
    width: 200px;
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
