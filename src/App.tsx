import { useState, useEffect, useCallback } from 'react';
import { initialData } from './config/initialData.json';
import styled from 'styled-components'; // Styled Components Documentation --> https://styled-components.com/docs
import produce from 'immer'; // Immer Documentation --> https://immerjs.github.io/immer/
import Navtools from './Navtools'; // Bottom Navbar Component
import './styles/globalStyles.css'; // Vanilla CSS (just for Global Styles and Font imports)

// Import the InitialData from an external file to define number of rows and colums on the grid and the current generation.
const { numRows, numCols, currentGeneration, neighborsPositions } = initialData; // **neighborsPositions: for practical purposes I've added this utility array on the initialData JSON file.

function App() {
  // *** UTILITY FUNCTIONS ***

  // Generate the Grid (2D Array) based on the numRows and NumCols of the initialData and the Type ('empty' or else random)
  const gridCreator = (type: string) => {
    const gridContainer = [];
    // 2D Array Creation - the Row and Colums are created with Array().from and Array().
    for (let i = 0; i < numRows; i++) {
      gridContainer.push(
        Array.from(Array(numCols), () =>
          type === 'empty' ? 0 : Math.random() < 0.3
        )
      );
    }
    return gridContainer;
  };

  const [grid, setGrid] = useState<any[]>(gridCreator('empty'));

  //Changes the state of a cell dead/alive passing current status and position on the grid as params (used for changing a single cell state onClick)
  const deadAliveCellChanger = (
    currentStatus: boolean,
    i: number,
    j: number
  ) => {
    //Modification made to the Grid state using immer´s produce() function for immutable data structure mutation.
    setGrid(
      produce(grid, (gridMutable: boolean[][]) => {
        gridMutable[i][j] = !currentStatus;
      })
    );
  };

  const [currentGen, setCurrentGen] = useState<number>(currentGeneration);

  // *** GAME'S LOGIC (useCallback) *** ---> Conways Game Of Life Logic: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

  const gameOfLifeLogic = useCallback(() => {
    setGrid((currentGrid: any[]) => {
      return produce(currentGrid, (gridMutable: any[]) => {
        // Iterates the current state of grid and computes the correct values for updating the copied mutable version of it.
        grid.map((row: [], i: number) =>
          row.map((cell: boolean, j: number) => {
            let neighbors = 0;
            // Evaluates the live/dead status of each neighbor position of the current selected cell
            neighborsPositions.forEach(([a, b]) => {
              let newI = i + a;
              let newJ = j + b;

              // Verifies if the current neighbor position it's not out of bounds
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                if (currentGrid[newI][newJ]) neighbors++;
              }
            });

            // Game of life Rules Logic
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

  // *** AUTOPLAY (useEffect): Autoplay State, Play Speed State and Effects ***
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // Game is Playing? (Autoplay Status)
  const [playSpeed, setPlaySpeed] = useState<number>(1000);
  useEffect(() => {
    if (isPlaying) {
      const timer = window.setInterval(() => {
        gameOfLifeLogic();
      }, playSpeed);
      return () => {
        window.clearInterval(timer);
      };
    }
  }, [gameOfLifeLogic, isPlaying, playSpeed]);

  return (
    <div>
      <Header>
        <h1>Conway's Game Of Life</h1>
      </Header>

      <GridWrapper>
        <Grid>
          {grid.map((row: [], i: number) =>
            row.map((cell: boolean, j: number) =>
              cell ? (
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
        setPlaying={setIsPlaying}
        gameOfLifeLogic={gameOfLifeLogic}
        speed={playSpeed}
        setSpeed={setPlaySpeed}
      />
      <AppBackground />
    </div>
  );
}

//*** APP COMPONENT STYLES ***

const AppBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: -1;
  background-color: #f7f4e6;
  opacity: 0.1;
  background-image: repeating-radial-gradient(
      circle at 0 0,
      transparent 0,
      #f7f4e6 15px
    ),
    repeating-linear-gradient(#83838355, #838383);
`;

const Header = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 30%;
  min-width: 320px;
  z-index: 1;
  border-bottom-right-radius: 35px;
  color: #fff;
  background-color: #ffa600;
  box-shadow: 0px 0px 30px 10px rgba(0, 0, 0, 0.05);
  h1 {
    font-weight: 800;
    font-size: 1.5em;
  }
`;

const GridWrapper = styled.div`
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  @media (max-width: 1530px) {
    grid-template-columns: repeat(${numCols}, 40px);
    grid-template-rows: repeat(${numRows}, 40px);
  }
  grid-template-columns: repeat(${numCols}, 30px);
  grid-template-rows: repeat(${numRows}, 30px);
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

export default App;
