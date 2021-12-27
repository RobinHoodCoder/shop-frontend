import React, { useEffect } from 'react';
import Form from '../styles/Form';
import { useForm } from '../../lib/useForm';
import { useMutation } from '@apollo/client';
import { M_LOGIN } from '../../gql/mutations';
import { Q_CURRENT_USER } from '../../gql/queries';
import SickButton from '../styles/SickButton';
import DisplayError from '../Errors/ErrorMessage';
import { useRouter } from 'next/router';
import { Link } from '../../consts/exports';

const Login = () => {
  const router = useRouter();
  const { formValues, clearForm, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const { email, password } = formValues;


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
    !!item?.email && await router.push('/sell');
    resetForm(e);
  };

  return (
    <div>
      <Form aria-disabled={loading} method={'POST'} onSubmit={handleSubmit}>
        <fieldset>
          <p>Login with your account</p>
          <DisplayError
            error={data?.authenticateUserWithPassword}
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
          <SickButton disabled={loading}>
          Login
          </SickButton>
          <div>
            <Link disabled={loading} href={'/reset-password'}>
            Forgot Password
            </Link>
          </div>
        </fieldset>
      </Form>
    </div>
  );
};

export default Login;
