import Link from 'next/link';
import NavStyles from '../styles/NavStyles';
import { useUser } from '../../hooks';
import { useCart } from '../../context/CartState';
import CartCount from '../Cart/CartCount/CartCount';

export default function Nav() {
  const [cart, { cartCount }] = useUser();
  const { openCart } = useCart();
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {
        !!cart && (
          <>
            <Link href="/sell">Sell</Link>
            <Link href="/orders">Orders</Link>
            <Link href="/account">Account</Link>
            <button type="button" onClick={() => openCart()}>
              Cart
              {!!cartCount && <CartCount count={cartCount} />}
            </button>
            <Link href="/logout">Log out</Link>
          </>
        )}
      {
        !cart && (
          <>
            <Link href={'/login'}>Sign in</Link>
          </>
        )

      }
    </NavStyles>
  );
}
