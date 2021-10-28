import { useState } from 'react';
import { InitialData } from './initialValues.json';
import styled, { createGlobalStyle } from 'styled-components';

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

  console.log(grid);
  return (
    <div className="App">
      <GlobalStyle />
      <Title>The Game Of Life</Title>
      <h2>Nav</h2>
      <GridWrapper>
        {grid.map((row) => row.map((col) => (col ? <Alive /> : <Dead />)))}
      </GridWrapper>
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

const Title = styled.h1`
  width: 100%;
  background-color: green;
  display: flex;
  align-items: center;
`;

export default App;
