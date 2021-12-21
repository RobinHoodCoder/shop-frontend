import { useMutation } from '@apollo/client';
import { M_REMOVE_FROM_CART } from '../../../gql/mutations';
import { useCart } from '../../../context/CartState';
import styled from 'styled-components';

const StyledButton = styled.button`
  font-size: 1rem;
  background: none;
  border: 0;
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

/* --- This is not working yet...----  optimisticResponse: {
     __typename: 'Mutation',
     deleteCartItem: {
       __typename: 'CartItem',
       id,
     },
   },*/
export const RemoveFromCartButton = ({ id }) => {
  const { openCart } = useCart();
  const [addToCart, { loading, error }] = useMutation(M_REMOVE_FROM_CART, {
    variables: { id },
    update,
  });
  const handleAddToCart = () => {
    addToCart().then(() => openCart());
  };
  return (
    <StyledButton disabled={(loading && !error)} type="button" onClick={() => handleAddToCart()}>
      ❌
    </StyledButton>
  );
};
