import React, { useEffect, useState } from 'react';
import { useForm } from '../../../lib/useForm';
import { useMutation } from '@apollo/client';
import { M_RESET_PASSWORD } from '../../../gql/mutations';
import DisplayError from '../../Errors/ErrorMessage';
import SickButton from '../../styles/SickButton';
import Form from '../../styles/Form';
import { toast } from 'react-toastify';
import { Link } from '../../../consts/exports';
import { useRouter } from 'next/router';

const ChangePassword = ({ query }) => {
  const { token, email: qEmail = '' } = query;
  const router = useRouter();


  const { formValues, handleChange, resetForm } = useForm({
    email: qEmail,
    password: '',
    token,
  });
  const [error, setError] = useState(undefined);

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
      return await resetPassword();
    } catch (err) {
      return console.error(err);
    } finally {
      setTimeout(() => {
        resetForm(e);
      }, 1000);
    }
  };

  useEffect(() => {
    console.log(error);
    if (reqError) {
      setError(reqError);
    }
    if (!!redeemUserPasswordResetToken?.code) {
      const err = redeemUserPasswordResetToken?.code?.data?.redeemUserPasswordResetToken || redeemUserPasswordResetToken;
      setError(err);
    }
    if (redeemUserPasswordResetToken === null) {
      setError(null);
      toast('Password changed!');
      setTimeout(() => {
        return router.push({
          pathname: '/login',
          query: {
            email,
          },
        });
      }, 1000);
    }
  }, [data, error, loading, redeemUserPasswordResetToken, reqError]);

  const resetToken = () => {
    return router.replace(router.pathname);
  };

  return (
    <Form
      aria-loading={loading}
      name="password"
      method={'POST'}
      onSubmit={handleSubmit}
    >
      <fieldset form="password">
        {error === null ? 'You can now login with your new password!' : 'Reset your password'}
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
        <SickButton type="submit">
        Change password
        </SickButton>
        &nbsp;<span onClick={resetToken}>Try another email</span>
      </fieldset>
    </Form>
  );
};

export default ChangePassword;
