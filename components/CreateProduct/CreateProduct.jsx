import React, { useState } from 'react';
import { useForm } from '../../lib/useForm';
import Form from '../styles/Form';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import DisplayError from '../ErrorMessage';
import { M_CREATE_PRODUCT } from '../../gql/mutations';
import { Q_ALL_PRODUCTS } from '../../gql/queries';


const CreateProduct = (props) => {
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
    initialState
  );


  const [createProduct, { loading, error }] = useMutation(
    M_CREATE_PRODUCT,
    {
      variables: formValues,
      refetchQueries: [{ query: Q_ALL_PRODUCTS }],
    }
  );

  return (
    <Form onSubmit={async (e) => {
      e.preventDefault();
      console.log(formValues);
      const res = await createProduct();
      console.log(res);
    }}>
      <DisplayError error={error}/>
      <fieldset aria-busy={loading} disabled={loading}>
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
      <button type={'submit'}>+ New product ( {formValues.name || '...'})</button>
      <hr/>
      <button onClick={resetForm}>
        Reset form
      </button>
      <button onClick={clearForm}>
        Clear form
      </button>

    </Form>
  );
};

export default CreateProduct;
