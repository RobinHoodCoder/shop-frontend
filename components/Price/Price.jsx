import React from 'react';
import formatMoney from '../../lib/formatMoney';
import styled from 'styled-components';

const PriceStyles = styled.span`
    font-size: 2rem;
`;
const Price = (props) => {
  const { amount } = props;

  return (
    <div data-testid={'price'}>
      <PriceStyles>{formatMoney(amount)}</PriceStyles>
    </div>
  );
};

export default Price;
