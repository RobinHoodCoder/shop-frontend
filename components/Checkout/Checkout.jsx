import React from 'react';
import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';
import { NEXT_PUBLIC_STRIPE_KEY } from '../../config';
import { CardElement, Elements } from '@stripe/react-stripe-js';
import SickButton from '../styles/SickButton';

const CheckoutFormStyles = styled.form`
          padding: 0.4rem 1rem;
          box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(156, 156, 156, 0.62);
          border-radius: 5px;
          display: grid;
          grid-gap: 1rem;
  `
;
const stripeLib = loadStripe(NEXT_PUBLIC_STRIPE_KEY);
const handleSubmit = (e) => {
  e.preventDefault();
};

const Checkout = (props) => {
  const { dummy } = props;


  return (
    <Elements stripe={stripeLib}>
      <CheckoutFormStyles onSubmit={handleSubmit}>
        <CardElement />
        <SickButton>
        Go to checkout
        </SickButton>
      </CheckoutFormStyles>
    </Elements>
  );
};

export default Checkout;
