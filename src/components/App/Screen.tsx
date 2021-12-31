import React, { FC } from "react";
import StartScreen from "./StartScreen";
import NextRound from "./NextRound";
import Guess from "./Guess";
import styled from "styled-components";
import { useAppStateState } from "./AppState";
import Imagelist from "./Imagelist";
import ResultFrame from "./ResultFrame";

const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.div`
  color: var(--color-font);
  h1 {
    margin: 0;
    font-size: 62px;
    span {
      font-size: 40px;
    }
  }
`;

const GameFrame = styled.div`
  display: flex;
`;

const Screen: FC = ({}) => {
  const { guessCorrect, gameRunning } = useAppStateState();
  return (
    <StyledApp>
      <Title>
        <h1>
          Guess<span>-the-</span>Google
        </h1>
      </Title>
      <GameFrame>
        {!gameRunning && !guessCorrect && <StartScreen />}
        {gameRunning && !guessCorrect ? <Imagelist /> : <NextRound />}
        <ResultFrame />
      </GameFrame>
      <Guess />
    </StyledApp>
  );
};

export default Screen;
