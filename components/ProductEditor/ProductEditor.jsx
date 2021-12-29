import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useForm } from '../../lib/useForm';
import DisplayError from '../Errors/ErrorMessage';
import Form from '../styles/Form';
import { Q_SINGLE_PRODUCT } from '../../gql/queries';
import { M_UPDATE_PRODUCT } from '../../gql/mutations';


const ProductEditor = ({ id }) => {
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

  const productData = data?.Product;

  const [
    updateProduct,
    {
      loading: updateLoading,
      error: updateError,
    },
  ] = useMutation(M_UPDATE_PRODUCT);

  const {
    formValues,
    handleChange,
    resetForm,
    clearForm,
  } = useForm(
    productData,
  );

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Keep image as is...
    updateProduct({
      variables: {
        ...formValues,
        id,
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
      <Form
        onSubmit={handleUpdate}
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
