import Link from 'next/link';
import NavStyles from '../styles/NavStyles';
import { useUser } from '../../hooks';
import { useCart } from '../../context/CartState';
import CartCount from '../Cart/CartCount/CartCount';

export default function Nav() {
  const [userData] = useUser();
  const { cartCount } = userData;
  const { openCart } = useCart();
  console.log(userData);
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {
        !!userData && (
          <>
            <Link href="/sell">Sell</Link>
            <Link href="/orders">Orders</Link>
            <Link href="/account">Account</Link>
            <button type="button" onClick={() => openCart()}>
              Cart
              <CartCount count={cartCount}/>
            </button>
            <Link href="/logout">Log out</Link>
          </>
        )}
      {
        !userData && (
          <>
            <Link href={'/login'}>Sign in</Link>
          </>
        )

      }
    </NavStyles>
  );
}
