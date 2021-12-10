import React from 'react';
import ProductItems from '../components/Products/Products';
import Pagination from '../components/Pagination/Pagination';
const Products = (props) => {
  const { dummy } = props;

  return (
    <div>
      <Pagination page={1} />
      <ProductItems/>
      <Pagination page={1}/>
    </div>
  );
};

export default Products;
