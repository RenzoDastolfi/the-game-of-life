import { useState, useEffect, useCallback } from 'react';
import { InitialData } from './initialData.json';
import styled, { createGlobalStyle } from 'styled-components';
import produce from 'immer';
import Navtools from './components/Navtools';
import './styles/app.css';

// Import the InitialData from an external file to define number of rows and colums on the grid and the current generation.
// **neighborsPositions: for practical purposes I've added this utility array on the initialData JSON file.
const { numRows, numCols, currentGeneration, neighborsPositions } = InitialData;

function App() {
  // *** UTILITY FUNCTIONS ***

  // Generate the Grid (2D Array) based on the numRows and NumCols and the Types ('empty' or else random)
  const gridCreator = (type: string) => {
    // Initialite Grid Container,
    const gridContainer = [];
    // 2D Array Creation the Row and Colums are created with Array().from and Array().
    for (let i = 0; i < numRows; i++) {
      gridContainer.push(
        Array.from(Array(numCols), () =>
          type === 'empty' ? 0 : Math.random() < 0.3
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

  // *** GAME'S LOGIC (useCallback) ***
  // ---> Conways Game Of Life Logic: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

  const [currentGen, setCurrentGen] = useState<number>(currentGeneration); // Current Generation - State Declaration
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

  // *** AUTOPLAY (useEffect): Autoplay State, Play Speed State and Effects
  const [playing, setPlaying] = useState<boolean>(false); // Game is playing? (Autoplay Status) - State declaration
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
      <Header>
        <Title>Conway's Game Of Life</Title>
      </Header>

      <GridWrapper>
        <Grid>
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
        </Grid>
      </GridWrapper>
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
      <AppBackground />
    </div>
  );
}

//*********************
//*** GLOBAL STYLES ***
//*********************

//****************************
//*** APP COMPONENT STYLES ***
//****************************
const AppBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: -2;
  background-color: #f7f4e6;
  opacity: 0.1;
  background-image: repeating-radial-gradient(
      circle at 0 0,
      transparent 0,
      #f7f4e6 15px
    ),
    repeating-linear-gradient(#83838355, #838383);
`;

const Header = styled.h1`
  position: fixed;
  left: 0;
  top: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  min-width: 400px;
  z-index: 1;
  border-bottom-right-radius: 35px;
  color: #fff;
  background-color: #ffa600;
  box-shadow: 1px 1px 29px 8px rgba(0, 0, 0, 0.19);
`;

const Title = styled.h1`
  background-color: #ffa600;
  font-weight: 800;
  font-size: 1em;
`;

const GridWrapper = styled.div`
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  @media (max-width: 1530px) {
    grid-template-columns: repeat(${numCols}, 60px);
    grid-template-rows: repeat(${numRows}, 60px);
  }
  grid-template-columns: repeat(${numCols}, 40px);
  grid-template-rows: repeat(${numRows}, 40px);
`;

const Alive = styled.div`
  border-radius: 3px;
  background-color: #ffa600;
  margin: 2px;
  transition: 0.2s;
  &:hover {
    transition: 0.2s;
    cursor: pointer;
    background-color: #ffc861;
  }
`;

const Dead = styled.div`
  border-radius: 3px;
  background-color: #c0c0c030;
  margin: 2px;
  transition: 0.2s;
  &:hover {
    transition: 0.2s;
    cursor: pointer;
    background-color: #cfcfcf;
  }
`;

export default App;
