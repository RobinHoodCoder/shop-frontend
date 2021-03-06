import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useForm } from '../../lib/useForm';
import DisplayError from '../Errors/ErrorMessage';
import Form from '../styles/Form';
import { Q_SINGLE_PRODUCT } from '../../gql/queries';
import { M_UPDATE_PRODUCT, M_UPDATE_USER } from '../../gql/mutations';
import { useUser } from '../../hooks';

const initialState = {
  name: '',
  price: '',
  image: '',
  description: '',
};

const AccountEditor = () => {
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [
    data,
    {
      error: updateError,
      loading: updateLoading,
    },
  ] = useUser();


  const {
    formValues,
    handleChange,
  } = useForm(
    data || initialState
  );

  const { email, name, id } = formValues;

  const [updateUser, { data: updatedData, loading: updatedLoading }]  = useMutation(M_UPDATE_USER, {
    variables: { name, email, id },
  });


  const handleUpdate = async (e) => {
    e.preventDefault();
    // Keep image as is...
    updateUser().then((response) => {
      console.log(response);
    })
      .catch((updateError) => {
        // throw new Error(updateError);
        console.error('[Could not update user]', updateError);
      });
  };
  return (
    <div>
      <Form
        onSubmit={handleUpdate}
      >
        <DisplayError error={error || updateError} />
        <fieldset
          aria-busy={updatedLoading || loading}
          disabled={updatedLoading || loading}
        >

          <label htmlFor="name">
                    Name
            <input
              type="text"
              id={'name'}
              name={'name'}
              placeholder={'name'}
              onChange={e => handleChange(e)}
              value={formValues.name}
            />
          </label>
          <label htmlFor="email">
                Email
            <input
              type="email"
              id={'email'}
              name={'email'}
              placeholder={'email'}
              onChange={e => handleChange(e)}
              value={email}
            />
          </label>
          {/* <label htmlFor="image">
                    Image
            <input
              type="file"
              id={'image'}
              name={'image'}
              placeholder={'file'}
              onChange={e => handleChange(e)}
              value={formValues.file}
            />
          </label>*/}
        </fieldset>
        <button type={'submit'}>
            Update
        </button>
        <hr />
      </Form>
    </div>
  );
};

export default AccountEditor;
