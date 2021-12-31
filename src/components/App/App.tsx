import React from "react";
import "./App.scss";
import styled from "styled-components";
import { AppStateProvider } from "./AppState";
import items from "../../data/result.json";
import Screen from "./Screen";

const Centered = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  height: 100%;
`;

function App() {
  return (
    <AppStateProvider allItems={items}>
      <Centered>
        <Screen />
      </Centered>
    </AppStateProvider>
  );
}

export default App;
