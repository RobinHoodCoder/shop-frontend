import React, { useState } from 'react';
import { useForm } from '../../lib/useForm';
import Form from '../styles/Form';

const CreateProduct = (props) => {
  const { dummy } = props;

  const { formValues, handleChange, resetForm, clearForm } = useForm(
    {
      name: '',
      price: 999,
      image: '',
    }
  );

  return (
    <Form>
      <fieldset aria-busy={false}>
        <label htmlFor="image">
          File
          <input
            type="file"
            id={'image'}
            name={'image'}
            placeholder={'file'}
            onChange={e => handleChange(e)}
            value={formValues.file}
          />
        </label>
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
      </fieldset>
      <button type={'submit'}>+ Add {formValues.name}</button>
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
