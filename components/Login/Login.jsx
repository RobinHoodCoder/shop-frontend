import React, { useEffect } from 'react';
import Form from '../styles/Form';
import { useForm } from '../../lib/useForm';
import { useUser } from '../../hooks';
import { useMutation } from '@apollo/client';
import { M_LOGIN } from '../../gql/mutations';
import { Q_CURRENT_USER } from '../../gql/queries';
import SickButton from '../styles/SickButton';
import DisplayError from '../ErrorMessage';
import Error from 'next/error';
import { toast } from 'react-toastify';
import Toaster from '../Toaster/Toaster';

const Login = (props) => {
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
    try {
      const res = await login();
      const { authenticateUserWithPassword } = res.data;

      !authenticateUserWithPassword.item;
    } finally {
      // resetForm(e);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Form method={'POST'} onSubmit={handleSubmit}>
      <Toaster/>
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
            value={password}
            onChange={handleChange}
            type={'password'}
            name={'password'}
          />
        </label>
        <SickButton>
        Login
        </SickButton>
      </fieldset>
    </Form>
  );
};

export default Login;
