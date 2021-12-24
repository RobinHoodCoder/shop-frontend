import { useMutation } from '@apollo/client';
import { M_ADD_TO_CART } from '../../../gql/mutations';
import { Q_CURRENT_USER } from '../../../gql/queries';
import { useContext } from 'react';
import { useCart } from '../../../context/CartState';
import { useRouter } from 'next/router';

export const AddToCartButton = ({ id }) => {
  const router = useRouter();
  const { openCart } = useCart();
  const [addToCart, { loading }] = useMutation(M_ADD_TO_CART, {
    variables: { id },
    refetchQueries: [{ query: Q_CURRENT_USER }],
  });
  const handleAddToCart = async () => {
    try {
      await addToCart()
        .then(() => openCart());
    } catch (err) {
      const { graphQLErrors } = err;
      if (graphQLErrors?.length) {
        const notSignedIn = !!([...graphQLErrors]
          .map(item => item.message)
          .filter(message => message.indexOf('signed in') >= 0)).length;

        if (notSignedIn) {
          return router.push({
            pathname: '/login',
          });
        }
      }
    }
  };
  return (
    <button disabled={loading} type="button" onClick={() => handleAddToCart()}>
      Add{loading && 'ing'} To Cart 🛒
    </button>
  );
};
