import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from '../../lib/useForm';
import { useMutation } from '@apollo/client';
import { M_LOGIN } from '../../gql/mutations';
import { Q_CURRENT_USER } from '../../gql/queries';
import Toaster from '../Toaster/Toaster';
import DisplayError from '../ErrorMessage';
import SickButton from '../styles/SickButton';
import Form from '../styles/Form';

const SignUp = (props) => {
  const { dummy } = props;
  const router = useRouter();
  const { formValues, clearForm, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const { email, password, name } = formValues;


  const [login, { error, loading, data }] = useMutation(M_LOGIN, {
    variables: {
      email,
      password,
    },
    refetchQueries: [
      { query: Q_CURRENT_USER },
    ],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loggedIn = await login();

    const { item } = loggedIn?.data?.authenticateUserWithPassword;
    !!item?.email ? await router.push('/sell') : resetForm(e);
  };


  return (
    <Form aria-disabled={loading} method={'POST'} onSubmit={handleSubmit}>
      <Toaster />
      <fieldset>
        <p>Sign up for an account</p>
        <DisplayError
          error={data?.authenticateUserWithPassword}
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
        <SickButton disabled={loading}>
          Login
        </SickButton>
      </fieldset>
    </Form>
  );
};

export default SignUp;
