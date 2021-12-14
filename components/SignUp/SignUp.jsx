import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from '../../lib/useForm';
import { useMutation } from '@apollo/client';
import { M_LOGIN, M_SIGNUP } from '../../gql/mutations';
import { Q_CURRENT_USER } from '../../gql/queries';
import Toaster from '../Toaster/Toaster';
import DisplayError from '../ErrorMessage';
import SickButton from '../styles/SickButton';
import Form from '../styles/Form';

const SignUp = () => {
  const router = useRouter();
  const { formValues, clearForm, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const { email, password, name } = formValues;

  const [signUp, { error, loading, data }] = useMutation(M_SIGNUP, {
    variables: {
      name,
      email,
      password,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const signedUp = await signUp();
      const { createUser } = signedUp.data;
      !!createUser.email;
    } catch (err) {
      return console.error(err);
    } finally {
      resetForm(e);
    }

    // if (loggedIn) {
    // const { item } = loggedIn?.data?.authenticateUserWithPassword;
    // !!item?.email ? await router.push('/sell') : resetForm(e);
  };


  return (

    <Form
      aria-disabled={loading}
      method={'POST'}
      onSubmit={handleSubmit}>
      <Toaster />
      <fieldset>
        <p>Sign up for an account</p>
        {!loading && data?.createUser && (
          <p>Signed up with {data.createUser.email}</p>
        )}
        <DisplayError
          error={error}
        />
        <label htmlFor="email">
        Name
          <input
            value={name}
            onChange={handleChange}
            autoComplete={'name'}
            placeholder={'name'}
            type={'name'}
            name={'name'}
          />
        </label>
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
          disabled={loading}>
          Login
        </SickButton>
      </fieldset>
    </Form>
  );
};

export default SignUp;
