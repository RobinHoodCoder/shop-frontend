import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import SickButton from '../styles/SickButton';
import NProgress from 'nprogress';
import { CheckoutError } from '../Errors/';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER_MUTATION, M_CREATE_ORDER } from '../../gql/mutations';
import { useRouter } from 'next/dist/client/router';
import { useCart } from '../../context/CartState';
import { Q_CURRENT_USER } from '../../gql/queries';

const CheckoutFormStyles = styled.form`
          padding: 0.4rem 1rem;
          box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(156, 156, 156, 0.62);
          border-radius: 5px;
          display: grid;
          grid-gap: 1rem;
  `;

const Checkout = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const { closeCart } = useCart();
  const [createOrder, { data, loading: gqlLoading, error: gqlError }] = useMutation(M_CREATE_ORDER, {
    refetchQueries: [{ query: Q_CURRENT_USER }],
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    // 1. Stop the form from submitting and turn the loader one
    e.preventDefault();
    setLoading(true);
    setError(null);


    const { error: paymentError, paymentMethod, getElements } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    setLoading(false);
    // 2. Start page transition


    // 3. Create payment method via Stripe. Token comes back if success.

    // 4. Handle errors from Stripe
    if (!!paymentError) {
      return setError(paymentError);
    }

    // 5. Handle all errors from Stripe.


    // 6. Change the page to view the order
    try {
      if (!!paymentMethod?.id) {
        const order = await createOrder({
          variables: {
            token: paymentMethod?.id,
          },
        });
        try {
          console.log(order);
          await router.push({
            pathname: `/order/${order?.data?.checkout?.id}`,
          });
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
    // 7. Close the cart
    closeCart();

    // 7. View the order.
  };

  useEffect(() => {
    if (!!gqlError) {
      setError(gqlError);
      NProgress.done();
    }
    if (!!loading) {
      NProgress.start();
    }
    return () => {
      return NProgress.done();
    };
  }, [loading, gqlError]);

  console.log('rerendered checkout', data);


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
