import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';
import { NEXT_PUBLIC_STRIPE_KEY } from '../../config';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import SickButton from '../styles/SickButton';
import NProgress from 'nprogress';
import DisplayError from '../Errors/ErrorMessage';
import { CheckoutError } from '../Errors/';

const CheckoutFormStyles = styled.form`
          padding: 0.4rem 1rem;
          box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(156, 156, 156, 0.62);
          border-radius: 5px;
          display: grid;
          grid-gap: 1rem;
  `;

const Checkout = (props) => {
  const { dummy } = props;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();


  const handleSubmit = async (e) => {
    // 1. Stop the form from submitting and turn the loader one
    e.preventDefault();
    setLoading(true);


    const { error, paymentMethod, getElements } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    setLoading(false);
    // 2. Start page transition


    // 3. Create payment method via Stripe. Token comes back if success.

    // 4. Handle errors from Stripe
    if (!!error) {
      setError(error);
    }

    // 5. Handle all errors from Stripe.

    // 6.Send token from Stripe to our Keystone server via custom mutation!

    // 7. View the order.
  };

  useEffect(() => {
    if (!!loading) {
      NProgress.start();
    }
    return () => {
      return NProgress.done();
    };
  }, [loading]);


  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      <CardElement />
      <CheckoutError error={error}/>
      <SickButton>
        Go to checkout
      </SickButton>
    </CheckoutFormStyles>
  );
};

export default Checkout;
