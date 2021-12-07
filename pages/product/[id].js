import React from 'react';
import SingleProduct from '../../components/SingleProduct/SingleProduct';

const ProductPage = ({ query }) => {
  const { id } = query;
  console.log(query);
  return (
    <SingleProduct id={id}/>
  );
};

export default ProductPage;
