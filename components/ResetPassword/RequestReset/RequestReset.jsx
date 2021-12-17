import React from 'react';
import { useForm } from '../../../lib/useForm';
import { useMutation } from '@apollo/client';
import { M_REQUEST_RESET_PASSWORD } from '../../../gql/mutations';
import Toaster from '../../Toaster/Toaster';
import DisplayError from '../../ErrorMessage';
import SickButton from '../../styles/SickButton';
import Form from '../../styles/Form';

const RequestReset = () => {
  const { formValues, clearForm, handleChange, resetForm } = useForm({
    email: '',
  });

  const { email, password } = formValues;

  const [requestPassword, { error, loading, data }] = useMutation(M_REQUEST_RESET_PASSWORD, {
    variables: {
      email,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await requestPassword().then(console.log);
    } catch (err) {
      return console.error(err);
    } finally {
      resetForm(e);
    }
  };

  return (
    <Form
      name="password"
      aria-disabled={false}
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
        <SickButton
          disabled={false}
        >
        Send reset email
        </SickButton>
      </fieldset>
    </Form>
  );
};

export default RequestReset;
