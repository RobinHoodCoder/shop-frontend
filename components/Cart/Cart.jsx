import React, { useEffect } from 'react';
import CartStyles from '../styles/CartStyles';
import { useUser } from '../../hooks';
import Supreme from '../styles/Supreme';
import CartItem from './CartItem/CartItem';
import { formattedTotalPrice } from '../../lib/calcTotalPrice';
import { useCart } from '../../context/CartState';

const Cart = ({ open }) => {
  const [userData, { error, loading }]  = useUser();
  const { showCart, toggleCart, ...rest } = useCart();
  console.log(showCart, rest);

  const { cart = [] } = userData || {};

  const total = formattedTotalPrice(cart);

  // const [cartItems, { loading, data, error }] = useQuery(Q_CART_ITEMS);
  if (!userData) {
    return null;
  }
  return (
    <CartStyles open={showCart}>
      <header>
        <Supreme>{userData?.name}'s card</Supreme>
      </header>
      <button onClick={toggleCart}>&times;</button>
      <ul>
        {
          cart?.map?.((item) => {
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

        }
      </ul>
      <footer>
        {total}
      </footer>
    </CartStyles>
  );
};

export default Cart;
