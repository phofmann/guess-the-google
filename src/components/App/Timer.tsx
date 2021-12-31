import React, { FC, useEffect, useRef } from "react";
import styled from "styled-components";
import { useAppStateState } from "./AppState";

const StyledCounter = styled.div`
  width: 100%;

  > div h1 {
    border-bottom: solid 1px var(--color-font);
    font-size: var(--font-size-heading-1);
  }

  > span {
    font-size: 60px;
  }

  > div h2 {
    border-bottom: solid 1px var(--color-font);
    font-size: var(--font-size-heading-2);
  }
`;

interface Props {
  count: number;
}

const Timer: FC<Props> = () => {
  const { currentIncorrectGuesses, gameRunning, setTimer, timer, stopGame } =
    useAppStateState();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (gameRunning) {
      inputRef.current && inputRef.current.focus();
    }
  }, [gameRunning]);

  useEffect(() => {
    setTimeout(() => {
      if (timer - 1 > 0 && gameRunning) {
        setTimer(timer - 1);
      } else {
        stopGame();
      }
    }, 1000);
  }, [timer]);

  return (
    <StyledCounter>
      <div>
        <h1>Time Remaining</h1>
      </div>
      <span>:{timer}</span>
      <div>
        <h2>Incorrect Guesses</h2>
        <ul>
          {currentIncorrectGuesses.map((guess, index) => {
            return <li key={index}>{guess}</li>;
          })}
        </ul>
      </div>
    </StyledCounter>
  );
};

export default Timer;
