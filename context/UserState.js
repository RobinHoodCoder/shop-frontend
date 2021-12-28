import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Q_CURRENT_USER } from '../gql/queries';
import { formattedTotalPrice } from '../lib/calcTotalPrice';

const defaultCtx = () => console.log('CartState: defaultCtx');

const LocalStateContext = React.createContext({
  cart: [],
});
const LocalStateProvider = LocalStateContext.Provider;

const UserStateProvider = ({ children }) => {
  const { data, loading, error } = useQuery(Q_CURRENT_USER);

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
    cart: { items: cart, count, total }, email, id, name,
  };


  return (
    <LocalStateProvider
      value={{
        cart,
        cartCount: count,
      }}>
      {children}
    </LocalStateProvider>
  );
};

const useUserContext = () => {
  return useContext(LocalStateContext);
};


export { UserStateProvider, useUserContext };
