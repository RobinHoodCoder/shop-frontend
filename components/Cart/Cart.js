import React from 'react';
import CartStyles from '../styles/CartStyles';
import { useQuery } from '@apollo/client';
import { Q_CART_ITEMS } from '../../gql/queries';
import { useUser } from '../../hooks';

const Cart = ({ open }) => {
  const { data, loading } = useUser();
  { console.log('ITEM', data); }
  // const [cartItems, { loading, data, error }] = useQuery(Q_CART_ITEMS);
  return (
    <CartStyles open={open}>
      <header>
      </header>
      <ul>
        {
          data?.cart?.map(item => (
            <li key={item.id}>
              <img src={item.image} alt={item.title} />

              <div>
                <h3>{item.title}</h3>
                <h4>{item.price}</h4>
              </div>
            </li>
          ))
        }
      </ul>
      <footer>
        <p>oke</p>
      </footer>
    </CartStyles>
  );
};

export default Cart;
