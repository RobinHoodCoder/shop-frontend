import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Q_SINGLE_PRODUCT } from '../../gql/queries';
import { M_UPDATE_PRODUCT } from '../../gql/mutations';
import { useForm } from '../../lib/useForm';
import DisplayError from '../ErrorMessage';
import Form from '../styles/Form';

const ProductEditor = ({ id }) => {
  // Get existing

  // get mutation
  const {
    data,
    error,
    loading,
  } = useQuery(
    Q_SINGLE_PRODUCT,
    {
      variables: { id },
    }
  );

  // handle updates in forms
  const initialState = {
    name: '',
    price: 999,
    image: '',
    description: '',
  };
  const {
    formValues,
    handleChange,
    resetForm,
    clearForm,
  } = useForm(
    data?.Product || initialState
  );


  const [
    updateProduct, {
      data: updateData,
      loading: updateLoading,
      error: updateError,
    },
  ] = useMutation(M_UPDATE_PRODUCT);

  const handleUpdate = async () => {
    updateProduct({
      variables: {
        id,
        ...formValues,
      },
    }).then((response) => {
      console.log(response);
    })
      .catch((updateError) => {
        console.error(updateError);
      });
  };

  return (
    <div>
      <p>Update {id}</p>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await handleUpdate();
          console.log(res);
        }}
      >
        <DisplayError error={error || updateError} />
        <fieldset
          aria-busy={updateLoading || loading}
          disabled={updateLoading || loading}
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
          <label htmlFor="description">
                    Description
            <textarea
              id={'description'}
              name={'description'}
              placeholder={'description'}
              onChange={e => handleChange(e)}
              value={formValues.description}
            />
          </label>
          <label htmlFor="price">
                    Price
            <input
              type="number"
              id={'price'}
              name={'price'}
              placeholder={'price'}
              onChange={e => handleChange(e)}
              value={formValues.price}
            />
          </label>
          <label htmlFor="image">
                    Image
            <input
              type="file"
              id={'image'}
              name={'image'}
              placeholder={'file'}
              onChange={e => handleChange(e)}
              value={formValues.file}
            />
          </label>
        </fieldset>
        {
          data?.name && (
            <p>
              {data.name}
              <a href={`/product/${data?.id}`}>Preview></a>
            </p>
          )
        }

        <button type={'submit'}>
                + Update Product
        </button>

        <hr />
        <button onClick={resetForm}>
                Reset form
        </button>
        <button onClick={clearForm}>
                Clear form
        </button>
      </Form>
    </div>
  );
};

export default ProductEditor;
