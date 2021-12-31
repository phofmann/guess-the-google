import React, { FC } from "react";
import styled from "styled-components";
import { useAppStateState } from "./AppState";
import Image from "./Image";

const StyledImageList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 600px;
`;

const Imagelist: FC = () => {
  const { items } = useAppStateState();
  return (
    <StyledImageList>
      {items.map((value, index) => {
        return <Image key={index} {...value} />;
      })}
    </StyledImageList>
  );
};

export default Imagelist;
