import React from 'react';
import styled from 'styled-components';
import formatMoney from '../../../lib/formatMoney';

const CartItem = ({ product, quantity }) => {
  const { name, price, photo = {} } = product;
  const { altText, image } = photo;

  const ItemStyles = styled.li`
   display: grid;
   grid-template-columns: auto 1fr auto;
   grid-gap: 1rem;
   padding: 1rem 0;
   border-bottom:  1px solid var(--lightGrey);
   align-items: center;
  `;
  return (
    <ItemStyles>
      <img
        width={100}
        src={image?.publicUrlTransformed}
        alt={altText}
      />

      <div>
        <h2>{name}</h2>
        <input onChange={console.log} type="number" value={quantity} />
        {quantity > 0 && (`${quantity}`)}  &times;
      </div>
      {formatMoney(price)}
    </ItemStyles>
  );
};

export default CartItem;
