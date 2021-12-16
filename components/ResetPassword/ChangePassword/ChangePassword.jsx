import React, { useEffect, useState } from 'react';
import { useForm } from '../../../lib/useForm';
import { useMutation } from '@apollo/client';
import { M_RESET_PASSWORD } from '../../../gql/mutations';
import Toaster from '../../Toaster/Toaster';
import DisplayError from '../../ErrorMessage';
import SickButton from '../../styles/SickButton';
import Form from '../../styles/Form';

const ChangePassword = ({ token }) => {
  const { formValues, clearForm, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const { email, password } = formValues;


  const [resetPassword, { error: reqError, loading, data }] = useMutation(M_RESET_PASSWORD, {
    variables: {
      token,
      email,
      password,
    },
  });
  const { redeemUserPasswordResetToken } = data || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword();

      if (redeemUserPasswordResetToken) {
        return Promise.reject('token invalid');
      }
    } catch (err) {
      return console.error(err);
    } finally {
      resetForm(e);
    }
  };

  useEffect(() => {
    if (reqError) {
      setError(reqError);
    }
    if (redeemUserPasswordResetToken?.code) {
      setError(redeemUserPasswordResetToken);
    }
  }, [redeemUserPasswordResetToken, reqError]);

  return (
    <Form
      name="password"
      aria-disabled={loading}
      method={'POST'}
      onSubmit={handleSubmit}
    >
      <Toaster />
      <fieldset form="password">
        Reset your password
        <DisplayError
          error={error}
        />
        <label htmlFor="email">
          Email
          <input
            value={email}
            onChange={handleChange}
            autoComplete={'email'}
            placeholder={'email'}
            type={'email'}
            name={'email'}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            placeholder="password"
            value={password}
            onChange={handleChange}
            type={'password'}
            name={'password'}
          />
        </label>
        <SickButton
          disabled={loading}
        >
        Change password
        </SickButton>
      </fieldset>
    </Form>
  );
};

export default ChangePassword;
