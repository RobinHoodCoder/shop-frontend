import React, { useEffect } from 'react';
import CartStyles from '../styles/CartStyles';
import { useUser } from '../../hooks';
import Supreme from '../styles/Supreme';
import CartItem from './CartItem/CartItem';
import { formattedTotalPrice } from '../../lib/calcTotalPrice';
import { useCart } from '../../context/CartState';
import Checkout from '../Checkout/Checkout';

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
        <button role="button" onClick={toggleCart}>&times;</button>
      </header>

      <ul>
        {
          cart?.map?.((item) => {
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
        {total}
        <div> <Checkout /></div>
      </footer>
    </CartStyles>
  );
};

export default Cart;
