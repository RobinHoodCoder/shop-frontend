import { useMutation } from '@apollo/client';
import { M_ADD_TO_CART } from '../../gql/mutations';
import { Q_CURRENT_USER } from '../../gql/queries';
import { useContext } from 'react';
import { useCart } from '../../context/CartState';

export const AddToCartButton = ({ id }) => {
  const { openCart } = useCart();
  const [addToCart, { loading }] = useMutation(M_ADD_TO_CART, {
    variables: { id },
    refetchQueries: [{ query: Q_CURRENT_USER }],
  });
  const handleAddToCart = () => {
    addToCart().then(() => openCart());
  };
  return (
    <button disabled={loading} type="button" onClick={() => handleAddToCart()}>
      Add{loading && 'ing'} To Cart 🛒
    </button>
  );
};
