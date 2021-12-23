import React from 'react';
import PDP from '../../components/PDP/PDP';

const ProductPage = ({ query }) => {
  const { id } = query;
  return (
    <PDP id={id}/>
  );
};

export default ProductPage;
