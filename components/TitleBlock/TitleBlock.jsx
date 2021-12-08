import React from 'react';
import Title from '../styles/Title';
import Price from '../Price/Price';
import styled from 'styled-components';
import Description from '../styles/Description';

const TitleBlock = (props) => {
  const { name, description, price, centered } = props;

  const TitleBlockStyles = styled.div`
    text-align: ${!!centered ? centered : 'left'};
    display: flex;
    flex-direction:column;
    gap: 10px;
  `;

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
