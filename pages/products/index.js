import React from 'react';
import ProductItems from '../../components/Products/Products';
import Pagination from '../../components/Pagination/Pagination';
import { perPage } from '../../config';

const Index = ({ query }) => {
  const { page: pageString = 1 } = query;
  const page = Number(pageString);

  return (
    <div>
      <Pagination page={page} perPage={perPage} />
      <ProductItems page={page} perPage={perPage}/>
      <Pagination page={page} perPage={perPage}/>
    </div>
  );
};

export default Index;
