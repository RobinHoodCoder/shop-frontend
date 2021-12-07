import React from 'react';
import { useQuery } from '@apollo/client';
import { Q_SINGLE_PRODUCT } from '../../gql/queries';

const SingleProduct = ({ id }) => {
  console.log(id);
  const { data, loading, error } = useQuery(Q_SINGLE_PRODUCT, { variables: { id } });

  console.log({ loading, data, error });

  return (
    <div>
      {[id]}
    </div>
  );
};

export default SingleProduct;
