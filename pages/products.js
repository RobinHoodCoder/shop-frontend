import React from 'react';
import ProductItems from '../components/Products/Products'
const Products = (props) => {
  const { dummy } = props;

  return (
    <div>
      <ProductItems/>
    </div>
  );
};

export default Products;
