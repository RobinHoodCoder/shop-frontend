import { useMutation } from '@apollo/client';
import { M_ADD_TO_CART } from '../../gql/mutations';
import { Q_CURRENT_USER } from '../../gql/queries';

export const AddToCartButton = ({ id }) => {
  const [addToCart, { loading }] = useMutation(M_ADD_TO_CART, {
    variables: { id },
    refetchQueries: [{ query: Q_CURRENT_USER }],
  });
  return (
    <button disabled={loading} type="button" onClick={() => addToCart()}>
      Add{loading && 'ing'} To Cart 🛒
    </button>
  );
};
