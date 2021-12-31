import React, { FC, useEffect, useRef } from "react";
import styled from "styled-components";
import { useAppStateState } from "./AppState";

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 600px;
  height: 480px;
  background-color: var(--color-font);
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button`
  background-color: var(--color-background-dark);
  border: 1px solid turquoise;
  font-size: var(--font-size-heading-2);
  color: var(--color-font);
`;

const NextRound: FC = ({}) => {
  const { next, guessCorrect, gameRunning } = useAppStateState();

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!gameRunning) {
      buttonRef.current && buttonRef.current.focus();
    }
  }, [gameRunning]);

  const startNextRound = () => {
    next();
  };

  return (
    <StyledDiv style={{ display: guessCorrect ? "block" : "none" }}>
      <h2>You found it</h2>
      <StyledButton ref={buttonRef} onClick={startNextRound}>
        Next
      </StyledButton>
    </StyledDiv>
  );
};

export default NextRound;
