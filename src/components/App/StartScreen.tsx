import React, { FC, useEffect, useState } from "react";
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

const StartScreen: FC = ({}) => {
  const { next } = useAppStateState();

  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (!accepted) {
      setTimeout(() => {
        setAccepted(true);
        next();
      }, 3000);
    }
  }, [accepted]);

  return (
    <StyledDiv>
      <button onClick={next}>Let's go</button>
    </StyledDiv>
  );
};

export default StartScreen;
