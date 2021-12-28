import { useQuery } from '@apollo/client';
import { Q_CURRENT_USER } from '../gql/queries';
import { formattedTotalPrice } from '../lib/calcTotalPrice';

export const useUser = (initital) => {
  const { data, loading, error } = useQuery(Q_CURRENT_USER);
  // console.log(data?.authenticatedItem?.cart);
  console.log(data?.authenticatedItem);

  const { authenticatedItem = {} } = data || {};
  if (!authenticatedItem) {
    return [
      null,
      { loading, error },
    ];
  }

  const { cart, email, id, name } = authenticatedItem;


  const count = cart?.reduce((acc, item) => acc + item.quantity, 0);
  const total = formattedTotalPrice(cart);

  const userData = {
    cart: { items: cart, count, total },  email, id, name,
  };


  return [userData, { loading, error }];
};
