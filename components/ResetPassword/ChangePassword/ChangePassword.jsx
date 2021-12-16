import React from 'react';
import { useForm } from '../../../lib/useForm';
import { useMutation } from '@apollo/client';
import { M_REQUEST_RESET_PASSWORD, M_RESET_PASSWORD, M_resetPassword } from '../../../gql/mutations';
import Toaster from '../../Toaster/Toaster';
import DisplayError from '../../ErrorMessage';
import SickButton from '../../styles/SickButton';
import Form from '../../styles/Form';

const RequestReset = ({ token }) => {
  const { formValues, clearForm, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const { email, password, name } = formValues;

  const [requestPassword, { error, loading, data }] = useMutation(M_REQUEST_RESET_PASSWORD, {
    variables: {
      name,
      email,
      password,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const signedUp = await requestPassword();
      const { createUser } = signedUp.data;
      !!createUser.email;
    } catch (err) {
      return console.error(err);
    } finally {
      resetForm(e);
    }
  };

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
          Login
        </SickButton>
      </fieldset>
    </Form>
  );
};

export default RequestReset;
