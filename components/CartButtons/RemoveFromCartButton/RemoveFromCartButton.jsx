import { useMutation } from '@apollo/client';
import { M_REMOVE_FROM_CART } from '../../../gql/mutations';
import { Q_CURRENT_USER } from '../../../gql/queries';
import { useCart } from '../../../context/CartState';
import styled from 'styled-components';

const StyledButton = styled.button`
font-size: 1rem;
background: none;
border: 0;
  
`;

export const RemoveFromCartButton = ({ id }) => {
  const { openCart } = useCart();
  const [addToCart, { loading, error }] = useMutation(M_REMOVE_FROM_CART, {
    variables: { id },
    refetchQueries: [{ query: Q_CURRENT_USER }],
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
