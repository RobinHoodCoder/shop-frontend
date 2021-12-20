import React from 'react';
import styled from 'styled-components';

const CartCount = ({ count }) => {
  const DotStyles = styled.div`
    background: var(--red);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    border-radius: 50%;
    height: 35px;
    width:35px;
    font-feature-settings: 'tnum';
    font-variant-numeric: tabular-nums;
  `;

  return (
    <DotStyles>
      {count}
    </DotStyles>
  );
};

export default CartCount;
