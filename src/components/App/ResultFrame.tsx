import React, { FC } from "react";
import styled from "styled-components";
import Timer from "./Timer";

const StyledResultFrame = styled.div`
  width: 600px;
  display: flex;
  color: var(--color-font);
  padding: 0 20px;
`;

const ResultFrame: FC = ({}) => {
  return (
    <StyledResultFrame>
      <Timer count={20} />
    </StyledResultFrame>
  );
};

export default ResultFrame;
