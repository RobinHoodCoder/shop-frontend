import { useQuery } from '@apollo/client';
import { Q_CURRENT_USER } from '../gql/queries';

export const useUser = (initital) => {
  const { data, loading, error } = useQuery(Q_CURRENT_USER);
  // console.log(data?.authenticatedItem?.cart);

  const { authenticatedItem = {} } = data || {};
  const cart = authenticatedItem?.cart;
  const cartCount = cart?.reduce((acc, item) => acc + item.quantity, 0);

  return [{ cartCount, ...authenticatedItem }, { cartCount, loading, error }];
};
