import React, { useState } from 'react';
import { useForm } from '../../lib/useForm';
import Form from '../styles/Form';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const inititalState = {
  name: '',
  price: 999,
  image: '',
  description: '',
};

const CreateProduct = (props) => {
  const { formValues, handleChange, resetForm, clearForm } = useForm(
    inititalState
  );

  const CREATE_PRODUCT_MUTATION = gql`
    mutation CREATE_PRODUCT_MUTATION (
        $name: String!
        $description: String!
        $price: Int!
        $image: Upload
    ) {
        createProduct(
            data: {
              name: $name
              description: $description
              price: $price
              status: "AVAILABLE"
              photo: {
                create: { 
                    image: $image, 
                    altText: $name 
                }
              }
            }
        ) {
            id
            price
            description
            name
            id
        }
    }
  `;

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: formValues,
    }
  );

  return (
    <Form onSubmit={async (e) => {
      e.preventDefault();
      console.log(formValues);
      const res = await createProduct();
      console.log(res);
    }}>
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
