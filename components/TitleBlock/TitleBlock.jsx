import React from 'react';
import Title from '../styles/Title';
import Price from '../Price/Price';
import styled from 'styled-components';
import Description from '../styles/Description';

const TitleBlockStyles = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const TitleBlock = (props) => {
  const { name, description, price, centered } = props;

  return (
    <TitleBlockStyles>
      <Title><span>{name}</span></Title>
      <Description>
        <span>{description}</span>
      </Description>
    </TitleBlockStyles>
  );
};

export default TitleBlock;
