import React, { FC, FormEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAppStateState } from "./AppState";

const StyledInputField = styled.input`
  width: 100%;
  font-size: var(--font-size-heading-1);
  //color: turquoise;
  border: solid 1px var(--color-font);

  :disabled {
    background-color: var(--color-background-dark);
    color: var(--color-background-light);
  }
`;

const Guess: FC = ({}) => {
  const { gameRunning, validateGuess, guessCorrect } = useAppStateState();

  const [guess, setGuess] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (gameRunning) {
      inputRef.current && inputRef.current.focus();
    }
  }, [gameRunning]);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    validateGuess(guess);
    if (!guessCorrect) {
      inputRef.current && (inputRef.current.value = "");
      setGuess("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <StyledInputField
          ref={inputRef}
          autoFocus={true}
          type={"text"}
          name={guess}
          disabled={!gameRunning}
          onChange={(e) => setGuess(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Guess;
