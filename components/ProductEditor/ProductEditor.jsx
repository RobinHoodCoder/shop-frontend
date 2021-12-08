import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Q_SINGLE_PRODUCT } from '../../gql/queries';
import { M_UPDATE_PRODUCT } from '../../gql/mutations';

const ProductEditor = ({ id }) => {
  // Get existing

  // get mutation

  // handle updates in forms
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

  const [
    updateProduct, {
      data: updateData,
      loading: updateLoading,
      error: updateError,
    },
  ] = useMutation(M_UPDATE_PRODUCT);

  const handleUpdate = () => {
    updateProduct({
      variables: {
        id,
        name: 'Swek',
        description: 'no',
        price: 33,
      },
    }).then((response) => {
      console.log(response);
    })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <p>Update {id}</p>
      <button onClick={handleUpdate}>UPDATE</button>
    </div>
  );
};

export default ProductEditor;
