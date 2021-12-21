import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { NEXT_PUBLIC_STRIPE_KEY } from '../../config';

const stripeLib = loadStripe(NEXT_PUBLIC_STRIPE_KEY);

const CheckoutProvider = ({ children }) => {
  return (
    <Elements stripe={stripeLib}>
      {children}
    </Elements>
  );
};

export default CheckoutProvider;
