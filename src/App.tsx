import { useState } from 'react';
import { InitialData } from './initialData.json';
import styled, { createGlobalStyle } from 'styled-components';
import produce from 'immer';

// Import th InitialData from an external file and define number of rows and colums on the grid.
const numRows = InitialData[0].numRows;
const numCols = InitialData[0].numCols;

function App() {
  // Grid initial state declaration using a Callback for avoiding re-rendering.
  const [grid, setGrid] = useState(() => {
    // Initialite Grid Container, The Row/Colums will be created with Array().
    const gridContainer = [];
    for (let i = 0; i < numRows; i++) {
      gridContainer.push(Array.from(Array(numCols), () => 0));
    }
    return gridContainer;
  });
  //Function for changing the state of a cell dead/alive based on current status
  const deadAliveCellChanger = (
    currentStatus: number,
    i: number,
    j: number
  ) => {
    setGrid(
      produce(grid, (gridMutable: any) => {
        gridMutable[i][j] = !currentStatus;
      })
    );
  };

  console.log(grid);
  return (
    <div className="App">
      <GlobalStyle />
      <Title>The Game Of Life</Title>
      <h2>Nav</h2>
      <GridWrapper>
        {grid.map((row, i) =>
          row.map((col, j) =>
            col ? (
              <Alive
                key={`${i}_${j}`}
                onClick={() => deadAliveCellChanger(1, i, j)}
              />
            ) : (
              <Dead
                key={`${i}_${j}`}
                onClick={() => deadAliveCellChanger(0, i, j)}
              />
            )
          )
        )}
      </GridWrapper>
      <h2>Nav</h2>
    </div>
  );
}

// Global Styles
const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

// Elements Styles

const Title = styled.h1`
  width: 100%;
  background-color: green;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${numCols}, 50px);
  grid-template-rows: repeat(${numRows}, 50px);
`;

const Alive = styled.div`
  background-color: green;
  margin: 1px;
`;

const Dead = styled.div`
  background-color: grey;
  margin: 1px;
`;

export default App;
