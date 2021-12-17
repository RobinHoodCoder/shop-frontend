import React, { useEffect } from 'react';
import { useForm } from '../../../lib/useForm';
import { useMutation } from '@apollo/client';
import { M_REQUEST_RESET_PASSWORD } from '../../../gql/mutations';
import Toaster from '../../Toaster/Toaster';
import DisplayError from '../../ErrorMessage';
import SickButton from '../../styles/SickButton';
import Form from '../../styles/Form';
import { toast } from 'react-toastify';

const RequestReset = () => {
  const { formValues, clearForm, handleChange, resetForm } = useForm({
    email: '',
  });

  const { email, password } = formValues;

  const [requestPassword, { error, loading, data }] = useMutation(M_REQUEST_RESET_PASSWORD,
    {
      variables: {
        email,
      },
    });
  const { sendUserPasswordResetLink } = data || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const request = await requestPassword();
      await request;
    } catch (err) {
      return console.error(err);
    } finally {
      setTimeout(() => {
        resetForm(e);
      }, 1000);
    }
  };

  useEffect(() => {
    if (sendUserPasswordResetLink === null) {
      toast('Password reset sent! Please check your email.');
    }
  }, [sendUserPasswordResetLink]);

  return (
    <Form
      name="password"
      method={'POST'}
      onSubmit={handleSubmit}
    >
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
        <SickButton
        >
        Send reset email
        </SickButton>
      </fieldset>
    </Form>
  );
};

export default RequestReset;
