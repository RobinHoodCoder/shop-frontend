import React from 'react';
import formatMoney from '../../lib/formatMoney';
import styled from 'styled-components';

const Price = (props) => {
  const { amount } = props;
  const PriceStyles = styled.span`
    font-size: 2rem;
  `;

  return (
    <div>
      <PriceStyles>{formatMoney(amount)}</PriceStyles>
    </div>
  );
};

export default Price;
