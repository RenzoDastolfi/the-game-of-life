import { useState, useEffect, useCallback } from 'react';
import { InitialData } from './initialData.json';
import styled, { createGlobalStyle } from 'styled-components';
import produce from 'immer';
import Navtools from './components/Navtools';

// Import the InitialData from an external file to define number of rows and colums on the grid and the current generation. **neighborsPositions: for practical purposes I've added this utility array on the initialData JSON file.
const { numRows, numCols, currentGeneration, neighborsPositions } = InitialData;

function App() {
  const [currentGen, setCurrentGen] = useState<number>(currentGeneration); // Current Generation - State Declaration

  // Generate the Grid (2D Array) based on the numRows and NumCols and the Types ('empty' or else random)
  const gridCreator = (type: string) => {
    // Initialite Grid Container,
    const gridContainer = [];
    // 2D Array Creation the Row and Colums are created with Array().from and Array().
    for (let i = 0; i < numRows; i++) {
      gridContainer.push(
        Array.from(Array(numCols), () =>
          type === 'empty' ? 0 : Math.random() < 0.1
        )
      );
    }
    return gridContainer;
  };

  const [grid, setGrid] = useState<any[]>(gridCreator('empty')); // Grid's 2D Array - State declaration

  //Function for changing the state of a cell dead/alive based on current status and position on the grid (used for changing a single state cell onClick)
  const deadAliveCellChanger = (
    currentStatus: boolean,
    i: number,
    j: number
  ) => {
    setGrid(
      produce(grid, (gridMutable: boolean[][]) => {
        gridMutable[i][j] = !currentStatus;
      })
    );
  };

  // Conways Game Of Life Logic: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
  const gameOfLifeLogic = useCallback(() => {
    setGrid((currentGrid: any[]) => {
      return produce(currentGrid, (gridMutable: any[]) => {
        grid.map((row: [], i: number) =>
          row.map((cell: boolean, j: number) => {
            let neighbors = 0;
            let newI = 0;
            let newJ = 0;
            neighborsPositions.forEach(([a, b]) => {
              newI = i + a;
              newJ = j + b;

              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                if (currentGrid[newI][newJ]) neighbors++;
              }
            });

            if ((neighbors < 2 || neighbors > 3) && currentGrid[i][j]) {
              gridMutable[i][j] = !gridMutable[i][j];
            } else if (neighbors === 3 && !currentGrid[i][j]) {
              gridMutable[i][j] = !gridMutable[i][j];
            }
            return 'Step Processed';
          })
        );
      });
    });
    setCurrentGen(currentGen + 1);
  }, [currentGen, grid]);

  // play status State, play speed State and Effects
  const [playing, setPlaying] = useState<boolean>(false); // Game is playing? - State declaration
  const [playSpeed, setPlaySpeed] = useState<number>(1000); // Game Speed - State declaration
  useEffect(() => {
    if (playing) {
      const timer = window.setInterval(() => {
        gameOfLifeLogic();
        console.log('1');
      }, playSpeed);
      return () => {
        window.clearInterval(timer);
      };
    }
  }, [gameOfLifeLogic, playing, playSpeed]);

  return (
    <div className="App">
      <GlobalStyle />
      <Header>
        <Title>Conway's Game Of Life</Title>
      </Header>
      <Navtools
        setGrid={setGrid}
        gridCreator={gridCreator}
        currentGen={currentGen}
        setCurrentGen={setCurrentGen}
        setPlaying={setPlaying}
        gameOfLifeLogic={gameOfLifeLogic}
        speed={playSpeed}
        setSpeed={setPlaySpeed}
      />
      <GridWrapper>
        {grid.map((row: [], i: number) =>
          row.map((colElement: boolean, j: number) =>
            colElement ? (
              <Alive
                key={`${i}_${j}`}
                onClick={() => deadAliveCellChanger(true, i, j)}
              />
            ) : (
              <Dead
                key={`${i}_${j}`}
                onClick={() => deadAliveCellChanger(false, i, j)}
              />
            )
          )
        )}
      </GridWrapper>
    </div>
  );
}

// Global Styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  button {
    padding: 20px;
    margin: 3px;
    cursor: pointer;
    font-size: 1.5em;
    font-weight:50;
    border-style: none;
  }
`;

// Elements Styles

const Header = styled.h1`
  position: absolute;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #ffa600;
`;
const Title = styled.h1`
  background-color: #ffa600;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${numCols}, 40px);
  grid-template-rows: repeat(${numRows}, 40px);
`;

const Alive = styled.div`
  border-radius: 3px;
  background-color: #ffa600;
  margin: 2px;
  &:hover {
    cursor: pointer;
    background-color: #ffc861;
  }
`;

const Dead = styled.div`
  border-radius: 3px;
  background-color: grey;
  margin: 2px;
  &:hover {
    cursor: pointer;
    background-color: #cfcfcf;
  }
`;

export default App;
