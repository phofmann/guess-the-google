import React, { FC } from "react";
import styled from "styled-components";

const boxWidth = 600 / 5;

const StyledImage = styled.div`
  flex: 1;
  width: ${boxWidth}px;
  height: ${boxWidth}px;

  > img {
    object-fit: cover;
    object-position: center center;
    height: ${boxWidth}px;
    width: ${boxWidth}px;
  }
`;

export interface ImageProps {
  url: string;
  source: string;
  title: string;
}

const Image: FC<ImageProps> = ({ source, url, title }) => {
  return (
    <StyledImage>
      <img src={url} alt={source} title={title} />
    </StyledImage>
  );
};

export default Image;
