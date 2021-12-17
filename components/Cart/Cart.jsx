import React, { useEffect } from 'react';
import CartStyles from '../styles/CartStyles';
import { useUser } from '../../hooks';
import Supreme from '../styles/Supreme';
import CartItem from './CartItem/CartItem';
import { formattedTotalPrice } from '../../lib/calcTotalPrice';
import { useCart } from '../../context/CartState';

const Cart = ({ open }) => {
  const { user, error, loading } = useUser();
  const { showCart, toggleCart } = useCart();

  const { cart = [] } = user || {};

  const total = formattedTotalPrice(cart);

  // const [cartItems, { loading, data, error }] = useQuery(Q_CART_ITEMS);

  return (
    <CartStyles open={showCart}>
      <header>
        <Supreme>{user?.name}'s card</Supreme>
      </header>
      <button onClick={toggleCart}>&times;</button>
      <ul>
        {
          !!cart?.length > 0 && (
            cart.map((item) => {
              console.log({ item });
              const { product, quantity } = item;
              return (
                <CartItem
                  key={product.id}
                  product={product}
                  quantity={quantity}
                />
              );
            })
          )
        }
      </ul>
      <footer>
        {total}
      </footer>
    </CartStyles>
  );
};

export default Cart;
