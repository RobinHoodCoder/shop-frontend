import React, { useEffect } from 'react';
import CartStyles from '../styles/CartStyles';
import { useUser } from '../../hooks';
import Supreme from '../styles/Supreme';
import CartItem from './CartItem/CartItem';
import { formattedTotalPrice } from '../../lib/calcTotalPrice';
import { useCart } from '../../context/CartState';
import Checkout from '../Checkout/Checkout';
import CheckoutProvider from '../Checkout/CheckoutProvider';

const Cart = () => {
  const [userData, { error, loading }]  = useUser();
  const { showCart, toggleCart, ...rest } = useCart();

  // const total = formattedTotalPrice(user?.cart?.items);

  // const [cartItems, { loading, data, error }] = useQuery(Q_CART_ITEMS);
  return (
    <CartStyles open={showCart}>

      <header>
        <Supreme>{userData?.name}'s cart</Supreme>
        <button onClick={toggleCart}>&times;</button>
      </header>

      <ul>
        {
          userData?.cart?.items?.map?.((item) => {
            const { product, quantity, id } = item;
            return (
              <CartItem
                key={id}
                id={id}
                product={product}
                quantity={quantity}
              />
            );
          })

        }
      </ul>
      <footer>
        {userData?.cart?.total}
        <CheckoutProvider>
          <Checkout />
        </CheckoutProvider>
      </footer>
    </CartStyles>
  );
};

export default Cart;
